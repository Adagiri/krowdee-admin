import gql from "graphql-tag";

//IMAGES
export const GET_S3_URL = gql`
  query GetS3Url($userId: String!, $contentType: String) {
    getSignedUrl(input: { _id: $userId, contentType: "image/png" }) {
      url
      key
    }
  }
`;

//TASKS
export const GET_TASKS = gql`
  query GetTasks($cat: String, $cursor: Int, $txt: String) {
    getTasks(input: { cat: $cat, cursor: $cursor, txt: $txt }) {
      exp
      ref
      _id
      txt
      cat
      opts {
        _id
        opt
      }
      img
      valid
    }
  }
`;
