import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiJoinRequest } from "@apis/team";
import { Image } from "../../atoms/Image";
import { TeamMember } from "@app-types/interfaces";
import { BgButton, IconBadge } from "@components/atoms";

interface Team {
  id: string;
  avatar: string;
  name: string;
  members: TeamMember[]; // Changed from member to members array
  memberCount: number; // Added separate count
}

export const TeamBox = ({ id, avatar, name, members, memberCount }: Team) => {
  const [value, setValue] = useState("Request to Join");

  const handleChange = async () => {
    if (value == "Request to Join") {
      try {
        await apiJoinRequest(id);
        toast.success("Join Requested successfully");
        setValue("Cancel Request");
      } catch (err: any) {
        toast.error(err.message || "Failed to create request!");
      }
    } else {
      try {
        // const res = await apiCancelJoinRequest(profile.id);
        toast.success("Join Request Canceled");
        setValue("Request to Join");
      } catch (err: any) {
        toast.error(err.message || "Failed to create request!");
      }
    }
  };

  // Function to get member avatars for display
  const getMemberAvatars = () => {
    const avatarsToShow = [];

    if (members.length === 0) {
      // If no members, show team avatar 3 times
      return [avatar, avatar, avatar];
    }

    if (members.length >= 3) {
      // If 3 or more members, take first 3
      avatarsToShow.push(...members.slice(0, 3).map((member) => member.avatar));
    } else {
      // If less than 3 members, use available members and duplicate the last one
      avatarsToShow.push(...members.map((member) => member.avatar));

      // Fill remaining slots with the last available avatar
      while (avatarsToShow.length < 3) {
        avatarsToShow.push(members[members.length - 1]?.avatar || avatar);
      }
    }

    return avatarsToShow;
  };

  const memberAvatars = getMemberAvatars();

  return (
    <div className="max-w-72 min-w-72 h-52">
      {/* Header sdds*/}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div
          className="flex flex-col justify-between rounded-xl border border-[#383838] 
              bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] 
              px-4 py-4"
        >
          <div>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={avatar}
                  alt={""}
                  className="w-12 h-12 rounded-full border-[1px] border-white/10"
                  fallbackSrc={avatar}
                />
                <div className="flex flex-col items-start">
                  <p className="font-vastagoBold text-xl text-white">{name}</p>
                </div>
              </div>
              <div>
                <IconBadge text="Not Requested" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 my-4" />

          <div className="flex flex-row items-end justify-between w-full">
            <BgButton
              onClick={handleChange}
              size="cards"
              scale={1}
              disabled={false}
            >
              {value}
            </BgButton>

            <div className="flex flex-col items-center gap-2">
              {/* Member Avatars Display */}
              <div className="flex -space-x-3">
                {memberAvatars.map((avatarUrl, index) => (
                  <div
                    key={index}
                    className={`relative ${index > 0 ? "-ml-2" : ""}`}
                  >
                    <Image
                      src={avatarUrl}
                      fallbackSrc={avatarUrl}
                      alt={`Member ${index + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-[#383838] shadow-lg"
                    />
                    {index === 2 && memberCount > 3 && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          +{memberCount - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-gray-400 text-xs ml-2">
                {memberCount} Member{memberCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
