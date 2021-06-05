import { makeVar } from "@apollo/client";
import { arr } from "../../helper/variables";

export const imageVar = makeVar(null);
export const imageblobVar = makeVar(null);
export const imageModalVar = makeVar(false);
export const imagePreviewVar = makeVar(null);
export const editTaskVar = makeVar(null);
export const taskModalVar = makeVar(false);
export const txtVar = makeVar("");
export const catVar = makeVar("");
export const optsVar = makeVar(arr);
export const validVar = makeVar("");
export const taskExistVar = makeVar([[], {}]);
export const taskUploadingVar = makeVar(false);
export const taskForceUploadingVar = makeVar(false);
export const taskInvalidsVar = makeVar([]);
export const taskOptsInvalidVar = makeVar([]);
export const imgVar = makeVar("");
