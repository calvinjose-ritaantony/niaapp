import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownToHtml = (markdownText) => {
  const [markdownContent, setMarkdownContent] = useState("");
  useEffect(()=>{
    console.log("markdownText", markdownText);
    setMarkdownContent(markdownText.markdownText);
  },[markdownText])

  // Show a loading message while data is being fetched
  if (!markdownContent) {
    return null;
  }

  return (
    <div>
      <pre><ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown></pre>
    </div>
  );
};

export {MarkdownToHtml};
