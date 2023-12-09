import { log } from "firebase-functions/logger";
import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { firestore } from "../index";

export const onpostwrite = onDocumentWritten(
  "posts/{postId}",
  async (event) => {
    // Only run if the document is newly created
    if (!event.data.before.exists && event.data.after.exists) {
      log("New post created; incrementing post counter in counters collection");
      const countersRef = firestore.collection("counters").doc("postCounter");
      const userDocRef = event.data.before.ref;
      const userDoc = await userDocRef.get();
      const userId = userDocRef.id;
      if (!userDoc) {
        console.error("Post document does not exist");
        return;
      }
      try {
        await firestore.runTransaction(async (transaction) => {
          const counterDoc = await transaction.get(countersRef);
          // Increase counter
          let newCount = 1;
          if (counterDoc.exists) {
            newCount = counterDoc.data().count + 1;
          }
          // Update counter
          transaction.set(countersRef, { count: newCount });
          // Set counter value on user document
          const userRef = firestore.collection("users").doc(userId);
          transaction.update(userRef, {
            postCount: newCount,
          });
          log("User counter incremented", {
            userId,
            newCount,
          });
        });
      } catch (error) {
        console.error("Error updating user post count:", error);
      }
    }
  }
);
