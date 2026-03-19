"use server";

import { auth } from "@clerk/nextjs/server";
import ClientRedirect from "./ClientRedirect";

export default async function Page() {
  try {
    const { userId } = await auth();
    await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`
      },
      body: JSON.stringify({
        public_metadata: {
          "onbardingComplete": false
        },
        private_metadata: {},
        unsafe_metadata: {}
      })
    }).catch((error) => {
      console.log("Error updating Clerk user metadata: ", error)
    });
  } catch (error) {
     console.log('Error on updateMetadata Server Page', error);
  }
  return (
    <ClientRedirect destination={'/playercreate'} />
  )
}