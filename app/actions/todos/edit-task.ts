"use server"
import { revalidatePath } from "next/cache";
import { EDIT_TASK_MUTATION } from "@/lib/graphql/graphql";


export async function editTask({ id, title, description, priority, completed }: { id: number; title?: string; description?: string; priority?: string; completed?: boolean }) {
  await fetch(process.env.HASURA_PROJECT_ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET! },
    body: JSON.stringify({ query: EDIT_TASK_MUTATION, variables: { id, title, description, priority, completed } }),
  });
  revalidatePath("/");
}
