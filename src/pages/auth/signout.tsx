import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

const SignOutPage = (): JSX.Element => {
  const router = useRouter();

  // User session and profile
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status !== "loading") {
      signOut();
    }

    router.push("/");
  }, [router, session, status]);

  return (
    <Box pt="50px">
      <Heading as="h2">{"Signing you out..."}</Heading>
    </Box>
  );
};

export default SignOutPage;
