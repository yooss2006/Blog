"use client";

import { useEffect, useRef, useState } from "react";

export default function CommentViewer() {
  const commentRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !commentRef.current) {
      return undefined;
    }

    const currentRef = commentRef.current;
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", "yooss2006/blog");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comments");
    script.setAttribute("theme", "github-dark");

    currentRef.appendChild(script);

    return () => {
      if (currentRef) {
        currentRef.removeChild(script);
      }
    };
  }, [isMounted]);

  return <div ref={commentRef} className="w-[1000px] mx-auto" />;
}
