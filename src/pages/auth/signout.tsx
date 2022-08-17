import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

const SignOutPage = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.push("/");
  }, [router]);

  return (
    <Box pt="50px">
      <Heading as="h2">{"Signing you out..."}</Heading>
    </Box>
  );
};

export default SignOutPage;
