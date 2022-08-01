import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const NewUserPage = (): JSX.Element => {
  return (
    <Box pt="50px">
      <Heading as="h2">{"Welcome new user."}</Heading>
    </Box>
  );
};

export default NewUserPage;
