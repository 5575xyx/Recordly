import { useTimelineContext, type Span } from "dnd-timeline";
import { useEffect, useRef, useState } from "react";
import { filmstripSampleTimes } from "../../core/filmstrip";
import { extractFilmstrip } from "./frameCache";

export function ClipFilmstrip({
	path,
	span,
	sourceSpan,
}: {
	path: string;
	span: Span;
	sourceSpan: Span;
}) {
	const { range } = useTimelineContext();
	const ref = useRef<HTMLDivElement>(null);
	const [count, setCount] = useState(0);
	const [frames, setFrames] = useState<string[]>([]);
	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setCount(
				width > 0
					? Math.min(32, Math.max(1, Math.ceil(width / Math.max(60, (height * 16) / 9))))
					: 0,
			);
		});
		observer.observe(node);
		return () => observer.disconnect();
	}, []);
	const start = Math.max(span.start, range.start);
	const end = Math.min(span.end, range.end);
	useEffect(() => {
		const controller = new AbortController();
		setFrames([]);
		const times = filmstripSampleTimes(
			{ start: span.start, end: span.end },
			{ start: sourceSpan.start, end: sourceSpan.end },
			{ start, end },
			count,
		);
		if (times.length) {
			void extractFilmstrip(path, times, controller.signal)
				.then((images) => {
					if (!controller.signal.aborted) setFrames(images);
				})
				.catch(() => {
					/* Keep the clip's color when a source cannot be decoded. */
				});
		}
		return () => controller.abort();
	}, [path, span.start, span.end, sourceSpan.start, sourceSpan.end, start, end, count]);
	return (
		<div
			ref={ref}
			data-testid="clip-filmstrip"
			className="pointer-events-none absolute inset-0 flex overflow-hidden"
			aria-hidden="true"
		>
			{frames.map((frame, index) => (
				<img
					key={index}
					src={frame}
					alt=""
					draggable={false}
					className="h-full min-w-0 flex-1 object-cover"
					style={{ width: `${100 / frames.length}%` }}
				/>
			))}
		</div>
	);
}
