import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown, { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

type Props = {
  content: string;
};

type CommonProps<T extends HTMLElement> = React.HTMLAttributes<T> &
  React.ClassAttributes<T> &
  ExtraProps;

function CustomCodeBlock({
  children,
  className,
  ...rest
}: CommonProps<HTMLElement>) {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <SyntaxHighlighter
      PreTag="div"
      language={match[1]}
      {...rest}
      style={materialDark}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

function CustomLink({
  href,
  children,
  ...props
}: CommonProps<HTMLAnchorElement> & { href: string }) {
  if (!href) return null;
  const isExternalLink = href?.startsWith("http");
  const LinkComponent = isExternalLink ? "a" : Link;
  return (
    <LinkComponent
      href={href}
      {...props}
      className={cn(
        "text-sky-700 dark:text-sky-400 hover:text-sky-500 hover:dark:text-sky-300",
        !isExternalLink && "no-underline",
      )}
    >
      {children}
    </LinkComponent>
  );
}

function CustomText({ node, ...props }: CommonProps<HTMLParagraphElement>) {
  const children: any = node?.children[0];
  return children.tagName === "a" ? <div {...props} /> : <p {...props} />;
}

function CustomImage({
  src,
  alt,
  ...props
}: CommonProps<HTMLImageElement> & { src?: string; alt?: string }) {
  return (
    <Image
      {...props}
      className="w-full object-cover"
      src={src || ""}
      alt={alt || ""}
      width={1000}
      height={1000}
    />
  );
}

export default function MarkdownViewer({ content }: Props) {
  return (
    <Markdown
      className="prose max-w-none md:prose-lg lg:prose-xl dark:prose-invert"
      remarkPlugins={[remarkGfm]}
      components={{
        code: CustomCodeBlock,
        a: CustomLink,
        p: CustomText,
        img: CustomImage,
      }}
    >
      {content}
    </Markdown>
  );
}
