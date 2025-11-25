import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageRendererProps {
  text: string;
}

/**
 * Component that renders chat messages with support for Markdown links.
 * Allows clickable links in AI responses.
 */
const MessageRenderer: React.FC<MessageRendererProps> = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a
            {...props}
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          />
        ),
        p: ({ node, ...props }) => <p {...props} className="inline" />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default MessageRenderer;
