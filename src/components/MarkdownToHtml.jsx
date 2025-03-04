import ReactMarkdown from 'react-markdown';
export const MarkdownToHtml = ({ markdownText }) => {
  return (
    <div>
      {/* Render the markdown content as React components */}
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
};