import React from "react";
import { Divider, Heading, Image, Text, VStack } from "@chakra-ui/react";

const VerifyPage = (): JSX.Element => {
  return (
    <VStack
      h="100%"
      w="100%"
      my="30vh"
      justifyContent="center"
      alignContent="center"
    >
      <VStack
        h="auto"
        w={{ base: "95vw", sm: "90vw", md: "85vw", lg: "65vw" }}
        px={12}
        py={10}
        justifyContent="center"
        alignItems="center"
        border="1px solid #0068ff"
        borderRadius="2xl"
        boxShadow="rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px"
        spacing={4}
      >
        <VStack
          h="100%"
          w="100%"
          mb="3vh"
          justifyContent="center"
          alignContent="center"
          spacing={6}
        >
          <Image
            h="10rem"
            w="10rem"
            src="/images/logo.svg"
            alt="LCM Potty Chart Logo"
          />
          <VStack
            h="100%"
            w="100%"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            spacing={0}
          >
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>
              {"Lucid Creations Media"}
            </Heading>
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
              {"Code Name:"}
            </Heading>
            <Heading as="h3" fontSize={{ base: "2xl", md: "4xl" }}>
              {"Potty Chart"}
            </Heading>
          </VStack>
          <Divider />
          <Text fontSize="2xl">
            {"Please check your email for the link to login to your account."}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default VerifyPage;
