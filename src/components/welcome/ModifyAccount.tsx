import React from "react";
import ProfileHeader from "../profile/ProfileHeader";

interface ModifyAccountProps {
  name?: string;
  email?: string;
  image?: string;
}

const ModifyAccount = ({
  name,
  email,
  image
}: ModifyAccountProps): JSX.Element => {
  return (
    <ProfileHeader name={name} email={email} image={image} loading={false} />
  );
};

export default ModifyAccount;
