import gql from "graphql-tag";

//AUTH
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      user {
        _id
        username
      }
      token
    }
  }
`;

//IMAGES

//TASKS
export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(input: { _id: $taskId })
  }
`;

export const ADD_TASK = gql`
  mutation AddTask(
    $txt: String!
    $img: String
    $valid: String!
    $cat: String!
    $force: Boolean
    $opts: [optionInput]!
  ) {
    addTask(
      input: {
        txt: $txt
        opts: $opts
        valid: $valid
        cat: $cat
        force: $force
        img: $img
      }
    ) {
      success
      taskExist {
        txt
      }
    }
  }
`;

//EDIT TASK

export const EDIT_TASK_REMOTE = gql`
  mutation EditTask(
    $_id: ID!
    $txt: String!
    $img: String
    $valid: String!
    $cat: String!
    $force: Boolean
    $opts: [optionInput]!
  ) {
    editTask(
      input: {
        _id: $_id
        txt: $txt
        opts: $opts
        valid: $valid
        cat: $cat
        force: $force
        img: $img
      }
    ) {
      success
      taskExist {
        txt
      }
    }
  }
`;