import { gql, useQuery } from "@apollo/client";

//////QUERIES///////

//USER
export const USER = gql`
  query GetUser {
    user @client
  }
`;

//IMAGES
export const BLOB = gql`
  query GetBlob {
    blob @client
  }
`;

export const IMAGE = gql`
  query GetImage {
    image @client
  }
`;

export const IMAGE_MODAL = gql`
  query GetImageModal {
    imageModal @client
  }
`;

export const PREVIEW_IMAGE = gql`
  query GetPreviewImage {
    previewImage @client
  }
`;

//TASKS
export const CAT = gql`
  query GetCat {
    cat @client
  }
`;
export const EDIT_TASK = gql`
query EditTask {
  taskToEdit @client
}
`;

export const TASK_MODAL = gql`
query TaskModal {
  taskModal @client
}
`;

//MUTATIONS
