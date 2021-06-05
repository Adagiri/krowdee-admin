import {
  imageblobVar,
  imageModalVar,
  catVar,
  imageVar,
  taskModalVar,
  editTaskVar,
  txtVar,
  optsVar,
  validVar,
  taskOptsInvalidVar,
  taskExistVar,
  taskUploadingVar,
  taskInvalidsVar,
  imgVar,
  imagePreviewVar,
  taskForceUploadingVar,
} from "../state/local";
import { arr } from "./variables";

export const taskReset = (type) => {
  imageblobVar(null);
  imageModalVar(false);
  imageVar(null);
  txtVar("");
  optsVar(arr);
  validVar("");
  taskOptsInvalidVar([]);
  taskExistVar([[], {}]);
  taskUploadingVar(false);
  taskInvalidsVar([]);
  imagePreviewVar(null);
  imgVar("");
  taskForceUploadingVar(false)

  if (type === "closeModal") {
    taskModalVar(false);
    catVar("");
    editTaskVar(null);
  }
};

export function makeid(length) {
  var result = [];
  var characters =
    "ABCD383EF90182GHI090JKLMN01234OPQRSTUVWXYZa6789bc384def8394ghijklmnopqrstuvwxyz0145";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
