"use server";

import { redirect, RedirectType } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/helpers/clerkClient";

export default async function Page() {
	const { userId } = await auth();

	await client.users.updateUserMetadata(userId as string, {
		publicMetadata: {
			"onboardingComplete": "false",
			"skipOnboardingTemporarily": "false"
		},
		privateMetadata: {},
		unsafeMetadata: {}
	});
	
	redirect('/playercreate', RedirectType.replace);
}