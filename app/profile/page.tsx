"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// The profile page has been renamed to Dashboard.
// This page redirects to the new Dashboard route.
export default function ProfileRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard");
    }, [router]);

    return (
        <div style={{
            background: "#0a0a2e",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }}>
            Redirecting to Dashboard...
        </div>
    );
}
