import React, { useEffect } from "react";
import { Divider, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DisplayMessage from "../../components/auth/DisplayMessage";

const VerifyPage = (): JSX.Element => {
  const router = useRouter();

  // User session and profile
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status !== "loading") {
      router.push("/");
    }
  }, [router, session, status]);

  return (
    <DisplayMessage message="Please check your email for the link to login to your account." />
  );
};

export default VerifyPage;
