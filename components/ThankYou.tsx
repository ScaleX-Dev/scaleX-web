'use client'
import React from "react";
import Link from "next/link";

type ThankYouProps = {
    name?: string;
    scheduledAt?: string | Date;
    supportEmail?: string;
    onGoHome?: () => void;
};

export default function ThankYou({
    name,
    scheduledAt,
    supportEmail = "support@example.com",
    onGoHome,
}: ThankYouProps) {
    const formattedDate =
        scheduledAt instanceof Date
            ? scheduledAt.toLocaleString()
            : scheduledAt
            ? new Date(scheduledAt).toLocaleString()
            : null;

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                maxWidth: 800,
                margin: "48px auto",
                padding: 24,
                borderRadius: 8,
                background: "white",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                textAlign: "center",
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
        >
            <h1 style={{ margin: 0, fontSize: 28 }}>Thank you{ name ? `, ${name}` : "" }!</h1>
            <p style={{ marginTop: 12, color: "#333", fontSize: 16 }}>
                We received your appointment request. One of our team members will reach out to you soon.
            </p>

            {formattedDate && (
                <p style={{ marginTop: 8, color: "#555", fontSize: 14 }}>
                    Scheduled for: <strong>{formattedDate}</strong>
                </p>
            )}

            <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
                {onGoHome ? (
                    <button
                        onClick={onGoHome}
                        style={{
                            padding: "10px 16px",
                            borderRadius: 6,
                            border: "none",
                            background: "#111827",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Back to home
                    </button>
                ) : (
                    <Link
                        href="/"
                        style={{
                            display: "inline-block",
                            padding: "10px 16px",
                            borderRadius: 6,
                            background: "#111827",
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        Back to home
                    </Link>
                )}

                <a
                    href={`mailto:${supportEmail}`}
                    style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        borderRadius: 6,
                        border: "1px solid #e5e7eb",
                        background: "transparent",
                        color: "#111827",
                        textDecoration: "none",
                    }}
                >
                    Contact support
                </a>
            </div>
        </div>
    );
}