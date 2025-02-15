import { UserProfileFormValues } from "Components/ProfileForm";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  FirestoreError,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { CaPost, CaUser } from "./model";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const createUserProfile = async (userId: string, user: CaUser) => {
  try {
    const userProfileDocRef = doc(collection(db, "users"), userId);
    const addData = {
      ...user,
      created: new Date(),
      lastUpdate: new Date(),
    };
    await setDoc(userProfileDocRef, addData, { merge: true });
  } catch (error) {
    console.error("Error adding UserProfile: ", error);
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: UserProfileFormValues
) => {
  try {
    const userProfileDocRef = doc(db, "users", userId);
    const updateData = {
      ...updates,
      lastUpdate: new Date(),
    };
    await updateDoc(userProfileDocRef, updateData);
  } catch (error) {
    console.error("Error adding UserProfile: ", error);
  }
};

export const getAuthenticatedUser = (): Promise<{
  user: User | null;
  userId: string | null;
}> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) {
          const userId = user.uid;
          resolve({ user, userId });
        } else {
          resolve({ user: null, userId: null });
        }
      },
      reject
    );
  });
};

export const subscribeToUser = ({
  userId,
  observer,
  onError,
}: {
  userId: string;
  observer: (user: CaUser | null) => void;
  onError?: (error: FirestoreError) => void;
}) => {
  return onSnapshot(
    doc(db, "users", userId),
    (snapshot) => {
      if (snapshot.exists()) {
        const user = { ...snapshot.data(), userId: snapshot.id } as CaUser;
        observer?.(user);
      } else {
        observer?.(null);
        console.warn("User does not exist");
      }
    },
    onError
  );
};

export const getAllUsers = async () => {
  try {
    const usersCollectionRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollectionRef);
    const users = usersSnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.error("Error getting all users: ", error);
    throw error;
  }
};

export const uploadImageAndSaveUrl = async (
  userId: string,
  imageFile: File
): Promise<string> => {
  try {
    const userDocRef = doc(db, "users", userId);
    const storageRef = ref(storage, `images/${userId}/photoUrl.jpg`);
    await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(storageRef);
    await setDoc(userDocRef, { photoUrl: downloadUrl }, { merge: true });
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image and saving URL: ", error);
    throw error;
  }
};

export const uploadMemeAndSaveUrl = async (
  imageFile: File,
  post: CaPost
): Promise<string> => {
  try {
    ref(storage);
    const imageId = doc(collection(db, "memes")).id;
    const storageRef = ref(storage, `memes/${imageId}/${post.caption}.jpg`);
    if (post.mediaUrl) {
      await uploadBytes(storageRef, imageFile);
    }
    const downloadUrl = await getDownloadURL(storageRef);
    await setDoc(
      doc(db, "posts", `${imageId}`),
      { ...post, mediaUrl: downloadUrl, postId: imageId },
      { merge: true }
    );
    return downloadUrl;
  } catch (error) {
    console.error("Error uploading image and saving URL: ", error);
    throw error;
  }
};

export const subscribeToMemes = (callback: (posts: CaPost[]) => void) => {
  const memesCollectionRef = collection(db, "posts");
  const memesQuery = query(
    memesCollectionRef,
    orderBy("created", "desc"),
    limit(20)
  );
  return onSnapshot(memesQuery, (snapshot) => {
    const memes = snapshot.docs.map((doc) => ({
      postId: doc.id,
      ...(doc.data() as CaPost),
    }));
    callback(memes);
  });
};
