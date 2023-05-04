import {
  VStack,
  Avatar,
  Heading,
  Box,
  Skeleton,
  SkeletonCircle
} from "@chakra-ui/react";
import React from "react";

interface ProfileHeaderProps {
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
  loading: boolean;
}

/**
 * Profile info to be displayed on a user's profile page.
 * @param {string} name name of the user.
 * @param {string} username username of the user.
 * @param {string} image image url of the user.
 * @param {string} bio bio of the user.
 * @param {string} loading is the user data being fetched from the session
 * or database?
 */

const ProfileHeader = ({
  name,
  username,
  image,
  bio,
  loading
}: ProfileHeaderProps): JSX.Element => {
  return loading ? (
    <VStack
      w={{ base: "100%", md: "80vw", lg: "50vw" }}
      h="100%"
      p={{ base: 4, md: 6, lg: 10 }}
      justifyContent="flex-start"
      alignContent="center"
    >
      <SkeletonCircle size="6rem" />
      <VStack
        w="fit-content"
        h="auto"
        textAlign="center"
        justifyContent="center"
        alignContent="center"
      >
        <Skeleton>
          <Heading as="h1" size="md">
            {"Profile Name"}
          </Heading>
        </Skeleton>
        {/* Simulating a username. Update later to use the username stored within the database. */}
        <Skeleton>
          <Heading as="h2" size="md">{`@username`}</Heading>
        </Skeleton>
      </VStack>
      <Skeleton>
        <Box w="100%" h="auto">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        </Box>
      </Skeleton>
      <Skeleton>
        <Box w="100%" h="auto">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        </Box>
      </Skeleton>
      <Skeleton>
        <Box w="100%" h="auto">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        </Box>
      </Skeleton>
    </VStack>
  ) : (
    <VStack
      w={{ base: "100%", md: "80vw", lg: "50vw" }}
      h="100%"
      p={{ base: 4, md: 6, lg: 10 }}
      justifyContent="flex-start"
      alignContent="center"
    >
      <Avatar name={name} size="xl" src={image} />
      <VStack
        w="fit-content"
        h="auto"
        textAlign="center"
        justifyContent="center"
        alignContent="center"
      >
        <Heading as="h1" size="md">
          {name}
        </Heading>
        {/* Simulating a username. Update later to use the username stored within the database. */}
        <Heading as="h2" size="md">
          {`@${username}`}
        </Heading>
      </VStack>
      {bio.length > 1 && <Box>{bio}</Box>}
    </VStack>
  );
};

export default ProfileHeader;