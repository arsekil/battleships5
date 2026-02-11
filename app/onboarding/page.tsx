import React from "react";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
	const { sessionClaims } = await auth();
	return (
		<>Onboarding status: {`${sessionClaims?.metadata?.onboardingComplete}`}</>
	);
}