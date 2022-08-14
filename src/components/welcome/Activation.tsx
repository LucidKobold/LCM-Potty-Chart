import { gql, useMutation } from "@apollo/client";
import { Box, Button } from "@chakra-ui/react";
import { addDays } from "date-fns";
import React from "react";

interface ActivateProps {
  userId: string;
}

// TODO: Check if user has a verification token already created and offer the option to re-send and re-create the token.

const Activation = ({ userId }: ActivateProps): JSX.Element => {
  const CREATE_GENVERIFICATIONTOKEN = gql`
    mutation Mutation($userId: String!, $expires: Date!) {
      genVerificationEmail(userId: $userId, expires: $expires) {
        id
        userId
        token
        validated
        validatedAt
        createdAt
        updatedAt
        expires
      }
    }
  `;
  const [createToken, { data }] = useMutation(CREATE_GENVERIFICATIONTOKEN);

  const genVerificationEmail = async (id: string): Promise<unknown> => {
    const expDate: Date = addDays(new Date(), 1);
    return await createToken({ variables: { userId: id, expires: expDate } });
  };

  return (
    <Box>
      <Button onClick={() => genVerificationEmail(userId)}>
        {"Activate Account"}
      </Button>
    </Box>
  );
};

export default Activation;
