import { UserAuth } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = UserAuth();

  return (
    <div>
      <div className={`chat ${message.uid === currentUser.uid ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={message.avatar} />
          </div>
        </div>
        <div className="chat-header">
          <h3>{message.name}</h3>
        </div>
        <div className="chat-bubble">
          <h3>{message.text}</h3>
        </div>
      </div>
    </div>
  );
};

export default Message;
