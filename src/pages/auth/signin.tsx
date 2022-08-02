import React from "react";
import { Box, Divider, Heading, Image, VStack } from "@chakra-ui/react";
import {
  getProviders,
  signIn,
  getSession,
  LiteralUnion,
  ClientSafeProvider
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import SignInButton from "../../components/auth/buttons/SignInButton";
import EmailForm from "../../components/auth/EmailForm";

interface SignInPageProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const SignInPage = ({ providers }: SignInPageProps): JSX.Element => {
  return (
    <VStack
      h="100%"
      w="100%"
      my="20vh"
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
        </VStack>
        {Object.values(providers).map((provider) => {
          const { id, name } = provider;
          return name !== "Email" ? (
            <SignInButton
              key={name.replace(" ", "")}
              provider={name}
              id={id}
              signIn={signIn}
            />
          ) : (
            <Box key={name.replace(" ", "")} h="100%" w="100%">
              <Divider my={10} />
              <EmailForm id={id} provider={name} signIn={signIn} />
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};

SignInPage.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await getProviders()
  };
};

export default SignInPage;
