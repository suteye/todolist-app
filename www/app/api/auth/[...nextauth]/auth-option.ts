import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import { gql, request } from "graphql-request";
import bcrypt from "bcryptjs";

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

const LOGIN_USER = gql`
  query LoginUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      password
    }
  }
`;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as { username: string; password: string };
        try {
          const data: { users: { id: string; username: string; password: string }[] } = await request(
            HASURA_ENDPOINT,
            LOGIN_USER,
            { username },
            { "x-hasura-admin-secret": HASURA_ADMIN_SECRET }
          );

          const user = data.users[0];
          if (user && await bcrypt.compare(password, user.password)) {
            return { id: user.id, name: user.username };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error logging in", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: {
    encode: ({ secret, token }) => {
      const encodeToken = jsonwebtoken.sign(token!, secret, {
        algorithm: "HS256",
      });
      return encodeToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },
  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};