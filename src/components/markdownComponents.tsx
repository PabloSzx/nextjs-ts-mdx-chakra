import { chakra } from "@chakra-ui/react";

const H1 = chakra("h1", {
  baseStyle: {
    fontSize: "2em",
  },
});

export const components = {
  h1: H1,
};
