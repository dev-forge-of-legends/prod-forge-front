import {
  apiGetChatRooms,
  apiMarkMessageAsRead,
  apiMessagesInRoom,
  apiSendMessageToRoom,
} from "@apis/team";
import { apiGetUser } from "@apis/user";
import { Room, UserData } from "@app-types/interfaces";
import { Image } from "@components/atoms/Image";
import socketService from "@services/socket.service";
import { useEffect, useRef, useState } from "react";

interface UserInfo {
  avatar: string;
  id: string;
  level: number;
  userName: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  content: string; // ✅ renamed from `message` to match usage
  type: "query" | "reply";
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
  userInfo?: UserInfo;
  roomId?: string;
  isEdited?: boolean;
}
interface RoomWithUnread extends Room {
  unreadCount?: number;
  type: "team" | "direct";
  otherUser?: UserInfo; // For direct messages
}

interface ChatItemProps {
  chat: ChatMessage;
  readMessage: (id: string) => void;
}
const ChatItem = ({ chat, readMessage }: ChatItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 1.0 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && !chat.isRead) {
      readMessage(chat.id);
    }
  }, [isVisible, chat, readMessage]);

  return (
    <div
      key={chat.id}
      className="flex justify-start items-start space-x-1 md:space-x-2"
      ref={headerRef}
    >
      <div className="w-6 h-6 md:w-9 md:h-9 flex-shrink-0">
        <Image
          src={chat.userInfo?.avatar || "assets/images/users/user0.webp"}
          fallbackSrc="assets/images/users/user0.webp"
          alt="User avatar"
          className="w-full h-full rounded-full border-2 border-gray-500"
        />
      </div>
      <div className="flex flex-col items-start max-w-[70%] py-1 md:py-2 px-3 md:px-4 rounded-[12px] rounded-tl-none shadow-lg bg-white/10">
        <p className="text-amber-400 text-[10px] md:text-[12px] font-medium">
          {chat.userInfo?.userName}
        </p>
        <p className="text-white text-[14px] md:text-[16px] font-medium leading-tight max-w-[320px] break-words">
          {chat.content}
        </p>
        <p className="text-gray-400 text-[8px] md:text-[10px]">
          {new Date(chat.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
const TeamChat: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [rooms, setRooms] = useState<RoomWithUnread[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomWithUnread | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserData>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Pagination + scroll refs (ADDED)
  const [page, setPage] = useState<number>(0); // 0 = latest page
  const pageSize = 25; // messages per page (tune as needed)
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    fetchUserData();
    fetchProfile();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    if (selectedRoom) {
      // Mark messages as read when room is selected
      // markMessagesAsRead(selectedRoom.id);
      // Reset unread count for selected room
      updateRoomUnreadCount(selectedRoom.id, 0);
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
    if (!selectedRoom) return;

    const body = text;
    setText("");

    // create optimistic temp message
    const tempId = `temp-${Date.now()}`;
    const tempMessage: ChatMessage = {
      id: tempId,
      userId: profile?.id || "me",
      content: body,
      type: "reply",
      isRead: true,
      createdAt: new Date().toISOString(),
      userInfo: {
        avatar: profile?.avatar || "",
        id: profile?.id || "",
        level: profile?.level || 0,
        userName: profile?.userName || "You",
      },
      roomId: selectedRoom.id,
    };

    // 1) append to chat history (optimistic)
    setChatHistory((prev) => [...prev, tempMessage]);

    // 2) update rooms: set lastMessage for selected room immediately
    // setRooms((prev) =>
    //   prev.map((r) =>
    //     r.id === selectedRoom.id
    //       ? { ...r, lastMessage: tempMessage }
    //       : r
    //   )
    // );

    // ensure selectedRoom object also reflects lastMessage immediately
    // setSelectedRoom((prev) => (prev ? { ...prev, lastMessage: tempMessage } : prev));

    try {
      // call API
      const serverMsg = await apiSendMessageToRoom(selectedRoom.id, body);
      // If server returns the created message, replace temp message with server message
      if (serverMsg && serverMsg.id) {
        setChatHistory((prev) =>
          prev.map((m) => (m.id === tempId ? serverMsg : m))
        );

        setRooms((prev) =>
          prev.map((r) =>
            r.id === selectedRoom.id ? { ...r, lastMessage: serverMsg } : r
          )
        );

        setSelectedRoom((prev) =>
          prev ? { ...prev, lastMessage: serverMsg } : prev
        );
      }
      // optionally emit socket event if backend expects
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally mark the temp message as failed (add a flag) or remove it
      setChatHistory((prev) => prev.filter((m) => m.id !== tempId));
      // You might also want to show an error toast
    } finally {
      // scroll to bottom
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  const handleNewMessage = (data: ChatMessage) => {
    if (data.userId === profile?.id) return;
    if (data.roomId === selectedRoom?.id) {
      setChatHistory((prev) => {
        const exists = prev.some(
          (m) =>
            m.id === data.id ||
            m.id === `temp-${new Date(data.createdAt).getTime()}`
        );
        if (exists) {
          return prev.map((m) =>
            m.id?.startsWith("temp-") && m.createdAt === data.createdAt
              ? data
              : m
          );
        }
        return [...prev, data];
      });
    }

    // setRooms((prev: Room[]) =>
    //   prev.map((room) =>
    //     room.id === data.roomId
    //       ? {
    //           ...room,
    //           lastMessage: data,
    //         }
    //       : room
    //   )
    // );

    if (data.roomId !== selectedRoom?.id) {
      updateRoomUnreadCount(data.roomId!, 1);
    }
  };

  const fetchProfile = async () => {
    const data = await apiGetUser();
    setProfile(data);
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const roomsData = await apiGetChatRooms();

      // Enhance rooms with type information
      const enhancedRooms: RoomWithUnread[] = roomsData.map((room: any) => ({
        ...room,
        type: room.type === "teamChat" ? "team" : "direct",
      }));

      setRooms(enhancedRooms);
      console.log("Rooms with members:", enhancedRooms);

      if (enhancedRooms.length > 0) {
        setSelectedRoom(enhancedRooms[0]);
        // Fetch messages for the first room using pageSize
        const response = await apiMessagesInRoom(
          enhancedRooms[0].id,
          0,
          pageSize
        );
        const items = (response.items || []).reverse();
        setChatHistory(items);
        setPage(0);
        setHasMore((response.items || []).length === pageSize);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSelect = async (room: RoomWithUnread) => {
    setSelectedRoom(room);

    // reset pagination
    setPage(0);
    setHasMore(false);
    setChatHistory([]);
    setLoading(true);

    try {
      // Fetch latest messages: page 0 -> skip = 0
      const response = await apiMessagesInRoom(room.id, 0, pageSize);
      // Ensure we have array and reverse to show oldest first in the pane
      const items = (response.items || []).reverse();
      setChatHistory(items);
      // if got full page, there may be older messages
      setHasMore((response.items || []).length === pageSize);
      // make sure to scroll to bottom after initial load
      setTimeout(() => scrollToBottom(), 50);
    } catch (error) {
      console.error("Failed to fetch room messages:", error);
    } finally {
      setLoading(false);
    }

    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleReadMessage = async (messageId: string) => {
    console.log("handle read message with id", messageId);
    try {
      await apiMarkMessageAsRead(messageId);
      console.log("read message handled", selectedRoom);

      setRooms((prev: RoomWithUnread[]) => {
        return prev.map((room: RoomWithUnread) => {
          if (selectedRoom && room.id === selectedRoom.id) {
            return {
              ...room,
              unreadCount: room.unreadCount ? room.unreadCount - 1 : 0,
            };
          }
          return room;
        });
      });

      setChatHistory((prev: ChatMessage[]) => {
        return prev.map((chat: ChatMessage) => {
          if (chat.id === messageId) {
            return { ...chat, isRead: true };
          }
          return chat;
        });
      });
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
    // await fetchUserData(0, 100);
  };

  const updateRoomUnreadCount = (roomId: string, increment: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, unreadCount: (room.unreadCount || 0) + increment }
          : room
      )
    );
  };

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg">Loading Messages...</div>
        </div>
      </div>
    );
  }

  return (
    // <div className="flex min-h-[50%] min-w-[70%] bg-[#1b1009] rounded-2xl overflow-hidden shadow-2xl">
    // "min-h-screen flex flex-col bg-gradient-to-b from-[#2c1a10] to-[#1a0f09] text-white font-sans"
    <div className="flex h-[80vh] min-h-[calc(100vh-60px)] w-full max-w-[1400px]  rounded-2xl overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 max-w-full">
        {/* Mobile Header */}
        <div className="md:hidden w-full flex items-center justify-between p-4 bg-[#24160e]/80 border-b border-[#3a281e]">
          <h1 className="text-white text-xl font-bold">
            {selectedRoom
              ? selectedRoom.teamInfo?.name || selectedRoom.otherUser?.userName
              : "Team Chat"}
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-600 transition-colors"
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
          </button>
        </div>
        {/* Desktop Header (kept) + page controls */}
        <div className="hidden md:flex items-center p-4 md:p-6  bg-white/10 flex-shrink-0">
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
                  <p className="text-gray-400 text-sm">
                    {selectedRoom.type === "team"
                      ? "Team Channel"
                      : "Direct Message"}
                  </p>
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
          className="flex-1 overflow-y-auto px-3 md:px-6 py-4 min-h-0"
        >
          <div className="space-y-3 md:space-y-4 max-w-full md:max-w-4xl mx-auto">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-300 bg-gray-700 rounded-full flex items-center justify-center">
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
                    className="flex justify-end items-start space-x-1 md:space-x-2 flex-shrink-0"
                  >
                    <div className="flex items-start max-w-[70%] sm:max-w-[50%] space-x-1 md:space-x-2">
                      <div className="flex flex-col items-start bg-gradient-to-r from-yellow-600 to-amber-600 py-2 px-4 rounded-[12px] rounded-tr-none shadow-lg">
                        <p className="text-white/80 text-[10px] md:text-[12px] font-medium">
                          {chat.userInfo?.userName}
                        </p>
                        <p className="text-white text-[14px] md:text-[16px] leading-tight max-w-[320px] sm:max-w-[180px] break-words whitespace-pre-wrap w-full">
                          {chat.content}
                        </p>
                        <p className="text-white/70 text-[8px] md:text-[10px]">
                          {new Date(chat.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="w-6 h-6 md:w-9 md:h-9 flex-shrink-0">
                        <Image
                          src={
                            chat.userInfo?.avatar ||
                            "assets/images/users/user0.webp"
                          }
                          fallbackSrc="assets/images/users/user0.webp"
                          alt="User avatar"
                          className="w-full h-full rounded-full border-1 border-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ChatItem chat={chat} readMessage={handleReadMessage} />
                )
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}

        <div className="flex justify-between w-full mr-2 mt-4 items-center space-x-2 md:space-x-4 max-w-4xl mx-auto flex-shrink-0">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 w-130  ml-2 h-12 px-4 py-3 md:py-4 rounded-md border border-[#4a3225] bg-[#2a1a11] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base transition-all"
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
            className="send-button mr-2 flex-shrink-0"
            onClick={handleSendMessage}
            disabled={!selectedRoom || text.trim() === ""}
          >
            <svg
              className="w-5 h-5 md:w-5 md:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar - Rooms & Members */}

      <div
        className={`
        fixed md:relative inset-0 z-40 md:z-auto w-full
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        w-80 md:w-96 bg-[#1b1009] border-l border-[#3a281e]
        flex flex-col
      `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-[#3a281e]">
          <h2 className="text-white text-lg font-bold">Chats</h2>
          <button
            onClick={toggleSidebar}
            className="text-white hover:bg-gray-600 transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Team Channels Section */}
          <div className="p-4">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Team Channels
            </h3>
            <div className="space-y-2">
              {rooms
                .filter((room) => room.type === "team")
                .map((room) => (
                  <button
                    key={room.id}
                    className={`flex w-full items-center justify-between p-3 transition-all duration-200 group border-b-3 border-[#2a1a11] ${selectedRoom?.id === room.id
                      ? "bg-amber-500/20"
                      : "hover:bg-[#2a1a11]"
                      }`}
                    onClick={() => handleRoomSelect(room)}
                  >
                    {/* Avatar with last message and username */}
                    <div className="relative flex flex-row">
                      <Image
                        src={room.avatar || "assets/images/users/user0.webp"}
                        fallbackSrc={
                          room.avatar || "assets/images/users/user0.webp"
                        }
                        alt={room.teamInfo?.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
                      />
                      <div className="pl-2">
                        <p className="text-left text-white text-sm md:text-base font-medium truncate">
                          {room.teamInfo?.name}
                        </p>
                        {/* Last message content */}
                        <p className="text-left text-gray-400 text-xs md:text-sm truncate">
                          {room.lastMessage?.content
                            ? room.lastMessage.content.length > 20
                              ? room.lastMessage.content.slice(0, 20) + "..."
                              : room.lastMessage.content
                            : "No messages yet"}
                        </p>
                      </div>
                    </div>

                    {/* Last message and unread count*/}
                    <div className="ml-3 min-w-0 text-left flex flex-row">
                      <div className="flex items-center justify-between">
                        {/* Relative time */}
                        {room.lastMessage?.createdAt && (
                          <span className="text-gray-400 text-xs whitespace-nowrap">
                            {(() => {
                              const lastTime = new Date(
                                room.lastMessage?.createdAt ||
                                room.lastMessage.updatedAt ||
                                room.lastMessage.createdAt
                              );
                              const now = new Date();
                              const diffMs = now.getTime() - lastTime.getTime();

                              const rtf = new Intl.RelativeTimeFormat("en", {
                                numeric: "auto",
                              });

                              const seconds = Math.floor(diffMs / 1000);
                              const minutes = Math.floor(seconds / 60);
                              const hours = Math.floor(minutes / 60);
                              const days = Math.floor(hours / 24);

                              if (seconds < 60)
                                return rtf.format(-seconds, "second");
                              if (minutes < 60)
                                return rtf.format(-minutes, "minute");
                              if (hours < 24) return rtf.format(-hours, "hour");
                              return rtf.format(-days, "day");
                            })()}
                          </span>
                        )}
                      </div>
                      <div className="pl-2">
                        {Number(room.unreadCount) > 0 && (
                          <span className="bg-green-600 text-white text-[11px] font-semibold min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div className="p-4 border-t border-[#3a281e]">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Direct Messages
            </h3>
            <div className="space-y-2">
              {rooms
                .filter((room) => room.type === "direct")
                .map((room) => (
                  <button
                    key={room.id}
                    className={`flex w-full items-center justify-between p-3 transition-all duration-200 group border-b-3 border-[#2a1a11] ${selectedRoom?.id === room.id
                      ? "bg-amber-500/20"
                      : "hover:bg-[#2a1a11]"
                      }`}
                    onClick={() => {
                      if (selectedRoom?.id !== room.id) {
                        handleRoomSelect(room);
                      }
                    }}
                    disabled={selectedRoom?.id === room.id}
                  >
                    {/* Avatar with last message and username */}
                    <div className="relative flex flex-row">
                      <Image
                        src={
                          room.otherUser?.avatar ||
                          "assets/images/users/user0.webp"
                        }
                        fallbackSrc={
                          room.otherUser?.avatar ||
                          "assets/images/users/user0.webp"
                        }
                        alt={room.otherUser?.userName}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0"
                      />
                      <div className="pl-2">
                        <p className="text-left text-white text-sm md:text-base font-medium truncate">
                          {room.userInfo?.userName}
                        </p>
                        {/* Last message content */}
                        <p className="text-left text-gray-400 text-xs md:text-sm truncate">
                          {room.lastMessage?.content
                            ? room.lastMessage.content.length > 20
                              ? room.lastMessage.content.slice(0, 20) + "..."
                              : room.lastMessage.content
                            : "No messages yet"}
                        </p>
                      </div>
                    </div>

                    {/* Last message and unread count*/}
                    <div className="ml-3 min-w-0 text-left flex flex-row">
                      <div className="flex items-center justify-between">
                        {/* Relative time */}
                        {room.lastMessage?.createdAt && (
                          <span className="text-gray-400 text-xs whitespace-nowrap">
                            {(() => {
                              const lastTime = new Date(
                                room.lastMessage?.createdAt ||
                                room.lastMessage.updatedAt ||
                                room.lastMessage.createdAt
                              );
                              const now = new Date();
                              const diffMs = now.getTime() - lastTime.getTime();

                              const rtf = new Intl.RelativeTimeFormat("en", {
                                numeric: "auto",
                              });

                              const seconds = Math.floor(diffMs / 1000);
                              const minutes = Math.floor(seconds / 60);
                              const hours = Math.floor(minutes / 60);
                              const days = Math.floor(hours / 24);

                              if (seconds < 60)
                                return rtf.format(-seconds, "second");
                              if (minutes < 60)
                                return rtf.format(-minutes, "minute");
                              if (hours < 24) return rtf.format(-hours, "hour");
                              return rtf.format(-days, "day");
                            })()}
                          </span>
                        )}
                      </div>
                      <div className="pl-2">
                        {Number(room.unreadCount) > 0 && (
                          <span className="bg-green-600 text-white text-[11px] font-semibold min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full">
                            {room.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default TeamChat;
