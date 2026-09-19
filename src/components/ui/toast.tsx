import { Toast, ToastQueue } from "@heroui/react";
import type { ReactNode } from "react";

type ToastContent = {
	title: ReactNode;
	description?: ReactNode;
	variant: "default" | "accent" | "success" | "warning" | "danger";
	action?: { label: ReactNode; onClick: () => void };
	closeButton?: boolean;
};
type Options = {
	id?: string | number;
	description?: ReactNode;
	duration?: number;
	closeButton?: boolean;
	action?: { label: ReactNode; onClick: () => void };
	onDismiss?: () => void;
};
const queue = new ToastQueue<ToastContent>();
const ids = new Map<string | number, string>();
function notify(
	title: ReactNode,
	options: Options = {},
	variant: ToastContent["variant"] = "default",
) {
	const content = {
		title,
		description: options.description,
		variant,
		action: options.action,
		closeButton: options.closeButton,
	};
	const timeout = options.duration === Infinity ? 0 : (options.duration ?? 4000);
	const onClose = () => {
		if (options.id !== undefined) ids.delete(options.id);
		options.onDismiss?.();
	};
	const previous = options.id === undefined ? undefined : ids.get(options.id);
	if (previous && queue.update(previous, content, { timeout, onClose })) return previous;
	const key = queue.add(content, { timeout, onClose });
	if (options.id !== undefined) ids.set(options.id, key);
	return key;
}
export const toast = Object.assign(notify, {
	success: (message: ReactNode, options?: Options) => notify(message, options, "success"),
	error: (message: ReactNode, options?: Options) => notify(message, options, "danger"),
	info: (message: ReactNode, options?: Options) => notify(message, options, "accent"),
	warning: (message: ReactNode, options?: Options) => notify(message, options, "warning"),
	dismiss: (id?: string | number) => {
		if (id === undefined) {
			queue.clear();
			ids.clear();
		} else queue.close(ids.get(id) ?? String(id));
	},
});
export function Toaster({ className }: { className?: string }) {
	return (
		<Toast.Provider queue={queue} placement="bottom end" className={className}>
			{({ toast: item }) => (
				<Toast toast={item} variant={item.content.variant}>
					<Toast.Content>
						<Toast.Indicator />
						<div className="min-w-0 flex-1">
							<Toast.Title>{item.content.title}</Toast.Title>
							{item.content.description && (
								<Toast.Description>{item.content.description}</Toast.Description>
							)}
						</div>
						{item.content.action && (
							<Toast.ActionButton
								onPress={() => {
									item.content.action?.onClick();
									queue.close(item.key);
								}}
							>
								{item.content.action.label}
							</Toast.ActionButton>
						)}
						{item.content.closeButton !== false && <Toast.CloseButton />}
					</Toast.Content>
				</Toast>
			)}
		</Toast.Provider>
	);
}
