import { ApolloServer, gql } from "apollo-server";
import { UserModel } from "@orm";
import { typeDefs, resolvers } from "interface";

/**
 * Dummy server init
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/**
 * GRAPHQL Requests
 */
const ADD_USER = gql`
  mutation Mutation($user: UserMutation!) {
    addUser(user: $user) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

const GET_USER = gql`
  query Query($userId: ID) {
    user(id: $userId) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * Mock user
 */
const user = {
  id: "randomId",
  email: "email@email.email",
  name: "WHO?",
  password: "GUESS",
};

/**
 * Test scenario runner. Refer to Jest docs
 */
describe("USER CRUD TESTING", () => {
  it("Should add a new User", async () => {
    // NOTE: Mocking Database query
    const tempUser = {
      email: user.email,
      name: user.name,
      password: user.password,
    };

    UserModel.create = jest.fn().mockResolvedValueOnce(tempUser);
    const result = await server.executeOperation({
      query: ADD_USER,
      variables: {
        user: tempUser,
      },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.addUser.name).toBe(user.name);
    expect(result.data?.addUser.email).toBe(user.email);
  });

  it("Should retrive an existing User", async () => {
    // NOTE: Mocking Database query
    UserModel.findById = jest.fn().mockResolvedValueOnce(user);
    const result = await server.executeOperation({
      query: GET_USER,
      variables: { userId: user.id },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.user.name).toBe(user.name);
    expect(result.data?.user.email).toBe(user.email);
  });
});
