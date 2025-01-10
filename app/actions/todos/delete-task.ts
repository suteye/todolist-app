"use server"
import { request } from 'graphql-request';
import { DELETE_TASK_MUTATION } from '@/lib/graphql/graphql';

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

export async function deleteTask(id: number) {
  try {
    interface DeleteTaskResponse {
      delete_todos_by_pk: {
        id: number;
      };
    }
    const data = await request<DeleteTaskResponse>(HASURA_ENDPOINT, DELETE_TASK_MUTATION, { id }, {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET
    });
    return data.delete_todos_by_pk;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
}