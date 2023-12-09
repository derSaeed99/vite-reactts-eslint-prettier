import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();
export const firestore = getFirestore();

export { incrementusercounter } from "./onwrites/onusercount";
export { onpostwrite } from "./onwrites/onpostwrite";
