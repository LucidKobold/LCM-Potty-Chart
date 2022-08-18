import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import ModifyAccount from "../../components/welcome/ModifyAccount";
import fetchActivationStatus from "../../../lib/activation/fetchActivationStatus";
import validateToken from "../../../lib/activation/validateActivationToken";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

const NewUserPage = (): JSX.Element => {
  const { data: session /*, status */ } = useSession();

  const [tokenStatus, setTokenStatus] = useState<{
    status: boolean | null;
    message: string;
  }>({
    status: false,
    message: "Status not checked."
  });

  useEffect(() => {
    if (session) {
      if (session.user) {
        const { id } = session.user;
        fetchActivationStatus.withUserId(id).then((res) => {
          setTokenStatus(
            validateToken({
              ...res.data.getVerificationWithUserId,
              sessionUserId: id
            })
          );
        });
      }
    }
  }, [session]);

  return session ? (
    <Box pt="50px">
      {tokenStatus.status === null ? (
        <Box>
          {
            "Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists."
          }
        </Box>
      ) : tokenStatus.status ? (
        <ModifyAccount />
      ) : (
        <Box>{tokenStatus.message}</Box>
      )}
    </Box>
  ) : (
    <Box pt="50px">{"Please register to see the welcome page!"}</Box>
  );
};

export default NewUserPage;
