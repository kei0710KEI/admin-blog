"use client";

import { useState } from "react";

interface CodeComponentProps {
  code: string;
}

export default function CodeComponent({ code }: CodeComponentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <button
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "1",
        background: "#3d3d3d",
        color: "#fff",
        padding: "10px",
      }}
      onClick={handleCopy}
    >
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}
