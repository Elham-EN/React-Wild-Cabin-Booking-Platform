"use client";
import React, { ReactElement, useState } from "react";

interface TextExpanderProps {
  children: string;
}

function TextExpander({ children }: TextExpanderProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1
            cursor-pointer hover:text-accent-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
