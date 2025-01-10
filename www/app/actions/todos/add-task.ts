"use server"
import { request, gql } from "graphql-request";

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

const ADD_TASK_MUTATION = gql`
  mutation InsertTodos($title: String!, $user_id: String!, $task_priority: String!, $task_des: String!) {
    insert_todos_one(object: {title: $title, user_id: $user_id, task_priority: $task_priority, task_des: $task_des}) {
      id
      title
      task_des
      task_priority
      is_completed
      user_id
      created_at
    }
  }
`;

interface AddTaskResponse {
  insert_todos_one: {
    id: number;
    title: string;
    task_des: string;
    task_priority: string;
    is_completed: boolean;
    user_id: string;
    created_at: string;
  };
}

export async function addTask({ title, description, priority, user_id }: { title: string; description: string; priority: string; user_id: string }) {
  try {
    const data = await request<AddTaskResponse>(HASURA_ENDPOINT, ADD_TASK_MUTATION, {
      title,
      user_id,
      task_priority: priority,
      task_des: description,
    }, {
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET
    });
    return data.insert_todos_one;
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task");
  }
}