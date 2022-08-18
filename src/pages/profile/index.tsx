import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useRouter } from "next/router";
import DisplayMessage from "../../components/auth/DisplayMessage";

const UserProfile = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  return status === "loading" ? (
    <ProfileHeader loading={true} />
  ) : session ? (
    <ProfileHeader
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
      loading={false}
    />
  ) : (
    <DisplayMessage
      message="You must be logged in to view your profile. Redirecting to the signin page..."
      error
    />
  );
};

export default UserProfile;
