"use server"
import { request, gql } from "graphql-request";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

const REGISTER_USER = gql`
  mutation InsertUsers($id: String, $username: String, $last_seen: timestamptz, $password: String) {
    insert_users(objects: {id: $id, username: $username, last_seen: $last_seen, password: $password}) {
      affected_rows
      returning {
        id
        username
        created_at
        last_seen
        password
      }
    }
  }
`;

export async function registerUser(username: string, password: string) {
    // Generate a UUID for the id
    const id = uuidv4();
    // Get the current timestamp for last_seen
    const last_seen = new Date().toISOString();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const data = await request(
            HASURA_ENDPOINT,
            REGISTER_USER,
            { id, username, last_seen, password: hashedPassword },
            { "x-hasura-admin-secret": HASURA_ADMIN_SECRET }
        );

        return data;
    } catch (error) {
        throw new Error("Error registering user");
    }
}