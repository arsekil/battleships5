"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { ConvexError } from "convex/values";

export default function PlayerCreate() {
  const router = useRouter();
  const playerCreated = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const createNewPlayer = useMutation(api.mutations.createNewPlayer);

  React.useEffect(() => {
    if (playerCreated.current) {
      return;
    }
    
    
    const createPlayer = async () => {
      try {
        setIsLoading(true);
        createNewPlayer({});
        playerCreated.current = true;
        router.replace('/onboarding');
      } catch (err) {
        console.error("Failed to create player:", err);
        setError(err instanceof ConvexError ? err.message : "Failed to create player");
        playerCreated.current = false; // Allow retry
      } finally {
        setIsLoading(false);
      }
    }
    
    createPlayer();
    
  }, [router, createNewPlayer]);
  
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
        <p>Creating your player profile...</p>
      </div>
    );
  }

  return null;
}