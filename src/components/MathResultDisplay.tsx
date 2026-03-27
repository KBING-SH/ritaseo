import { useRef, useEffect } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { useState } from "react";

interface MathResultDisplayProps {
  solution: string;
  isStreaming: boolean;
  onReset?: () => void;
}

export function MathResultDisplay({ solution, isStreaming, onReset }: MathResultDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll during streaming
  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [solution, isStreaming]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!solution && !isStreaming) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-border/50 shrink-0">
        <h2 className="text-sm font-semibold text-title">Solution</h2>
        <div className="flex items-center gap-2">
          {solution && !isStreaming && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-title hover:bg-muted/50 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={onReset}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-title hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                New Problem
              </button>
            </>
          )}
          {isStreaming && (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Solving...
            </span>
          )}
        </div>
      </div>

      {/* Solution content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 lg:px-6 py-4">
        <div className="prose prose-sm dark:prose-invert max-w-none [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_p]:text-sm [&_li]:text-sm">
          <MathMarkdown content={solution} />
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-primary animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}

// Simple markdown-like renderer for math content
function MathMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  
  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        
        if (!trimmed) return <br key={i} />;
        
        // Headers
        if (trimmed.startsWith("### ")) return <h3 key={i} className="text-title font-semibold mt-3 mb-1">{trimmed.slice(4)}</h3>;
        if (trimmed.startsWith("## ")) return <h2 key={i} className="text-title font-semibold mt-4 mb-2">{trimmed.slice(3)}</h2>;
        if (trimmed.startsWith("# ")) return <h1 key={i} className="text-title font-bold mt-4 mb-2">{trimmed.slice(2)}</h1>;
        
        // Bullet points
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={i} className="flex gap-2 my-0.5">
              <span className="text-primary mt-0.5">•</span>
              <span className="text-body-desc"><InlineFormat text={trimmed.slice(2)} /></span>
            </div>
          );
        }
        
        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s(.+)/);
        if (numMatch) {
          return (
            <div key={i} className="flex gap-2 my-0.5">
              <span className="text-primary font-medium min-w-[1.2em]">{numMatch[1]}.</span>
              <span className="text-body-desc"><InlineFormat text={numMatch[2]} /></span>
            </div>
          );
        }
        
        // Regular paragraph
        return <p key={i} className="text-body-desc my-1 leading-relaxed"><InlineFormat text={trimmed} /></p>;
      })}
    </>
  );
}

function InlineFormat({ text }: { text: string }) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="text-title font-semibold">{part.slice(2, -2)}</strong>;
        }
        // Inline code
        const codeParts = part.split(/(`[^`]+`)/g);
        return codeParts.map((cp, j) => {
          if (cp.startsWith("`") && cp.endsWith("`")) {
            return <code key={`${i}-${j}`} className="px-1.5 py-0.5 rounded bg-muted text-primary text-xs font-mono">{cp.slice(1, -1)}</code>;
          }
          return <span key={`${i}-${j}`}>{cp}</span>;
        });
      })}
    </>
  );
}
