"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  code,
  language = "text",
}: {
  code: string;
  language?: string;
}) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    import("@/src/lib/hightlight").then(({ highlightCode }) => {
      highlightCode(code, language).then((res) => {
        if (mounted) setHtml(res);
      });
    });

    return () => {
      mounted = false;
    };
  }, [code, language]);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute cursor-pointer flex items-center text-xs right-3 top-7 z-10 opacity-0 group-hover:opacity-100
                   transition bg-transparent text-muted space-x-2"
      >
        {copied ? (
          <>
            <Check className="text-green-500" size={12} /> <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="text-white" size={12} /> <span>Copy code</span>
          </>
        )}
      </button>

      {/* Highlighted HTML */}
      <div
        className="overflow-x-auto rounded-lg text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
