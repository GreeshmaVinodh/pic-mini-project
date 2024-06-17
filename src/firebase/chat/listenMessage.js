import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

export function listenForMessages(chatId, callback) {
  const messagesCollectionRef = collection(firestore, `chats/${chatId}/messages`);
  const messagesQuery = query(messagesCollectionRef, orderBy("timestamp"));

  onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
}
