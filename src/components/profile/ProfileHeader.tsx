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
  email?: string;
  image?: string;
  loading: boolean;
}

const ProfileHeader = ({
  name,
  email,
  image,
  loading
}: ProfileHeaderProps): JSX.Element => {
  return loading ? (
    <VStack
      pt="50px"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
    >
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
    </VStack>
  ) : (
    <VStack
      pt="50px"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
    >
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
          <Heading as="h2" size="md">{`@${email.split("@")[0]}`}</Heading>
        </VStack>
        <Box>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          }
        </Box>
      </VStack>
    </VStack>
  );
};

export default ProfileHeader;
