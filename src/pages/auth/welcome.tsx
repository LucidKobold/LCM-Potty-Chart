import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import ModifyAccount from "../../components/welcome/ModifyAccount";
import fetchActivationStatus from "../../../lib/activation/fetchActivationStatus";
import validateToken from "../../../lib/activation/validateActivationToken";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

const NewUserPage = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [tokenStatus, setTokenStatus] = useState<{
    status: boolean | null;
    message: string;
  }>({
    status: false,
    message: ""
  });

  useEffect(() => {
    if (session) {
      if (session.user) {
        const { id } = session.user;
        fetchActivationStatus
          .withUserId(id)
          .then((res) => {
            setTokenStatus(
              validateToken({
                ...res.data.getVerificationWithUserId,
                sessionUserId: id
              })
            );
          })
          .catch((err) => {
            console.error(err);
            setTokenStatus({
              status: null,
              message: ""
            });
          });
      }
    }

    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  return session && status !== "loading" ? (
    tokenStatus.status === null ? (
      <Box>
        <Title title="Not Activated" />
        <DisplayMessage
          message="Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists."
          userId={session.user.id}
          genButton
          error
        />
      </Box>
    ) : tokenStatus.status ? (
      <Box>
        <Title title="Modify Your Account" />
        <ModifyAccount
          name={session.user.name}
          email={session.user.email}
          image={session.user.image}
        />
      </Box>
    ) : (
      <Box>
        <Title title="Error" />
        <DisplayMessage message={tokenStatus.message} error />
      </Box>
    )
  ) : !session && status !== "loading" ? (
    <Box>
      <Title title="Redirecting..." />
      <DisplayMessage
        message="Please register to see the welcome page! Redirecting to signin page..."
        error
      />
    </Box>
  ) : (
    <Box>
      <Title title="Loading" />
      <DisplayMessage message="Fetching your account details..." loading />
    </Box>
  );
};

export default NewUserPage;
