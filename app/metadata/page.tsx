"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ConvexError } from "convex/values";

export default function Metadata() {
  const updated = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const userId = useQuery(api.queries.getUserBySubject, {});

  React.useEffect(() => {
    if (updated.current) {
      return;
    }


    const updateMetadata = async () => {
      try {
        setIsLoading(true);
        const update = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY! as string}`
          }
        });
        if (update?.ok) {
          updated.current = true;
          router.replace('/playercreate');
        }
      } catch (err) {
        console.error("Failed to update Clerk profile:", err);
        setError(err instanceof ConvexError ? err.message : "Failed to update Clerk profile");
        // updated.current = false;
      } finally {
        setIsLoading(false);
      }
    }

    updateMetadata();

  }, [router, userId]);

  if (error) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div>⚓</div>
        <p>Updating your Clerk User profile...</p>
      </div>
    );
  }

  return null;
}