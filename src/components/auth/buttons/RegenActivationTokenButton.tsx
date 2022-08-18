import React from "react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import regenerateActivationToken from "../../../../lib/activation/regenerateActivationToken";

interface RegenActivationTokenButtonProps {
  userId: string;
}

const RegenActivationTokenButton = ({
  userId
}: RegenActivationTokenButtonProps): JSX.Element => {
  return (
    <Button
      leftIcon={<Icon icon="ph:arrows-clockwise-fill" />}
      w="fit-content"
      variant="signIn"
      onClick={() => regenerateActivationToken(userId)}
      type="button"
    >
      {`Regenerate Activation Token`}
    </Button>
  );
};

export default RegenActivationTokenButton;
