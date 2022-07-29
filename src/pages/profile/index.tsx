import React from "react";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import LoadingOverlay from "../../components/loading/LoadingOverlay";

const UserProfile = (): JSX.Element => {
  const { data: session, status } = useSession();

  return status === "loading" ? (
    <LoadingOverlay />
  ) : session ? (
    <Box pt="50px">{`Welcome to your profile ${session.user.email}`}</Box>
  ) : (
    <Box pt="50px">{"You must be logged in to view your profile."}</Box>
  );
};

export default UserProfile;
