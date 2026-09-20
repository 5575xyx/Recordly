import { GoogleLogo, SignOut, XLogo } from "@phosphor-icons/react";
import type { User } from "@supabase/supabase-js";
import { type FormEvent, useEffect, useState } from "react";
import {
	Modal,
	Button,
	Form,
	TextField,
	Input,
	Label,
	Description,
	FieldError,
	Separator,
	Alert,
} from "@heroui/react";
import {
	sendPasswordReset,
	signInWithEmail,
	signInWithSocial,
	signOutRecordly,
} from "@/lib/auth/recordlyAuth";

export type SignInReason = "account" | "share";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	reason?: SignInReason;
	user: User | null;
	configured: boolean;
	callbackError?: string;
	onAuthenticated: () => void;
};

function friendlyAuthError(error: unknown, action: string): string {
	const message = error instanceof Error ? error.message : String(error);
	if (/unsupported provider|provider is not enabled/i.test(message)) {
		if (action === "google") {
			return "Google sign-in isn't enabled yet. Use email for now, or ask your Recordly administrator to connect Google.";
		}
		if (action === "x") {
			return "X sign-in isn't enabled yet. Use email for now, or ask your Recordly administrator to connect X.";
		}
		return "This sign-in method isn't enabled for Recordly yet. Use email for now.";
	}
	return message;
}

export function RecordlySignInDialog({
	open,
	onOpenChange,
	reason = "account",
	user,
	configured,
	callbackError,
	onAuthenticated,
}: Props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState<string>();
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		if (!open) {
			setPassword("");
			setBusy(undefined);
			setMessage(undefined);
		}
	}, [open]);

	useEffect(() => {
		if (open && user && reason === "share") onAuthenticated();
	}, [onAuthenticated, open, reason, user]);

	const run = async (label: string, action: () => Promise<unknown>) => {
		setBusy(label);
		setMessage(undefined);
		try {
			await action();
		} catch (error) {
			setMessage(friendlyAuthError(error, label));
		} finally {
			setBusy(undefined);
		}
	};

	const submitEmail = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!configured || busy) return;
		void run("email", async () => {
			await signInWithEmail(email.trim(), password);
			onAuthenticated();
		});
	};

	const forgotPassword = () => {
		if (!email.trim()) {
			setMessage("Enter your email address first.");
			return;
		}
		void run("reset", async () => {
			await sendPasswordReset(email.trim());
			setMessage("Password reset email sent.");
		});
	};

	const disabled = !configured || Boolean(busy);
	return (
		<Modal isOpen={open} onOpenChange={onOpenChange}>
			<Modal.Backdrop>
				<Modal.Container size="sm" placement="center">
					<Modal.Dialog>
						<Modal.CloseTrigger aria-label="Close" />
						<Modal.Header>
							<Modal.Heading>
								{user ? "Your Recordly account" : "Sign into Recordly"}
							</Modal.Heading>
							<Description>
								{user
									? user.email
									: reason === "share"
										? "Sign in to publish this video and manage its shared link."
										: "Access your recordings and shared links."}
							</Description>
						</Modal.Header>
						<Modal.Body className="flex flex-col gap-4">
							{user ? (
								<Button
									variant="secondary"
									className="w-full"
									isDisabled={Boolean(busy)}
									onPress={() => void run("signout", signOutRecordly)}
								>
									<SignOut className="size-4" />
									{busy === "signout" ? "Signing out…" : "Sign out"}
								</Button>
							) : (
								<>
									<div className="grid grid-cols-2 gap-3">
										<Button
											variant="secondary"
											className="w-full"
											isDisabled={disabled}
											onPress={() =>
												void run("google", () => signInWithSocial("google"))
											}
										>
											<GoogleLogo className="size-4" />
											Google
										</Button>
										<Button
											variant="secondary"
											className="w-full"
											isDisabled={disabled}
											onPress={() =>
												void run("x", () => signInWithSocial("twitter"))
											}
										>
											<XLogo className="size-4" />X
										</Button>
									</div>
									<div className="my-1 flex items-center gap-3">
										<Separator className="flex-1" />
										<span className="text-xs text-muted">or</span>
										<Separator className="flex-1" />
									</div>
									<Form className="flex flex-col gap-4" onSubmit={submitEmail}>
										<TextField
											name="email"
											type="email"
											value={email}
											onChange={setEmail}
											isRequired
											isDisabled={Boolean(busy)}
										>
											<Label>Email</Label>
											<Input
												placeholder="you@example.com"
												autoComplete="email"
											/>
											<FieldError />
										</TextField>
										<TextField
											name="password"
											type="password"
											value={password}
											onChange={setPassword}
											isRequired
											isDisabled={Boolean(busy)}
										>
											<Label>Password</Label>
											<Input autoComplete="current-password" />
											<FieldError />
										</TextField>
										<Button
											variant="ghost"
											size="sm"
											className="-mt-2 self-end"
											isDisabled={disabled}
											onPress={forgotPassword}
										>
											Forgot password?
										</Button>
										<Button
											type="submit"
											className="w-full"
											isDisabled={disabled}
										>
											{busy === "email" ? "Signing in…" : "Sign in"}
										</Button>
									</Form>
								</>
							)}
							{message || callbackError ? (
								<Alert
									status={
										message === "Password reset email sent."
											? "success"
											: "danger"
									}
								>
									<Alert.Indicator />
									<Alert.Content>
										<Alert.Description>
											{message || callbackError}
										</Alert.Description>
									</Alert.Content>
								</Alert>
							) : null}
						</Modal.Body>
						{!configured && !user && (
							<Modal.Footer>
								<Description role="status" className="min-w-0 flex-1">
									Cloud sign-in isn’t available in this build yet. You can still
									save videos to your computer.
								</Description>
							</Modal.Footer>
						)}
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
