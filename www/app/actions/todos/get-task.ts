"use server"
import { GET_TASKS_QUERY } from '../../../lib/graphql/graphql';
import { request } from 'graphql-request';

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

export async function getAllTasks() {
  try {
    interface GetTasksResponse {
      todos: {
        id: number;
        title: string;
        task_des: string;
        task_priority: string;
        is_completed: boolean;
        user_id: string;
        created_at: string;
      }[];
    }

    const data = await request<GetTasksResponse>(
      HASURA_ENDPOINT,
      GET_TASKS_QUERY,
      {},
      { 'x-hasura-admin-secret': HASURA_ADMIN_SECRET }
    );
    return data.todos;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
}
