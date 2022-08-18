import React, { useEffect } from "react";
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

  return session ? (
    <DisplayMessage message="Please check your email for the link to login to your account." />
  ) : (
    <DisplayMessage
      message="Looks like you are already signed in. Redirecting to home..."
      error
    />
  );
};

export default VerifyPage;
