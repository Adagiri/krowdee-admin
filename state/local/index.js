import { makeVar } from "@apollo/client";


//USER 
export const userVar = makeVar({});

//IMAGES
export const imageVar = makeVar(false);
export const blobVar = makeVar("");
export const imageModalVar = makeVar(false);
export const previewImageVar = makeVar("");
export const editTaskVar = makeVar(false);
export const taskModalVar = makeVar(false);

//TASKS
export const catVar = makeVar("");