import fs from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { app, shell } from "electron";
import { buildMediaUrl, getMediaServerBaseUrl } from "../../mediaServer";
import { rememberApprovedLocalReadPath } from "../project/manager";
import { getRecordingsDir } from "../utils";
import type { RecordingLibraryEntry } from "../../../src/types/recordingLibrary";

let mutation = Promise.resolve();
const undoBatches = new Map<string, { backup: string; files: string[] }>();
const isRecording = (name: string) =>
	/\.(mp4|mov|webm|mkv|m4v)$/i.test(name) && !/[.-]webcam[.-]/i.test(name);
const batchKey = (paths: string[]) => JSON.stringify([...new Set(paths)].sort());

export async function listRecordings(): Promise<RecordingLibraryEntry[]> {
	const root = await fs.realpath(await getRecordingsDir());
	const server = getMediaServerBaseUrl();
	if (!server) throw new Error("Media server is not ready. Try again.");
	const entries = await fs.readdir(root, { withFileTypes: true });
	const result: RecordingLibraryEntry[] = [];
	for (const entry of entries) {
		if (!entry.isFile() || !isRecording(entry.name)) continue;
		const filePath = path.join(root, entry.name);
		const stat = await fs.stat(filePath);
		if (!stat.size) continue;
		await rememberApprovedLocalReadPath(filePath);
		result.push({
			path: filePath,
			name: entry.name,
			bytes: stat.size,
			createdAt: stat.mtimeMs,
			url: buildMediaUrl(server, filePath),
		});
	}
	return result.sort((a, b) => b.createdAt - a.createdAt);
}

// Only capture sidecars belonging to this exact recording, never adjacent recordings or projects.
function belongsToRecording(name: string, video: string) {
	const stem = video.slice(0, -path.extname(video).length);
	return (
		name === video ||
		name === `${video}.cursor.json` ||
		(name.startsWith(`${stem}.`) &&
			/\.(?:system|mic|microphone|audio|webcam)\.(?:wav|webm|mp4|m4a)(?:\.json)?$/i.test(
				name,
			)) ||
		name === `${stem}.recordly-session.json` ||
		name === `${stem}.recording-session.json` ||
		(name.startsWith(`${stem}-webcam.`) && /\.(?:mp4|webm|mov|mkv|avi)$/i.test(name))
	);
}

/** Move the recording bundle into the system Trash. Session backups allow cross-platform Undo. */
export function setRecordingsRemoved(paths: string[], removed: boolean): Promise<void> {
	const task = mutation.then(async () => {
		if (
			typeof removed !== "boolean" ||
			!Array.isArray(paths) ||
			!paths.length ||
			paths.some((value) => typeof value !== "string")
		)
			throw new Error("Invalid recording selection");
		const root = await fs.realpath(await getRecordingsDir());
		const selected = [...new Set(paths)];
		for (const candidate of selected) {
			if (path.dirname(candidate) !== root || !isRecording(path.basename(candidate)))
				throw new Error("Recording is outside the Videos library");
		}
		const key = batchKey(selected);
		if (!removed) {
			const batch = undoBatches.get(key);
			if (!batch)
				throw new Error(
					"This removal can no longer be undone. Restore the files from Trash.",
				);
			// Check every destination before restoring any file; never overwrite newer media.
			for (const file of batch.files) {
				if (
					await fs.lstat(file).then(
						() => true,
						(error) => {
							if (error.code === "ENOENT") return false;
							throw error;
						},
					)
				)
					throw new Error(
						"A file with this name already exists. Restore it from Trash instead.",
					);
			}
			const restored: string[] = [];
			try {
				for (const file of batch.files) {
					await fs.copyFile(
						path.join(batch.backup, path.basename(file)),
						file,
						constants.COPYFILE_EXCL,
					);
					restored.push(file);
				}
			} catch (error) {
				await Promise.all(restored.map((file) => fs.rm(file, { force: true })));
				throw error;
			}
			undoBatches.delete(key);
			await fs.rm(batch.backup, { recursive: true, force: true });
			return;
		}
		const available = await fs.readdir(root, { withFileTypes: true });
		for (const file of selected) {
			if (!available.some((entry) => entry.name === path.basename(file) && entry.isFile()))
				throw new Error("Recording is missing or is not a regular file");
		}
		const files = available
			.filter(
				(entry) =>
					entry.isFile() &&
					selected.some((file) => belongsToRecording(entry.name, path.basename(file))),
			)
			.map((entry) => path.join(root, entry.name));
		const backup = await fs.mkdtemp(path.join(app.getPath("temp"), "recordly-trash-undo-"));
		const bundle = await fs.mkdtemp(path.join(root, "Recordly videos "));
		const moved: string[] = [];
		try {
			for (const file of files)
				await fs.copyFile(
					file,
					path.join(backup, path.basename(file)),
					constants.COPYFILE_FICLONE,
				);
			for (const file of files) {
				await fs.rename(file, path.join(bundle, path.basename(file)));
				moved.push(file);
			}
			await shell.trashItem(bundle);
			undoBatches.set(key, { backup, files });
		} catch (error) {
			for (const file of moved) await fs.rename(path.join(bundle, path.basename(file)), file);
			await fs.rm(backup, { recursive: true, force: true });
			throw error;
		} finally {
			await fs.rmdir(bundle).catch((error) => {
				if (error.code !== "ENOENT") throw error;
			});
		}
	});
	mutation = task.catch(() => undefined);
	return task;
}

export async function clearRecordingTrashUndo() {
	await mutation;
	await Promise.all(
		[...undoBatches.values()].map(({ backup }) =>
			fs.rm(backup, { recursive: true, force: true }),
		),
	);
	undoBatches.clear();
}
