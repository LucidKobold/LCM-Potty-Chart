import React from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";

const UPDATE_ACTIVATEACCOUNT = gql`
  mutation ActivateAccount($activationToken: String!) {
    activateAccount(activationToken: $activationToken) {
      id
      userId
      token
      validated
      validatedAt
      createdAt
      updatedAt
    }
  }
`;

const ActivateAccount = (): JSX.Element => {
  const router = useRouter();
  const { activationToken } = router.query;

  const [updatedToken, { data }] = useMutation(UPDATE_ACTIVATEACCOUNT);

  const activateAccount = async (activationToken: string): Promise<unknown> =>
    await updatedToken({ variables: { activationToken: activationToken } });

  return (
    <Box pt="50px">
      <Button
        onClick={() => {
          if (!Array.isArray(activationToken)) {
            activateAccount(activationToken);
          }
        }}
      >
        {"Activate Your Account"}
      </Button>
    </Box>
  );
};

export default ActivateAccount;
