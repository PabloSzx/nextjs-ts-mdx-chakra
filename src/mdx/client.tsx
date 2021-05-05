import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { createElement, ReactElement, ReactNode } from "react";

import { components } from "./shared";

export interface CmpProps {
  content: ReactNode;
  frontMatter: Record<string, any>;
}

export interface CmpInternalProps {
  children?: ReactNode;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  frontMatter: Record<string, any>;
}

export function MDXPage(cmp: (props: CmpProps) => ReactElement) {
  return function MDXPage({ children, source, frontMatter }: CmpInternalProps) {
    const content = <MDXRemote {...source} components={components} />;

    return createElement(cmp, {
      content,
      frontMatter,
      children,
    });
  };
}
