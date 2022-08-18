import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DisplayMessage from "../../components/auth/DisplayMessage";

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

  return <DisplayMessage message="Signing you out..." loading />;
};

export default SignOutPage;
