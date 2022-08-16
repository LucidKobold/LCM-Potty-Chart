import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";

/**
 * TODO:Fetch the token to make sure it is valid before attempting to activate it.
 * ? Display errors if the token is not found or is expired. Show a link the re-generate
 * ? the token if the token was valid, but expired. If the token was already activated
 * ? direct the user to the welcome page.
 */

const ActivateAccount = (): JSX.Element => {
  const router = useRouter();
  const { activationToken } = router.query;

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

  const [updatedToken, { data }] = useMutation(UPDATE_ACTIVATEACCOUNT);

  useEffect(() => {
    if (activationToken) {
      updatedToken({ variables: { activationToken: activationToken } })
        .then((res) => {
          router.push("/auth/welcome");
        })
        .catch((err) => {
          console.warn(
            "An error occurred while trying to find the provided token."
          );
        });
    }
  }, [activationToken, data, router, updatedToken]);

  return (
    <Box pt="50px">
      {!data
        ? "An error occurred or this wasn't a valid activation token."
        : "Activating your account..."}
    </Box>
  );
};

export default ActivateAccount;
