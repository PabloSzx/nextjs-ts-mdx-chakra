import { Button as ChakraButton } from "@chakra-ui/react";

import type { ReactNode } from "react";

export function Button({ children }: { children: ReactNode }) {
  return (
    <ChakraButton
      variant="ghost"
      borderRadius="3px"
      border="1px solid black"
      color="black"
      padding="0.5em 1em"
      cursor="pointer"
      fontSize="1.1em"
    >
      {children}
    </ChakraButton>
  );
}
