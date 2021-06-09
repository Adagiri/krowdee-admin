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
    $cat: [String!]!
    $force: Boolean
    $opts: [optionInput]!
    $exp: String
    $ref: String
    $author: String!
  ) {
    addTask(
      input: {
        exp: $exp
        ref: $ref
        author: $author
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
        cat
      }
      currentTask {
        exp
        ref
        _id
        txt
        img
        cat
        opts {
          _id
          opt
        }
        valid
      }
    }
  }
`;

//EDIT TASK

export const EDIT_TASK = gql`
  mutation EditTask(
    $_id: ID!
    $txt: String
    $prevTxt: String!
    $img: String
    $valid: String
    $cat: [String!]!
    $force: Boolean
    $opts: [optionInput]!
    $exp: String
    $ref: String
  ) {
    editTask(
      input: {
        exp: $exp
        ref: $ref
        _id: $_id
        txt: $txt
        prevTxt: $prevTxt
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
        cat
      }
      currentTask {
        exp
        ref
        _id
        txt
        img
        cat
        opts {
          _id
          opt
        }
        valid
      }
    }
  }
`;
