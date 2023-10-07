import { gql } from "@apollo/client";
import apolloClient from "../../apollo";

const FETCH_CHECKAVAILIBLEUSERNAME = gql`
  query GetVerificationWithUserId($username: String!) {
    getVerificationWithUserId(username: $username) {
      username
    }
  }
`;

const fetchCheckAvailableUsername = async (username: string) =>
  await apolloClient.query({
    query: FETCH_CHECKAVAILIBLEUSERNAME,
    variables: {
      username: username
    }
  });

export default fetchCheckAvailableUsername;
