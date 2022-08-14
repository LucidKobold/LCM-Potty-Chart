import React from "react";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import Activation from "../../components/welcome/Activation";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

const NewUserPage = (): JSX.Element => {
  const { data: session, status } = useSession();
  return session ? (
    <Box pt="50px">
      <Activation userId={session.user.id} />
    </Box>
  ) : (
    <Box pt="50px">{"Please register to see the welcome page!"}</Box>
  );
};

export default NewUserPage;
