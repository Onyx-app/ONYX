import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { dataRef, auth } from "../firebase";
import { usePageContext } from "./PageContext";

const ChatBox = () => {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const { projectTitle } = usePageContext();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const user = auth.currentUser;
    const username = user.email.split('@')[0];
    console.log("chat name: " + projectTitle);
    const chatRef = dataRef.ref("chats/" + projectTitle);

    chatRef.on("value", (snapshot) => {
      const chatData = snapshot.val();

      // Transform chatData into an array of messages
      const messageArray = chatData ? Object.values(chatData) : [];
      setMessages(messageArray);
    });

    return () => {
      chatRef.off("value");
    };
  }, []);

  return (
    <div className="pb-44 pt-20 containerWrap">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatBox;
