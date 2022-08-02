import React from "react";
import { Box, Heading } from "@chakra-ui/react";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

const NewUserPage = (): JSX.Element => {
  return (
    <Box pt="50px">
      <Heading as="h2">{"Welcome new user."}</Heading>
    </Box>
  );
};

export default NewUserPage;
