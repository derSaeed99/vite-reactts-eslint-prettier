import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
export const firestore = getFirestore();

export { incrementusercounter } from "./onDocumentWrite/onUserCount";
export { incrementpostcounter } from "./onDocumentWrite/onPostCount";
