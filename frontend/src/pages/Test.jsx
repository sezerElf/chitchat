import { useEffect } from "react";
import SockJs from "sockjs-client";

export default function Test() {
  let sock;

  useEffect(() => {
    sock = new SockJs("/api/chat-socket");
    sock.onopen = function () {
      console.log("open");
    };

    sock.onmessage = function (e) {
      console.log("message", e.data);
      sock.close();
    };

    sock.onclose = function () {
      console.log("close");
    };

    return () => {
      sock.close();
    };
  }, []);

  return <div></div>;
}
