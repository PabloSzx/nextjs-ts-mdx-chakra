import { promises } from "fs";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { join } from "path";

import { Stack } from "@chakra-ui/react";

import { components } from "../../components/markdownComponents";
import { getDocsFolder, getDocsPaths } from "../../utils/mdx";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { MdxRemote } from "next-mdx-remote/types";
interface PostProps {
  source: MdxRemote.Source;
  frontMatter: Record<string, any>;
}

export default function PostPage({ source }: PostProps) {
  const content = hydrate(source, { components });

  return (
    <Stack>
      <main>{content}</main>
    </Stack>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = (
    await promises.readFile(join(getDocsFolder("docs"), `${params!.slug}.mdx`))
  ).toString("utf-8");

  const { content, data } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
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
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getDocsPaths("docs"))
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
