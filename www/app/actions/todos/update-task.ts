"use server"
import { request } from 'graphql-request';
import { UPDATE_TASK_MUTATION } from '../../../lib/graphql/graphql';

const HASURA_ENDPOINT = process.env.HASURA_PROJECT_ENDPOINT!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

export async function updateTask({ id, title, description, priority, is_completed }: { id: number; title: string; description: string; priority: string; is_completed: boolean }) {
  try {
    const data: { update_todos_by_pk: any } = await request(HASURA_ENDPOINT, UPDATE_TASK_MUTATION, { id, title, description, priority, is_completed }, {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET
    });
    return data.update_todos_by_pk;
  } catch (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
}