import React from "react";
import { useSession } from "next-auth/react";
import { Box, VStack } from "@chakra-ui/react";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import ProfileHeader from "../../components/profile/ProfileHeader";

const UserProfile = (): JSX.Element => {
  const { data: session, status } = useSession();

  return status === "loading" ? (
    <VStack
      pt="50px"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
    >
      <LoadingOverlay />
      <ProfileHeader loading={true} />
    </VStack>
  ) : session ? (
    <VStack
      pt="50px"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
    >
      <ProfileHeader
        name={session.user.name}
        email={session.user.email}
        image={session.user.image}
        loading={false}
      />
    </VStack>
  ) : (
    <Box pt="50px">{"You must be logged in to view your profile."}</Box>
  );
};

export default UserProfile;
