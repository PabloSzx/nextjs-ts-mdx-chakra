import { readFile } from "fs/promises";
import globby from "globby";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { join, resolve } from "path";

import type { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsContext } from "next";
import type { CmpInternalProps } from "./client";

export async function MDXProps(
  getSource: (data: {
    params: Record<string, string | string[] | undefined>;
    readFile: typeof readFile;
    join: typeof join;
    resolve: typeof resolve;
    getParam: (name: string) => string;
  }) => Promise<string | Buffer>,
  { params = {} }: Pick<GetStaticPropsContext, "locale" | "params"> = {}
): Promise<GetStaticPropsResult<CmpInternalProps>> {
  const source = await getSource({
    params,
    readFile,
    join,
    resolve,
    getParam(name) {
      const param = params[name];

      if (typeof param !== "string") throw Error(`No ${name} provided!`);

      return param;
    },
  });

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-prism")],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export async function MDXPaths(
  patterns: string | string[],
  _ctx: Pick<GetStaticPathsContext, "locales">
) {
  const paths: {
    params: {
      slug: string;
    };
  }[] = [];

  const docsSlugs = (await globby(patterns))
    .map((path) =>
      path
        .replace(/\.mdx?$/, "")
        .split("/")
        .pop()
    )
    .filter((v): v is NonNullable<typeof v> => !!v);

  for (const slug of docsSlugs) {
    paths.push({
      params: {
        slug,
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
}
