import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";

let client;

export default function Test() {
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    client = Stomp.client("ws://localhost:8080/api/chat-socket");

    client.connect(null, () => {
      console.log("Connected");

      client.subscribe("/all", (message) => {
        if (message.body) {
          alert("got message with body " + message.body);
        } else {
          alert("got empty message");
        }
      });
    });

    // ws.onopen = (event) => {
    //   console.log("Connected");
    //   console.log(event);
    // };

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Message"
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          className="input input-bordered"
        />
        <button
          className="btn"
          onClick={() => {
            client.send("/test", null, sendMessage);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
