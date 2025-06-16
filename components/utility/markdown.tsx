"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownProps {
  content: string
  className?: string
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div
      className={cn("prose prose-gray dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom renderers for better styling
          h1: ({ children }) => (
            <h1 className="mt-6 mb-4 text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-3 text-2xl font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-xl font-medium">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-2 pl-6">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
          code: ({ className, children }) => {
            if (!className) {
              return (
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
                  {children}
                </code>
              )
            }
            return (
              <pre className="bg-muted mb-4 overflow-x-auto rounded-lg p-4">
                <code className={className}>{children}</code>
              </pre>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-primary my-4 border-l-4 pl-4 italic">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 h-auto max-w-full rounded-lg"
            />
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="divide-border min-w-full divide-y">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="text-muted-foreground px-4 py-2 text-left font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-t px-4 py-2">{children}</td>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
