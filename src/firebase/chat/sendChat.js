import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";

export async function sendMessage(chatId, senderId, receiverId, message) {
    console.log(chatId, senderId, receiverId, message)
  try{
    const messagesCollectionRef = collection(firestore, `chats/${chatId}/messages`);

    await addDoc(messagesCollectionRef, {
      senderId: senderId,
      receiverId: receiverId,
      message: message,
      timestamp: serverTimestamp()
    });
  }catch(error){
    console.log(error)
  }
}
