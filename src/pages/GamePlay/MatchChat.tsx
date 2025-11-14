import {
  apiGetMatchChatRoom,
  apiMarkMessageAsRead,
  apiMessagesInRoom,
  apiSendMessageToRoom,
} from "@apis/team";
import { apiGetUser } from "@apis/user";
import { Room, UserData } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";
import { useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { useEffect, useRef, useState } from "react";
// import { getValidImageUrl } from "@app-utils/stringUtils";

interface UserInfo {
  avatar: string;
  id: string;
  level: number;
  userName: string;
}

interface ChatMessage {
  content: string;
  createdAt: string;
  id: string;
  isEdited: boolean;
  roomId: string;
  updatedAt: string;
  userId: string;
  userInfo?: UserInfo;
}

interface RoomWithUnread extends Room {
  unreadCount?: number;
  type: "match";
  otherUser?: UserInfo; // For direct messages
}

const MatchChat: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  // const [rooms, setRooms] = useState<RoomWithUnread[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomWithUnread | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserData>();
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const matchId = useAppSelector((state) => state.teamMatch.teamMatchId);
  const teamId = useRef("");

  const [page, setPage] = useState<number>(0); // 0 = latest page
  const pageSize = 25; // messages per page (tune as needed)
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const user_data = localStorage.getItem("userdata");
    if (user_data) {
      teamId.current = JSON.parse(user_data).teamId;
    }
    fetchUserData();
    fetchProfile();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (selectedRoom) {
      // Mark messages as read when room is selected
      markMessagesAsRead(selectedRoom.id);
      // Reset unread count for selected room
      // updateRoomUnreadCount(selectedRoom.id, 0);
    }
  }, [selectedRoom]);

  useEffect(() => {
    socketService.addEventHandler("new-message", handleNewMessage);
    console.log("socket new-message sent");

    return () => {
      console.log("socket new-message received");
      socketService.removeEventHandler("new-message", handleNewMessage);
    };
  }, [selectedRoom]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleSendMessage = async () => {
    if (text.trim() === "") return;

    setText("");

    try {
      if (!selectedRoom) {
        return;
      }
      await apiSendMessageToRoom(selectedRoom.id, text);
      console.log("Room IDs Are: ", selectedRoom.id);
    } catch (error) {
      console.error("Failed to send message:", error);
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
        // optionally replace optimistic message id with real message object
        return prev.map((m) =>
          m.id?.startsWith("temp-") && m.createdAt === data.createdAt ? data : m
        );
      }
      return [...prev, data];
    });
    // Update unread count if message is not in current room
    // if (data.roomId !== selectedRoom?.id) {
    //   updateRoomUnreadCount(data.roomId, 1);
    // }
  };

  const fetchProfile = async () => {
    const data = await apiGetUser();
    setProfile(data);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const roomsData = await apiGetMatchChatRoom(teamId.current, matchId);
      setSelectedRoom(roomsData);
      // Fetch messages for the first room
      const response = await apiMessagesInRoom(roomsData.id, 0, pageSize);
      const items = (response.items || []).reverse();
      setChatHistory(items);
      setPage(0);
      setHasMore((response.items || []).length === pageSize);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleRoomSelect = async (room: RoomWithUnread) => {
  //   setSelectedRoom(room);

  //   // Fetch messages for selected room
  //   try {
  //     const response = await apiMessagesInRoom(room.id, 0, 100);
  //     setChatHistory((response.items || []).reverse);
  //   } catch (error) {
  //     console.error("Failed to fetch room messages:", error);
  //   }

  //   // Close sidebar on mobile when room is selected
  //   if (window.innerWidth < 768) {
  //     setIsSidebarOpen(false);
  //   }
  // };

  const markMessagesAsRead = async (roomId: string) => {
    try {
      // In a real implementation, you'd mark all messages in the room as read
      // This is a simplified version
      await apiMarkMessageAsRead(roomId);
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  // const updateRoomUnreadCount = (roomId: string, increment: number) => {
  //   setRooms((prev) =>
  //     prev.map((room) =>
  //       room.id === roomId
  //         ? { ...room, unreadCount: (room.unreadCount || 0) + increment }
  //         : room
  //     )
  //   );
  // };

  // --- loadOlderMessages kept and updated to use page/pageSize (prepends older pages)
  const loadOlderMessages = async () => {
    if (!selectedRoom || loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      // compute skip based on pageSize (skip already retrieved items)
      const skip = nextPage * pageSize;
      const response = await apiMessagesInRoom(selectedRoom.id, skip, pageSize);
      const items = (response.items || []).reverse();

      if (items.length === 0) {
        setHasMore(false);
        return;
      }

      // preserve scroll position:
      // record current scroll height
      const container = messagesContainerRef.current;
      const previousScrollHeight = container?.scrollHeight || 0;

      // prepend new items
      setChatHistory((prev) => [...items, ...prev]);
      setPage(nextPage);
      setHasMore(items.length === pageSize);

      // After DOM updates, adjust scrollTop so viewport stays at same message
      // Use a small timeout to wait until new messages render
      setTimeout(() => {
        if (!container) return;
        const newScrollHeight = container.scrollHeight;
        const scrollDiff = newScrollHeight - previousScrollHeight;
        // keep the user's viewport stable by moving scrollTop by the added height
        container.scrollTop = (container.scrollTop || 0) + scrollDiff;
      }, 50);
    } catch (error) {
      console.error("Failed to load older messages:", error);
    } finally {
      setLoadingMore(false);
    }
  };
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg">Loading teams...</div>
        </div>
      </div>
    );
  }

  return (
    // <div className="flex min-h-[50%] min-w-[70%] bg-[#1b1009] rounded-2xl overflow-hidden shadow-2xl">
    <div className="flex h-[80vh]  w-full max-w-[1400px] bg-[#1b1009] rounded-2xl overflow-hidden shadow-2xl">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#24160e] border-b border-[#3a281e]">
        {/* <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button> */}
        <h1 className="text-white text-xl font-bold">
          {selectedRoom
            ? selectedRoom.teamInfo?.name || selectedRoom.otherUser?.userName
            : "Team Chat"}
        </h1>
        <div className="w-10"></div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#1b1009] min-h-0">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center p-4 md:p-6 border-b border-[#3a281e] bg-[#24160e] flex-shrink-0">
          <div className="flex items-center space-x-4">
            {selectedRoom && (
              <>
                <Image
                  src={
                    selectedRoom.avatar ||
                    selectedRoom.otherUser?.avatar ||
                    "assets/images/users/user0.webp"
                  }
                  fallbackSrc="assets/images/users/user0.webp"
                  alt="Room avatar"
                  className="w-12 h-12 rounded-full border-2 border-yellow-500"
                />
                <div>
                  <h1 className="text-white text-xl md:text-2xl font-bold">
                    {selectedRoom.teamInfo?.name ||
                      selectedRoom.otherUser?.userName}
                  </h1>
                  <p className="text-gray-400 text-sm">Team Channel</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          onScroll={() => {
            // simple throttle to avoid firing too often
            if (scrollTimeoutRef.current) {
              window.clearTimeout(scrollTimeoutRef.current);
            }
            scrollTimeoutRef.current = window.setTimeout(() => {
              const el = messagesContainerRef.current;
              if (!el) return;
              // when user scrolls within 120px of top, load older messages
              if (el.scrollTop < 120 && hasMore && !loadingMore) {
                loadOlderMessages();
              }
            }, 100);
          }}
          className="flex-1 overflow-y-auto p-4 md:p-6 chat-bg min-h-0"
        >
          <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto">
            {chatHistory.length === 0 ? (
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
              chatHistory.map((chat) =>
                chat.userId === profile?.id ? (
                  // Current user's message
                  <div
                    key={chat.id}
                    className="flex justify-end items-start space-x-3"
                  >
                    <div className="flex flex-col items-start max-w-[80%]">
                      <div className="flex flex-col items-start bg-gradient-to-r from-yellow-600 to-amber-600 py-3 px-4 rounded-2xl rounded-tr-none shadow-lg">
                        <p className="text-white text-sm font-medium">
                          {chat.userInfo?.userName}
                        </p>
                        <p className="text-white text-xl font-medium leading-tight max-w-[220px] break-words">
                          {chat.content}
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
                  // Other user's message
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
                        alt="User avatar"
                        className="w-full h-full rounded-full border-2 border-gray-500"
                      />
                    </div>
                    <div className="flex flex-col items-start max-w-[70%]">
                      <div className="flex flex-col items-start bg-gradient-to-r from-gray-600 to-gray-500 py-3 px-4 rounded-2xl rounded-tl-none shadow-lg">
                        <p className="text-amber-400 text-sm font-medium">
                          {chat.userInfo?.userName}
                        </p>
                        <p className="text-white text-xl font-medium leading-tight max-w-[220px] break-words">
                          {chat.content}
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
                )
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#24160e] border-t border-[#3a281e] flex-shrink-0">
          <div className="flex space-x-2 md:space-x-4 max-w-4xl mx-auto  flex-shrink-0">
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
              disabled={!selectedRoom}
            />

            <button
              className="send-button flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!selectedRoom || text.trim() === ""}
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
  );
};

export default MatchChat;
