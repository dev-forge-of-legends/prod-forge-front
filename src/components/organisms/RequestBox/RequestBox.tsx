import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Image } from "../../atoms/Image";
import { motion } from "framer-motion";
import { apiAcceptJoinRequest, apiRejectJoinRequest } from "@apis/team";
import { apiGetUsers } from "@apis/user"; // You'll need this API function
import { BgButton, IconBadge } from "@components/atoms";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  xpLevel?: number;
  // Add other user fields as needed
}

interface RequestBoxProps {
  id?: string;
  teamId?: string;
  userId: string;
  status: string;
  userInfo: UserInfo;
  onStatusUpdate?: () => void; // Callback to refresh parent component
}

interface UserInfo {
  avatar: string;
  email: string;
  id: string;
  level: number;
  loses: number;
  played: number;
  role: string;
  teamId: string;
  userName: string;
  wins: number;
}

export const RequestBox = ({
  id,
  userId,
  status,
  userInfo,
  onStatusUpdate,
}: RequestBoxProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // You need to create this API function to get user by ID
      const user = await apiGetUsers(userId);
      setUserData(user as any);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to load user information");
    } finally {
      setLoading(false);
    }
  };

  const onAcceptHandle = async () => {
    try {
      if (!id) {
        toast.error("Request ID is missing");
        return;
      }

      await apiAcceptJoinRequest(id); // Use request ID, not user ID
      toast.success("Join request accepted successfully");

      // Refresh parent component to update the list
      if (onStatusUpdate) {
        onStatusUpdate();
      }
      close();
    } catch (err: any) {
      toast.error(err.message || "Failed to accept join request");
    }
  };

  const onRejectHandle = async () => {
    try {
      if (!id) {
        toast.error("Request ID is missing");
        return;
      }

      await apiRejectJoinRequest(id); // Use request ID, not user ID
      toast.success("Join request rejected");

      close();

      // Refresh parent component to update the list
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to reject join request");
    }
  };

  if (loading) {
    return (
      <div className="border-2 border-gray-400 rounded-xl m-3 p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full animate-pulse"></div>
            <div className="ml-3">
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-20 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-6 w-20 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mr-2 mb-2">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div
          className="flex flex-col justify-between rounded-xl border border-[#383838] 
              bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
              px-4 py-6"
        >
          <div className="mt-[3%] flex justify-between">
            <div className="flex flex-row items-start mb-1">
              <Image
                src={userData?.avatar || "/assets/images/users/user0.webp"}
                fallbackSrc="/assets/images/users/user0.webp"
                alt={userData ? `${userInfo.userName}` : "User"}
                className="w-12 h-12 rounded-full border-[1px] border-white/10"
              />
              <div className="items-start text-white text-start ml-3">
                <h1 className="font-vastagoBold text-xl">
                  {userData ? `${userInfo.userName}` : "Unknown User"}
                </h1>
                <div className="flex flex-row">
                  <h1 className="ffont-vastagoRegular text-sm text-[#9E9E9E]">
                    XP Level:
                  </h1>
                  <h1 className="font-vastagoRegular text-sm  text-amber-500">
                    {userInfo.level}
                  </h1>
                </div>
              </div>
            </div>
            <div>
              {status === "pending" && <IconBadge text="Pending" />}
              {status === "accepted" && <IconBadge text="Accepted" />}
              {status === "rejected" && <IconBadge text="Rejected" />}
            </div>
          </div>
          <div className="flex text-[12px] text-center items-center justify-start mt-2">
            <div className="bg-[#9A724B] bg-opacity-20 w-[40%] rounded-full p-1">
              <p className="text-[#573D11]">
                {`Match Played: ${userInfo.played}`}
              </p>
            </div>
          </div>

          <div className="border-t border-[#9A724B] border-opacity-50 my-4 mx-1"></div>

          {/* Only show action buttons for pending requests */}
          {status === "pending" && (
            <div className="min-w-10 h-10 text-center text-[12px] mt-[2%] flex flex-row">
              <BgButton
                size="cards"
                scale={1}
                className="text-sm"
                onClick={onRejectHandle}
              >
                REJECT
              </BgButton>
              <BgButton
                size="cards"
                scale={1}
                className="text-sm ml-2.5"
                onClick={onAcceptHandle}
              >
                ACCEPT
              </BgButton>
            </div>
          )}
          {status === "rejected" && (
            <div className="min-w-10 h-10 text-center text-[12px] mt-[2%] flex justify-between">
              <BgButton
                size="cards"
                scale={1}
                className="text-sm"
                onClick={onAcceptHandle}
              >
                ACCEPT
              </BgButton>
            </div>
          )}
          {status === "accepted" && (
            <div className="min-w-10 h-10 text-center text-[12px] mt-[2%] flex justify-between">
              <BgButton
                size="cards"
                scale={1}
                className="text-sm"
                onClick={onRejectHandle}
              >
                REJECT
              </BgButton>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
