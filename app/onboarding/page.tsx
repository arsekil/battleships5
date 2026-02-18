"use client";

import React from "react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useUser } from "@clerk/clerk-react";

export default function Onboarding() {
	const { user } = useUser();
	return (
		<>
			<Authenticated>
				<p>User ID: {user?.id}</p>
			</Authenticated>
			<Unauthenticated>
				<p>You are not authenticated. Please sign in to continue.</p>
			</Unauthenticated>
		</>
	);
}