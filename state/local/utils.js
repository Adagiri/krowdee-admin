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

export const IMG = gql`
  query Img {
    img @client
  }
`;

export const CAT = gql`
  query Cat {
    cat @client
  }
`;

export const OPTS = gql`
  query Opts {
    opts @client
  }
`;

export const TXT = gql`
  query Txt {
    txt @client
  }
`;

export const VALID = gql`
  query Valid {
    valid @client
  }
`;

//MUTATIONS
