import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ModifyAccount from "../../components/welcome/ModifyAccount";
import fetchActivationStatus from "../../../lib/activation/fetchActivationStatus";
import validateToken from "../../../lib/activation/validateActivationToken";
import DisplayMessage from "../../components/auth/DisplayMessage";
import { useRouter } from "next/router";

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

    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  return session && status !== "loading" ? (
    tokenStatus.status === null ? (
      <DisplayMessage
        message="Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists."
        error
      />
    ) : tokenStatus.status ? (
      <ModifyAccount
        name={session.user.name}
        email={session.user.email}
        image={session.user.image}
      />
    ) : (
      <DisplayMessage message={tokenStatus.message} error />
    )
  ) : !session && status !== "loading" ? (
    <DisplayMessage
      message="Please register to see the welcome page! Redirecting to signin page..."
      error
    />
  ) : (
    <DisplayMessage message="Fetching your account details..." loading />
  );
};

export default NewUserPage;
