"use server";

import { auth } from "@clerk/nextjs/server";

export default async function fetchPlayerData() {
  try {
    const { userId } = await auth();
    const result = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Accept": "*/*",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
      },
    });
    if (!result.ok) {
      throw new Error(`Clerk Backend API returned an error: ${result.statusText}`);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("fetchPlayerNickname got an error: ", error)
  }
}