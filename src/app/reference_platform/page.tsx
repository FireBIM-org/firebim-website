"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// The page moved to /firebim_platform. This is a static export, so the redirect is done client-side.
export default function ReferencePlatformRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/firebim_platform/");
  }, [router]);

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4 py-24 text-center">
      <p className="text-gray-600">
        This page moved to{" "}
        <Link href="/firebim_platform/" className="font-medium text-blue-600 underline">
          firebim.org/firebim_platform
        </Link>
        .
      </p>
    </main>
  );
}
