"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect({ destination }: { destination: string }) {
  const router = useRouter();

  React.useEffect(() => {
    if (destination) {
      router.replace(destination)
    }
  }, [router, destination]);

  return (
    <div>Loading...please wait!</div>
  )
}