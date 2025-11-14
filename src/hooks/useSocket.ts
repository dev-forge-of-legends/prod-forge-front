import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server");
    });

    socketRef.current.on("message", (data) => {
      console.log("Message from server:", data);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  const sendMessage = (data: any) => {
    socketRef.current?.emit("message", data);
  };

  return { sendMessage, socket: socketRef.current };
};
