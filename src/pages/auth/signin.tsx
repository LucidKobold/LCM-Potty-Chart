import React from "react";
import { Box, Divider, VStack } from "@chakra-ui/react";
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
      my="30vh"
      justifyContent="center"
      alignContent="center"
    >
      <VStack
        h="auto"
        w={{ base: "95vw", sm: "85vw", md: "80vw" }}
        px={12}
        py={8}
        justifyContent="center"
        alignItems="center"
        border="1px solid #0068ff"
        borderRadius="2xl"
        boxShadow="rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px"
        spacing={4}
      >
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
