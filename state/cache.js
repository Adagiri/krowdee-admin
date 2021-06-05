import { InMemoryCache } from "@apollo/client";
import {
  imageBlobVar,
  imageModalVar,
  imageVar,
  imagePreviewVar,
  catVar,
  userVar,
  taskModalVar,
  editTaskVar,
  imgVar,
} from "./local";

export const cache = new InMemoryCache({
  typePolicies: {
    LoginOutput: {
      // If one of the keyFields is an object with fields of its own, you can
      // include those nested keyFields by using a nested array of strings:
      keyFields: ["user", ["_id"]],
    },
    Query: {
      fields: {
        image: {
          read() {
            return imageVar();
          },
        },
        imagePreview: {
          read() {
            return imagePreviewVar();
          },
        },
        imageModal: {
          read() {
            return imageModalVar();
          },
        },
        imageBlob: {
          read() {
            return imageBlobVar();
          },
        },
        taskModal: {
          read() {
            return taskModalVar();
          },
        },
        taskToEdit: {
          read() {
            return editTaskVar();
          },
        },
        img: {
          read() {
            return imgVar();
          },
        },
        txt: {
          read() {
            return txtVar();
          },
        },
        cat: {
          read() {
            return catVar();
          },
        },
        valid: {
          read() {
            return validVar();
          },
        },
        opts: {
          read() {
            return optsVar();
          },
        },
        user: {
          read() {
            return userVar();
          },
        },
      },
    },
  },
});
