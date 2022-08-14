import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import Activation from "../../components/welcome/Activation";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { isBefore } from "date-fns";
import { parseISO } from "date-fns/esm";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

interface Token {
  id: string;
  userId: string;
  token: string;
  validated: boolean;
  validatedAt?: Date;
  expires: Date;
}

const NewUserPage = (): JSX.Element => {
  const { data: session, status } = useSession();

  const FETCH_VERIFYTOKEN = gql`
    query GetVerificationWithUserId($userId: String!) {
      getVerificationWithUserId(userId: $userId) {
        id
        userId
        token
        validated
        validatedAt
        expires
      }
    }
  `;

  const readUserId = (): string => {
    if (session) {
      return session.user.id;
    } else {
      return ""
    }
  }

  const [loadTokenInfo, { called, loading, data }] = useLazyQuery(FETCH_VERIFYTOKEN, { variables: { userId: readUserId() } });

  useEffect(() => {
    if (session) {
      loadTokenInfo();
    }
  }, [loadTokenInfo, session])


  const validateToken = ({
    validated,
    userId,
    validatedAt,
    expires
  }: Token): boolean => {
    let flag = false;

    if (validatedAt === null) {
      return flag;
    }

    if (
      userId === session.user.id &&
      validated &&
      isBefore(new Date(validatedAt), new Date(expires))
    ) {
      flag = true;
    }

    return flag;
  };

  return session ? (
    <Box pt="50px">
      <Activation userId={session.user.id} />
      {data && validateToken(data.getVerificationWithUserId) ? (
        <Box>{"Account valid"}</Box>
      ) : (
        <Box>{"Account not valid"}</Box>
      )}
    </Box>
  ) : (
    <Box pt="50px">{"Please register to see the welcome page!"}</Box>
  );
};

export default NewUserPage;
