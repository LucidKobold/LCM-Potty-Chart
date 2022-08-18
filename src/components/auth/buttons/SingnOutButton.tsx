import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const SignOutButton = (): JSX.Element => {
  return (
    <Button
      leftIcon={<Icon icon="ph:sign-out-fill" />}
      w="fit-content"
      variant="signIn"
      onClick={() => signOut()}
      type="button"
    >
      {`Signout`}
    </Button>
  );
};

export default SignOutButton;
