import { doc, setDoc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {firestore} from '../firebase'

export async function createOrGetChat(userId1, userId2) {
  const chatId = [userId1, userId2].sort().join('_');
  
  const chatDocRef = doc(firestore, "chats", chatId);
  const chatDoc = await getDoc(chatDocRef);

  if (!chatDoc.exists()) {
    await setDoc(chatDocRef, {
      users: [userId1, userId2]
    });
  }

  return chatDocRef;
}
