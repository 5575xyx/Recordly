import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import {
	completeAuthCallback,
	recordlyAuth,
	recordlyAuthConfigured,
} from "@/lib/auth/recordlyAuth";

export function useRecordlyAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string>();
	const [loading, setLoading] = useState(recordlyAuthConfigured);
	const [callbackError, setCallbackError] = useState<string>();

	useEffect(() => {
		if (!recordlyAuth) {
			setLoading(false);
			return;
		}

		let mounted = true;
		void recordlyAuth.auth
			.getSession()
			.then(({ data }) => {
				if (mounted) {
					setUser(data.session?.user ?? null);
					setAccessToken(data.session?.access_token);
					setLoading(false);
				}
			})
			.catch((error) => {
				if (mounted) {
					setCallbackError(error instanceof Error ? error.message : String(error));
					setLoading(false);
				}
			});
		const { data: listener } = recordlyAuth.auth.onAuthStateChange((_event, session) => {
			if (mounted) {
				setUser(session?.user ?? null);
				setAccessToken(session?.access_token);
			}
		});

		const handleCallback = async (url: string) => {
			try {
				setCallbackError(undefined);
				await completeAuthCallback(url);
			} catch (error) {
				setCallbackError(error instanceof Error ? error.message : String(error));
			}
		};
		const unsubscribe = window.electronAPI.onAuthCallbackUrl((url) => void handleCallback(url));
		void window.electronAPI.getPendingAuthCallbackUrl().then((url) => {
			if (url) void handleCallback(url);
		});

		return () => {
			mounted = false;
			listener.subscription.unsubscribe();
			unsubscribe();
		};
	}, []);

	return { user, accessToken, loading, configured: recordlyAuthConfigured, callbackError };
}
