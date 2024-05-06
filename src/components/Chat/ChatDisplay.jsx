// import { HStack, Image, VStack, Text } from "@chakra-ui/react";
// import { Stack, InputGroup, InputRightAddon, Input } from "@chakra-ui/react";
// import { useContext, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   setDoc,
//   doc,
//   updateDoc,
//   serverTimestamp,
//   getDoc,
// } from "firebase/firestore";
// import { firestore } from "../../firebase/firebase";
// import { AuthContext } from "../../context/AuthContext";

// const ChatDisplay = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(firestore, "users"),
//       where("username", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
//     try {
//       const res = await getDoc(doc(firestore, "chats", combinedId));

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(doc(firestore, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(doc(firestore, "chatss", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             username: user.username,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(firestore, "chatss", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             username: currentUser.username,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {
//       setErr(true);
//     }

//     setUser(null);
//     setUsername("");
//   };
//   return (
//     <>
//       <Stack spacing={4} paddingRight={4} paddingTop={2}>
//         <InputGroup>
//           <Input
//             type="text"
//             placeholder="Search user"
//             onKeyDown={handleKey}
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//           />
//           <InputRightAddon>
//             <button>
//               <Image w={8} h={8} src="../../../public/assets/search.png" />
//             </button>
//           </InputRightAddon>
//         </InputGroup>
//       </Stack>
//       {err && <span>User not found!</span>}
//       {user && (
//         <div className="comp1" onClick={handleSelect}>
//           <HStack spacing={4}>
//             <Image className="icon" src="../../../public/assets/avatar.png" />
//             <VStack spacing={0} alignItems={"start"}>
//               <Text className="text">{user.username}</Text>
//               {/* <Text className='text2'>Attached a new message</Text> */}
//             </VStack>
//           </HStack>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatDisplay;

import { HStack, Image, VStack, Text } from "@chakra-ui/react";
import { Stack, InputGroup, InputRightAddon, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import searchIcon from "../../../public/assets/search.png";
import avatarImage from "../../../public/assets/avatar.png";

const ChatDisplay = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(firestore, "users"), where("username", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(firestore, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(firestore, "chats", combinedId), { messages: [] });
        //create user chats
        await updateDoc(doc(firestore, "chatss", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            username: user.username,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(firestore, "chatss", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            username: currentUser.username,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }
    setUser(null);
    setUsername("");
  };

  return (
    <>
      <Stack spacing={4} paddingRight={4} paddingTop={2}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <InputRightAddon>
            <button>
              <Image w={8} h={8} src={searchIcon} alt="Search Icon" />
            </button>
          </InputRightAddon>
        </InputGroup>
      </Stack>
      {err && <span>User not found!</span>}
      {user && (
        <div className="comp1" onClick={handleSelect}>
          <HStack spacing={4}>
            <Image className="icon" src={avatarImage} alt="Avatar" />
            <VStack spacing={0} alignItems={"start"}>
              <Text className="text">{user.username}</Text>
              {/* <Text className='text2'>Attached a new message</Text> */}
            </VStack>
          </HStack>
        </div>
      )}
    </>
  );
};

export default ChatDisplay;