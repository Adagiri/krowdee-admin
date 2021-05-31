import { InMemoryCache } from "@apollo/client";
import {
  blobVar,
  imageModalVar,
  imageVar,
  previewImageVar,
  catVar,
  userVar,
  taskModalVar,
  editTaskVar,
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
        previewImage: {
          read() {
            return previewImageVar();
          },
        },
        imageModal: {
          read() {
            return imageModalVar();
          },
        },
        blob: {
          read() {
            return blobVar();
          },
        },
        cat: {
          read() {
            return catVar();
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

        user: {
          read() {
            return userVar();
          },
        },
      },
    },
  },
});
