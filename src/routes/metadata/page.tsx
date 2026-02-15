"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { clerkClient } from "../../helpers/clerkClient";

export default function Metadata() {
	const { userId } = useAuth();

	useEffect(() => {
		if (!userId) {
			return;
		}

		clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				onboardingComplete: false,
				skipOnboardingTemporarily: false
			}
		})
			.then(() => {

			})
			.catch(error => {
				console.error("Failed:", error);
				return (
					<div>
						<p>Failed to initialize metadata.</p>
						<p>{error}</p>
					</div>
				)
			});

	}, [userId]);

	return <div>Initializing...</div>;
}