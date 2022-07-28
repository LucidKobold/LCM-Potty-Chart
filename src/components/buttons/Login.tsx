import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";

const LoginButton = (): JSX.Element => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button variant="prmary" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button variant="danger" onClick={() => signIn()}>
        Sign in
      </Button>
    </>
  );
};

export default LoginButton;
