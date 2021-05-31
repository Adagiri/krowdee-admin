import { gql, useQuery } from "@apollo/client";
import {
  blobVar,
  imageModalVar,
  imageVar,
  previewImageVar,
} from "../state/local";

export function getSignedUrl(_id) {
  const { loading, error, data } = useQuery(GET_S3_URL, {
    variables: { userId: _id },
  });

  return { loading, error, data };
}

export const resetFileUpload = () => {
  imageVar(false);
  blobVar("");
  imageModalVar(false);
  previewImageVar("");
};
