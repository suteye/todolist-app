import { gql } from "graphql-request";

export const GET_TASKS_QUERY = gql`
  query GetTodos {
    todos {
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

export const ADD_TASK_MUTATION = `
    mutation AddTask($title: String!, $task_des: String, $task_priority: String!) {
    insert_todos_one(object: { title: $title, task_des: $task_des, task_priority: $task_priority }) {
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

export const EDIT_TASK_MUTATION = `
    mutation EditTask($id: Int!, $title: String!, $task_des: String!, $task_priority: String!, $is_completed: Boolean!) {
        editTask(id: $id, title: $title, task_des: $task_des, task_priority: $task_priority, is_completed: $is_completed) {
            id
            title
            task_des
            task_priority
            is_completed
        }
    }
}    
`;  

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: Int!, $title: String!, $description: String!, $priority: String!, $is_completed: Boolean!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title, task_des: $description, task_priority: $priority, is_completed: $is_completed }) {
      id
      title
      task_des
      task_priority
      is_completed
    }
  }
`;


export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;