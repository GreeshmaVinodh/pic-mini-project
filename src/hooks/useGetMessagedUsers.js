import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useGetMessagedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messagedUsers, setMessagedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const fetchMessagedUsers = async () => {
      setIsLoading(true);
      try {
        const chatsRef = collection(firestore, "chats");
        const q = query(chatsRef, where("users", "array-contains", authUser.uid));

        const querySnapshot = await getDocs(q);
        const userIds = new Set();

        querySnapshot.forEach(doc => {
          const users = doc.data().users;
          users.forEach(uid => {
            if (uid !== authUser.uid) {
              userIds.add(uid);
            }
          });
        });

        const usersRef = collection(firestore, "users");
        const userPromises = Array.from(userIds).map(uid => getDocs(query(usersRef, where("uid", "==", uid))));
        const userDocs = await Promise.all(userPromises);
        
        const users = [];
        userDocs.forEach(snapshot => {
          snapshot.forEach(doc => users.push(doc.data()));
        });

        setMessagedUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) fetchMessagedUsers();
  }, [authUser, showToast]);

  return { isLoading, messagedUsers };
};

export default useGetMessagedUsers;
