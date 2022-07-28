import { Account, Role, Session } from "@prisma/client";
import { gql } from "apollo-server-micro";

export const typeDefs = gql;

type User = {
  id: string;
  name?: string;
  role: Role;
  email: string;
  emailVerified: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  accounts: Account[];
  sessions: Session[];
};

type Query = {
  user: [User];
};

type Mutation = {
  addUser: [User];
};
