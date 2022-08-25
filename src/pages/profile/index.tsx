import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";

const UserProfile = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  return status === "loading" ? (
    <Box>
      <Title title="Loading" />
      <ProfileHeader loading={true} />
    </Box>
  ) : session ? (
    <VStack
      my="10vh"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Title title="User Profile" />
      <ProfileHeader
        name={session.user.name}
        username={session.user.username}
        image={session.user.image}
        bio={session.user.bio}
        loading={false}
      />
    </VStack>
  ) : (
    <Box>
      <Title title="Redirecting..." />
      <DisplayMessage
        message="You must be logged in to view your profile. Redirecting to the signin page..."
        error
      />
    </Box>
  );
};

export default UserProfile;
