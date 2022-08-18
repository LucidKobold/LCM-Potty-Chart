import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";

const VerifyPage = (): JSX.Element => {
  const router = useRouter();

  // User session and profile
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status !== "loading") {
      router.push("/");
    }
  }, [router, session, status]);

  return session ? (
    <Box>
      <Title title="Check Email" />
      <DisplayMessage message="Please check your email for the link to login to your account." />
    </Box>
  ) : (
    <Box>
      <Title title="redirecting" />
      <DisplayMessage
        message="Looks like you are already signed in. Redirecting to home..."
        error
      />
    </Box>
  );
};

export default VerifyPage;
