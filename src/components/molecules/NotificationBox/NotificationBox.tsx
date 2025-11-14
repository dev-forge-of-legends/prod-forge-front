import {
  apiGetNotifications,
  apiGetUnreadCount,
} from "@apis/notification";
import { INotification } from "@app-types/interfaces";
import { formatTimeAgo } from "@app-utils/timeUtils";
import { CustomSpinner } from "@components/atoms/CustomSpinner/CustomSpinner";
import { useClickOutside } from "@hooks/useClickOutside";
import socketService from "@services/socket.service";
import { Bell, Link as LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const NotificationBox = () => {
  const [openNotifications, setOpenNotifications] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const notificationsRef = useClickOutside<HTMLDivElement>(() =>
    setOpenNotifications(false)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchUnreadCount();
    socketService.addEventHandler("newNotification", handleNewNotification);
    return () => {
      socketService.removeEventHandler(
        "newNotification",
        handleNewNotification
      );
    };
  }, []);

  useEffect(() => {
    if (openNotifications) {
      fetchData(0, pageSize);
    } else {
      setIsFirstLoading(false);
      setIsLoading(false);
      setNotifications([]);
      setPage(0);
    }
  }, [openNotifications]);

  const fetchUnreadCount = async () => {
    const data = await apiGetUnreadCount();
    setUnreadCount(data.unreadCount);
  };

  const fetchData = async (skip: number, count: number) => {
    if (skip === 0) setIsFirstLoading(true);
    else setIsLoading(true);
    const data = await apiGetNotifications(skip, count);
    setNotifications(data.items);
    fetchUnreadCount();
    if (skip === 0) setTimeout(() => setIsFirstLoading(false), 500);
    else setIsLoading(false);
  };

  const fetchMore = async () => {
    setIsLoading(true);
    setPage(page + 1);
    const data = await apiGetNotifications((page + 1) * pageSize, pageSize);
    setNotifications([...notifications, ...data.items]);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleNewNotification = () => {
    fetchUnreadCount();
    toast.success("🔔 You've got a new notification!");
  };

  const handleRead = async (id: string) => {
    // await apiReadNotification(id);
    // const updatedNotifications = notifications.map((notification) => {
    //   if (notification.id === id) notification.isRead = true;
    //   return notification;
    // }); 
    // setNotifications(updatedNotifications);
    // setUnreadCount((prev) => prev - 1);
    await setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative mt-2 " ref={notificationsRef}>
      <button onClick={() => setOpenNotifications((prev) => !prev)}>
        <Bell className="text-white cursor-pointer bordered rounded-full w-8 h-8 p-1  border-[#393935] border-[2px]" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 right-0.2 p-0.25 text-black font-bold bg-yellow-500 rounded-full w-4.5 h-4.5 text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {openNotifications && (
        <div className="absolute -right-10 mt-4 w-80 max-h-106 bg-zinc-900 text-white rounded-lg shadow-lg border border-zinc-700 z-50">
          {/* <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button onClick={() => setOpenNotifications(false)}>
              <X className="w-5 h-5 text-zinc-400 hover:text-white" />
            </button>
          </div> */}
          <div className="max-h-96 overflow-y-auto py-3 space-y-3 bg-[#0E0B09] rounded-xl p-3">
            {isFirstLoading ? (
              <div className="flex justify-center">
                <CustomSpinner size={25} />
              </div>
            ) : notifications.length > 0 ? (
              <div className="flex flex-col space-y-2">
                {notifications.map((item, idx) => (
                  <Link
                    to={item.deepLink ? item.deepLink : "#"}
                    key={idx}
                    className={`relative flex items-center bg-gradient-to-b from-[#1C1714] to-[#14100E] border border-[#2C221E]/50 rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.3)] px-4 py-3 ${
                      item.isRead
                        ? "text-yellow-400 bg-zinc-900"
                        : "text-white bg-zinc-800"
                    }`}
                    onClick={() => {
                      if (item.deepLink) {
                        setOpenNotifications(false);
                      }
                    }}
                  >
                    <img
                      src={
                        "https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/notification/Frame%20330.png"
                      } 
                      alt="Notification"
                      className="w-8 h-8 rounded-md object-cover mt-0.5"
                    />
                    <div>
                      <p className="text-sm ml-3">
                        {item.content}  
                        {item.deepLink && ` `}
                        {item.deepLink && (
                          <LinkIcon className="w-3 h-3 inline-block" />
                        )}
                      </p>
                      <p className="text-xs text-zinc-400 ml-4 mt-1">
                        {formatTimeAgo(item.createdAt)}
                      </p>
                    </div>
                    {!item.isRead && (
                      <button
                        onClick={() => {
                          // e.preventDefault();
                          // e.stopPropagation();
                          handleRead(item.id)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        <img
                          src="https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/notification/material-symbols_delete-outline-rounded.png" // 👈 change this to your image path
                          alt="delete"
                          className="w-5 h-5 opacity-70 hover:opacity-100 transition"
                        />
                      </button>
                    )}
                  </Link>
                ))}
                <div className="flex justify-center items-center text-sm pt-2">
                  {isLoading ? (
                    <CustomSpinner />
                  ) : (
                    <div className="cursor-pointer" onClick={fetchMore}>
                      Load More
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-zinc-400 text-sm text-center">
                No new notifications
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
