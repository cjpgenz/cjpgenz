import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "light" | "dark";
}

export default function Logo({
  variant = "light",
  className = "w-full h-full",
  ...props
}: LogoProps) {
  const isDark = variant === "dark";

  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Orange segment of outer circle */}
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="#E0651E"
        strokeWidth="3"
        strokeDasharray="46 1000"
        transform="rotate(-90 32 32)"
      ></circle>

      {/* Green segment of outer circle */}
      <circle
        cx="32"
        cy="32"
        r="29"
        fill="none"
        stroke="#1F5A2E"
        strokeWidth="3"
        strokeDasharray="46 1000"
        transform="rotate(30 32 32)"
      ></circle>

      {/* Outer thin boundary circle - Only for Light variant */}
      {!isDark && (
        <circle cx="32" cy="32" r="29" fill="none" stroke="#2A1A10" strokeWidth="0.8"></circle>
      )}

      {/* Cockroach body segments */}
      <ellipse cx="32" cy="36" rx="11" ry="16" fill={isDark ? "#F0E5D0" : "#5A2F12"}></ellipse>
      <ellipse cx="32" cy="25" rx="7" ry="6" fill={isDark ? "#F0E5D0" : "#5A2F12"}></ellipse>

      {/* Cockroach antennae - Only for Light variant */}
      {!isDark && (
        <path
          d="M28 17 Q22 10 18 8 M36 17 Q42 10 46 8"
          stroke="#2A1A10"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        ></path>
      )}

      {/* Cockroach glasses */}
      <rect x="26" y="23" width="12" height="3.5" rx="1" fill={isDark ? "#1a1410" : "#0a0807"}></rect>
    </svg>
  );
}
