// import {
//   Stack,
//   InputGroup,
//   InputRightAddon,
//   Input,
//   Image,
// } from "@chakra-ui/react";
// import { useContext, useState } from "react";
// import { ChatContext } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { firestore, storage } from "../../firebase/firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// const InputComp = () => {
//     const [text, setText] = useState("");
//     const [img, setImg] = useState(null);
  
//     const { currentUser } = useContext(AuthContext);
//     const { data } = useContext(ChatContext);
  
//     const handleSend = async () => {
//       if (img) {
//         const storageRef = ref(storage, uuid());
  
//         const uploadTask = uploadBytesResumable(storageRef, img);
  
//         uploadTask.on(
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//               await updateDoc(doc(firestore, "chats", data.chatId), {
//                 messages: arrayUnion({
//                   id: uuid(),
//                   text,
//                   senderId: currentUser.uid,
//                   date: Timestamp.now(),
//                   img: downloadURL,
//                 }),
//               });
//             });
//           }
//         );
//       } else {
//         await updateDoc(doc(firestore, "chats", data.chatId), {
//           messages: arrayUnion({
//             id: uuid(),
//             text,
//             senderId: currentUser.uid,
//             date: Timestamp.now(),
//           }),
//         });
//       }
  
//       await updateDoc(doc(firestore, "chatss", currentUser.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
  
//       await updateDoc(doc(firestore, "chatss", data.user.uid), {
//         [data.chatId + ".lastMessage"]: {
//           text,
//         },
//         [data.chatId + ".date"]: serverTimestamp(),
//       });
  
//       setText("");
//       setImg(null);
//     };

//   return (
//     <div className="input">
//       <Stack spacing={4}>
//         <InputGroup>
//           <Input
//             type="text"
//             placeholder="Start Messaging...."
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//           />
//           <InputRightAddon>
//             <button onClick={handleSend}>
//               <Image w={8} h={8} src="../../../public/assets/SEND.png" />
//             </button>
//           </InputRightAddon>
//         </InputGroup>
//       </Stack>
//     </div>
//   );
// };

// export default InputComp;

import { Stack, InputGroup, InputRightAddon, Input, Image } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import sendIcon from "../../../public/assets/SEND.png";

const InputComp = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(firestore, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        },
        (error) => {
          console.error("Error uploading image:", error);
        }
      );
    } else {
      await updateDoc(doc(firestore, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(firestore, "chatss", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(firestore, "chatss", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <Stack spacing={4}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Start Messaging...."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <InputRightAddon>
            <button onClick={handleSend}>
              <Image w={8} h={8} src={sendIcon} alt="Send Icon" />
            </button>
          </InputRightAddon>
        </InputGroup>
      </Stack>
    </div>
  );
};

export default InputComp;