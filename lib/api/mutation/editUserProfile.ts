import { gql } from "apollo-server-micro";
import apolloClient from "../../apollo";

interface EditUserProfileProps {
  userId: string;
  name: string;
  username: string;
  bio: string;
  image: string;
}

const editUserProfile = (newUserInfo: EditUserProfileProps) => {
  const UPDATE_ACCOUNTINFO = gql`
    mutation UpdateAccountInfo(
      $userId: String!
      $name: String!
      $username: String!
      $bio: String!
      $image: String!
    ) {
      updateAccountInfo(
        userId: $userId
        name: $name
        username: $username
        bio: $bio
        image: $image
      ) {
        id
        name
        username
        bio
        role
        email
        image
        createdAt
        updatedAt
      }
    }
  `;

  return apolloClient.mutate({
    mutation: UPDATE_ACCOUNTINFO,
    variables: newUserInfo
  });
};

export default editUserProfile;
