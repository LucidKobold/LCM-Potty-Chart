import React from "react";
import ProfileHeader from "../profile/ProfileHeader";

interface ModifyAccountProps {
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
}

const ModifyAccount = ({
  name,
  username,
  image,
  bio
}: ModifyAccountProps): JSX.Element => {
  return (
    <ProfileHeader
      name={name}
      username={username}
      image={image}
      bio={bio}
      loading={false}
    />
  );
};

export default ModifyAccount;
