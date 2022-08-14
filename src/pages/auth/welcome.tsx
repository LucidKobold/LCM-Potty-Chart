import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import Activation from "../../components/welcome/Activation";
import { gql, useLazyQuery } from "@apollo/client";
import { isBefore } from "date-fns";
import ModifyAccount from "../../components/welcome/ModifyAccount";

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
      return "";
    }
  };

  const [loadTokenInfo, { loading, data }] = useLazyQuery(FETCH_VERIFYTOKEN, {
    variables: { userId: readUserId() }
  });

  useEffect(() => {
    if (session) {
      loadTokenInfo();
    }
  }, [loadTokenInfo, session]);

  const validateToken = ({
    validated,
    userId,
    validatedAt,
    expires
  }: Token): { status: boolean; message: string } => {
    let flag = false;
    let message =
      "An error ocurred when checking if your account was activated. Please try again.";
    console.info(validated, userId, validatedAt, expires);

    if (
      validated === undefined ||
      validatedAt === undefined ||
      expires === undefined ||
      userId === undefined
    ) {
      message =
        "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists.";
    }

    if (!validated || validatedAt === null) {
      message =
        "Account not activated. Please check your email for the activation link.";
    }

    if (userId !== session.user.id) {
      message =
        "An error occurred when fetching your activation status. Please try again. Contact support if this issue persists.";
    }

    if (!isBefore(new Date(validatedAt), new Date(expires))) {
      message =
        "Your activation status is not valid. Please activate your account again by generating a new activation token.";
    }

    if (
      validated &&
      userId === session.user.id &&
      isBefore(new Date(validatedAt), new Date(expires))
    ) {
      message = "Your account is activated.";
      flag = true;
    }

    return { status: flag, message: message };
  };

  return session ? (
    <Box pt="50px">
      <Activation userId={session.user.id} />
      {data ? (
        validateToken(data.getVerificationWithUserId).status ? (
          <ModifyAccount />
        ) : (
          <Box>{validateToken(data.getVerificationWithUserId).message}</Box>
        )
      ) : (
        <Box>
          {
            "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists."
          }
        </Box>
      )}
    </Box>
  ) : (
    <Box pt="50px">{"Please register to see the welcome page!"}</Box>
  );
};

export default NewUserPage;
