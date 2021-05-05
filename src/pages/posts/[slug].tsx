import { Stack } from "@chakra-ui/react";

import { MDXPage } from "../../mdx/client";
import { MDXPaths, MDXProps } from "../../mdx/server";

import type { GetStaticPaths, GetStaticProps } from "next";

export default MDXPage(function PostPage({ content }) {
  return (
    <Stack>
      <main>{content}</main>
    </Stack>
  );
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  return MDXProps(({ getParam, readFile }) => {
    return readFile(`docs/${getParam("slug")}.mdx`);
  }, ctx);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return MDXPaths("docs", ctx);
};
