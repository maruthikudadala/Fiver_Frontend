import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { API_URL } from "../utils/apiPath";

const socket = io(`${API_URL}`);

const ChatPage = () => {
  const { receiverId } = useParams(); // 👈 Get receiver from URL
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // Your logged-in user
  const sender = user?._id;

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (content.trim()) {
      const msg = {
        sender,
        receiver: receiverId,
        content,
      };
      socket.emit("sendMessage", msg);
      // if (sender !== receiverId) {
      //   setMessages((prev) => [...prev, { ...msg, timestamp: new Date() }]);
      // }
      setContent("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-[100px]">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      <div className="border border-red-500 p-4 mb-4 h-[300px] overflow-y-auto bg-gray-50 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === sender ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 rounded ${
                msg.sender === sender ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded px-4 py-2 w-full"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
