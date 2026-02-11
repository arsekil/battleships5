"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
	try {
		const { userId } = await auth();
		const result = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
  			method: 'PATCH',
  			headers: {
    			'Content-Type': 'application/json',
    			'Accept': '*/*',
    			Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`
  			},
  			body: JSON.stringify({
    			public_metadata: {
      				"onboardingComplete": "false"
    			},
    			private_metadata: {},
   				unsafe_metadata: {}
  			})
		})
		if (!result.ok) {
			throw new Error(`Clerk Backend API returned an error: ${result.statusText}`);
		}
		return result;
	} catch (error) {
		console.log("Metadata server page got an error: ", error)
		// TODO handle error properly, maybe redirect to an error page or show a message to the user
	}
	redirect('/onboarding', RedirectType.replace);
}