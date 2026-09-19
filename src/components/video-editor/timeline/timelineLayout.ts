export const TIMELINE_AXIS_HEIGHT_PX = 32;
export const TIMELINE_ROW_MIN_HEIGHT_PX = 32;
export const TIMELINE_CLIP_ROW_HEIGHT_PX = TIMELINE_ROW_MIN_HEIGHT_PX * 2;
export const TIMELINE_VISIBLE_ROW_COUNT = 3;

function normalizeRowCount(rowCount: number) {
	if (!Number.isFinite(rowCount)) {
		return 0;
	}

	return Math.max(0, Math.floor(rowCount));
}

export function getTimelineRowsMinHeightPx(rowCount: number) {
	const count = normalizeRowCount(rowCount);
	// The first lane is a double-height filmstrip; reserve its extra space.
	return count
		? TIMELINE_CLIP_ROW_HEIGHT_PX + (count - 1) * TIMELINE_ROW_MIN_HEIGHT_PX + count * 2
		: 0;
}

export function getTimelineContentMinHeightPx(rowCount: number) {
	return TIMELINE_AXIS_HEIGHT_PX + getTimelineRowsMinHeightPx(rowCount);
}

export function getTimelineViewportStretchFactor(rowCount: number) {
	const normalizedRowCount = normalizeRowCount(rowCount);

	if (normalizedRowCount <= 0) {
		return 1;
	}

	return Math.max(1, normalizedRowCount / TIMELINE_VISIBLE_ROW_COUNT);
}
