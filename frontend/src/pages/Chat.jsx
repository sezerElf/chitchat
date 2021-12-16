import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Stomp } from "@stomp/stompjs";
import { useParams } from "react-router-dom";

let client;

export default function Chat() {
  const [sendMessage, setSendMessage] = useState("");
  const { authenticatedUser } = useContext(AuthContext);
  const { topicId, topicName } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client = Stomp.client("ws://localhost:8080/api/chat-socket");

    client.connect(null, () => {
      client.subscribe(`/topic/${topicId}`, onMessageRecieve);
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const onMessageRecieve = (message) => {
    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
  };

  return (
    <div className="flex flex-col h-full">
      <h1>{topicName}</h1>
      <div className="border-2 border-primary w-full flex-1 my-5 rounded-box flex flex-col gap-5 p-5 overflow-auto">
        {messages.map(({ senderId, name, message }, index) => (
          <div
            key={index}
            className={`flex flex-col w-1/2 rounded-box p-2 ${
              senderId === authenticatedUser.id
                ? "ml-auto bg-accent-focus"
                : "mr-auto bg-neutral-focus"
            }`}
          >
            <span className="font-semibold text-primary">{name}</span>
            <span>{message}</span>
          </div>
        ))}
      </div>

      <form
        className="form-control flex gap-5 flex-row w-full"
        onSubmit={(e) => {
          e.preventDefault();
          client.send(
            `/app/chat/${topicId}`,
            null,
            JSON.stringify({
              senderId: authenticatedUser.id,
              name: `${authenticatedUser.firstName} ${authenticatedUser.lastName}`,
              message: sendMessage,
            })
          );
          setSendMessage("");
        }}
      >
        <input
          type="text"
          placeholder="Mesaj"
          required
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="input input-bordered flex-1"
        />
        <button className="btn btn-primary" type="submit">
          Gönder
        </button>
      </form>
    </div>
  );
}
