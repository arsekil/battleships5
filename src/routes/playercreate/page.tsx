"use server";

import { getAuthToken } from "@/helpers/getAuthToken";
import { api } from "@/convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { redirect, RedirectType } from "next/navigation";

export default async function Page() {
  try {
    const token: string | undefined = await getAuthToken();
    await fetchMutation(api.mutations.createNewPlayer, {}, { token });
  } catch (error) {
    console.error("Error creating new player:", error);
  }
  redirect('/onboarding', RedirectType.replace)
}