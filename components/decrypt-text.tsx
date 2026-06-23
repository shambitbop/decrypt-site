import { ElementType } from "react";
import { cn } from "@/lib/utils";

type DecryptTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** substring rendered in accent green (the word that "pops") */
  accent?: string;
  // kept for call-site compatibility; no longer animated
  trigger?: "load" | "view" | "hover";
  options?: unknown;
};

/**
 * Renders text instantly with an optional accent word in green.
 * (The scramble/decode animation was removed so headlines paint immediately.)
 */
export function DecryptText({ text, as: Tag = "span", className, accent }: DecryptTextProps) {
  if (!accent || !text.includes(accent)) {
    return <Tag className={cn(className)}>{text}</Tag>;
  }
  const start = text.indexOf(accent);
  const before = text.slice(0, start);
  const mid = text.slice(start, start + accent.length);
  const after = text.slice(start + accent.length);
  return (
    <Tag className={cn(className)}>
      {before}
      <span className="glyph-accent">{mid}</span>
      {after}
    </Tag>
  );
}
