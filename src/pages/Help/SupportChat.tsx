import {
  apiGetSupportChatRoom,
  apiGetSupportChatUnreadCount,
  apiMarkSupportMessageAsRead,
  apiSendMessageToSupport,
} from "@apis/team";
import { apiGetUser } from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";
import socketService from "@services/socket.service";
import { MessageSquareText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface UserInfo {
  avatar: string;
  id: string;
  level: number;
  userName: string;
}

interface ChatMessage {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  userId: string;
  userInfo?: UserInfo;
  type: string;
}

const SupportChat: React.FC = () => {
  const [openSupportChat, setOpenSupportChat] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [text, setText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserData>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchProfile();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    fetchUnreadCount();
    socketService.addEventHandler("new-message", handleNewMessage);
    return () => {
      socketService.removeEventHandler("new-message", handleNewMessage);
    };
  }, []);

  useEffect(() => {
    if (openSupportChat) {
      chatHistory.map(async (chat) => {
        await apiMarkSupportMessageAsRead(chat.id);
      });
    }
  }, [openSupportChat]);

  const fetchUnreadCount = async () => {
    const data = await apiGetSupportChatUnreadCount();
    setUnreadCount(data.unreadCount);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleSendMessage = async () => {
    if (text.trim() === "") return;
    const body = text;
    setText("");

    const tempId = `temp-${Date.now()}`;
    const tempMessage: ChatMessage = {
      id: tempId,
      userId: profile?.id || "me",
      message: body,
      type: "query",
      isRead: true,
      createdAt: new Date().toISOString(),
      userInfo: {
        avatar: profile?.avatar || "",
        id: profile?.id || "",
        level: profile?.level || 0,
        userName: profile?.userName || "You",
      },
    };

    setChatHistory((prev) => [...prev, tempMessage]);

    try {
      const serverMsg = await apiSendMessageToSupport(body);
      if (serverMsg && serverMsg.id) {
        setChatHistory((prev) =>
          prev.map((m) => (m.id === tempId ? serverMsg : m))
        );
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setChatHistory((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  const handleNewMessage = (data: ChatMessage) => {
    setChatHistory((prev) => {
      const exists = prev.some(
        (m) =>
          m.id === data.id ||
          m.id === `temp-${new Date(data.createdAt).getTime()}`
      );
      if (exists) {
        return prev.map((m) =>
          m.id?.startsWith("temp-") && m.createdAt === data.createdAt ? data : m
        );
      }
      return [...prev, data];
    });
  };

  const fetchProfile = async () => {
    const data = await apiGetUser();
    setProfile(data);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await apiGetSupportChatRoom();

      let messages: ChatMessage[] = [];

      if (Array.isArray(response)) {
        messages = response;
      } else if (response && Array.isArray(response.items)) {
        messages = response.items;
      } else if (response && Array.isArray(response.messages)) {
        messages = response.messages;
      } else if (response && response.data && Array.isArray(response.data)) {
        messages = response.data;
      }

      const reversedMessages = [...messages].reverse();
      setChatHistory(reversedMessages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = () => {
    try {
      const d = localStorage.getItem("userdata");
      if (!d) {
        console.log("User data not found");
      } else {
        const data = JSON.parse(d);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpenSupportChat((prev) => !prev)}
        className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <MessageSquareText className="text-white cursor-pointer w-8 h-8 p-1" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 p-1 text-black font-bold bg-yellow-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {openSupportChat && (
        <div className="absolute right-0 top-12 w-[380px] h-[600px] bg-[#1b1009] rounded-2xl overflow-hidden shadow-2xl border border-[#3a281e] z-50">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center p-4 md:p-6 border-b border-[#3a281e] bg-[#24160e] flex-shrink-0">
              <div className="flex items-center space-x-4">
                <Image
                  src={data()?.avatar || "assets/images/users/user0.webp"}
                  fallbackSrc="assets/images/users/user0.webp"
                  alt="Support avatar"
                  className="w-12 h-12 rounded-full border-2 border-yellow-500"
                />
                <div>
                  <h1 className="text-white text-xl md:text-2xl font-bold">
                    Support Team
                  </h1>
                  <p className="text-gray-400 text-sm">
                    We're here to help you
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 chat-bg min-h-0"
            >
              <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : chatHistory.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start the conversation!</p>
                  </div>
                ) : (
                  chatHistory.map((chat) => {
                    return chat.type === "query" ? (
                      <div
                        key={chat.id}
                        className="flex justify-end items-start space-x-3"
                      >
                        <div className="flex flex-col items-end max-w-[80%]">
                          <div className="bg-gradient-to-r from-yellow-600 to-amber-600 py-3 px-4 rounded-2xl rounded-tr-none shadow-lg">
                            <p className="text-white text-sm font-medium">
                              {chat.userInfo?.userName || "You"}
                            </p>
                            <p className="text-white text-xl font-medium leading-tight max-w-[220px] break-words">
                              {chat.message || "No content"}
                            </p>
                            <p className="text-white text-xs mt-1">
                              {new Date(chat.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                          <Image
                            src={
                              chat.userInfo?.avatar ||
                              "assets/images/users/user0.webp"
                            }
                            fallbackSrc="assets/images/users/user0.webp"
                            alt="User avatar"
                            className="w-full h-full rounded-full border-2 border-amber-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        key={chat.id}
                        className="flex justify-start items-start space-x-3"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                          <Image
                            src={
                              chat.userInfo?.avatar ||
                              "assets/images/users/user0.webp"
                            }
                            fallbackSrc="assets/images/users/user0.webp"
                            alt="Support avatar"
                            className="w-full h-full rounded-full border-2 border-gray-500"
                          />
                        </div>
                        <div className="flex flex-col items-start max-w-[70%]">
                          <div className="bg-gradient-to-r from-gray-600 to-gray-500 py-3 px-4 rounded-2xl rounded-tl-none shadow-lg">
                            <p className="text-amber-400 text-sm font-medium">
                              {chat.userInfo?.userName || "Support Team"}
                            </p>
                            <p className="text-white text-xl font-medium leading-tight max-w-[220px] break-words">
                              {chat.message || "No content"}
                            </p>
                            <p className="text-white text-xs mt-1">
                              {new Date(chat.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#24160e] border-t border-[#3a281e] flex-shrink-0">
              <div className="flex space-x-2 md:space-x-4 max-w-4xl mx-auto">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 md:py-4 rounded-xl border border-[#4a3225] bg-[#2a1a11] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base transition-all"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />

                <button
                  className="flex items-center justify-center w-12 h-12 bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={text.trim() === ""}
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
