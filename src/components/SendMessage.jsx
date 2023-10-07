import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react"
import { UserAuth } from "../context/AuthContext";
import { db, dataRef } from "../firebase";
import { usePageContext } from "./PageContext";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { currentUser } = UserAuth();
  const { projectTitle } = usePageContext(); 
  
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if(value.trim() === "") {
      alert("Enter valid message!");
      return;
    }

    try {
      const { uid, displayName, photoURL, email } = currentUser; 
      const username = email.split('@')[0];

      const timeStamp = new Date().toString();
      const chatInfo = {
        text: value,
        name: displayName,
        avatar: photoURL,
        createdAt: timeStamp,
        uid
      };
      dataRef.ref("chats/" + projectTitle + "/").push(chatInfo);
    } catch(error) {
      console.log(error);
    }
    setValue("");
  }

  return (
    <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input value={value} onChange={e => setValue(e.target.value)} className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
        <button type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">Send</button>
      </form>
    </div>
  )
}

export default SendMessage