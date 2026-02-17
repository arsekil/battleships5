"use client";

import React from "react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router";

export default function PlayerCreate() {
  const navigate = useNavigate();
  const playerCreated = React.useRef(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const createNewPlayer = useMutation(api.mutations.createNewPlayer);

  React.useEffect(() => {
    if (playerCreated.current) {
      return;
    }
    
    playerCreated.current = true;

    const createPlayer = async () => {
      try {
        setIsLoading(true);
        createNewPlayer({});
        navigate('/onboarding', { replace: true });
      } catch (err) {
        console.error("Failed to create player:", err);
        setError(err instanceof Error ? err.message : "Failed to create player");
        playerCreated.current = false; // Allow retry
      } finally {
        setIsLoading(false);
      }
    }
    
    createPlayer();
    
  }, [navigate, createNewPlayer]);
  
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