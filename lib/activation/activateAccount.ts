import { gql } from "apollo-server-micro";
import apolloClient from "../apollo";

const activateAccount = (activationToken: string): void => {
  const UPDATE_ACTIVATEACCOUNT = gql`
    mutation ActivateAccount($activationToken: String!) {
      activateAccount(activationToken: $activationToken) {
        id
        userId
        token
        validated
        validatedAt
        createdAt
        updatedAt
      }
    }
  `;

  apolloClient.mutate({
    mutation: UPDATE_ACTIVATEACCOUNT,
    variables: {
      activationToken: activationToken
    }
  });
};

export default activateAccount;
