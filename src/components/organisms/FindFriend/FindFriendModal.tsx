import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Image } from "../../atoms/Image";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindFriendModal = ({ isOpen, onClose }: LoginModalProps) => {

  const [text, setText] = useState("");
  const Friend_list = [
    {
      id: "1",
      avatar: "/assets/images/teams/team0.webp",
      name: "Kristin Watson",
      checked: false,
    },
    {
      id: "2",
      avatar: "/assets/images/teams/team1.webp",
      name: "Ronald Richards",
      checked: false,
    },
    {
      id: "3",
      avatar: "/assets/images/teams/team2.webp",
      name: "Jane Cooper",
      checked: false,
    },
    {
      id: "4",
      avatar: "/assets/images/teams/team3.webp",
      name: "Savannah Nguyen",
      checked: false,
    },
  ];
  const [InvitedFriends, addInvitedFriends] = useState(Friend_list);

  const handleSendMessage = () => {
    addInvitedFriends(InvitedFriends.filter((friend) => friend.name === text));
  };

  const handleClose = () => {
    onClose();
  };

  const onInviteFriend = () => {
    onClose();
  };

  const onReset = () => {
    addInvitedFriends(Friend_list)
    setText('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-150 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="quicksand-font bg-gray-900 rounded-lg p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div>
            <p className="text-2xl font-bold">Invited Friend</p>
            <button
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:text-yellow-400 transition-colors"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>

          <div className="pt-[5%]">
            <input
              type="text"
              placeholder="Enter user name"
              className="w-full pl-4 pr-10 py-2.5 rounded-lg border-1 bg-black text-xl text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-600"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
          </div>
          <div>
            {InvitedFriends.length !== 0 ? (
              InvitedFriends.map((friend: any) => {
                return (
                  <li key={friend.id} className="list-none">
                    <div className="mt-[5%] flex justify-between">
                      <div className="w-[80%] flex">
                        <Image
                          src={friend.avatar}
                          fallbackSrc={friend.avatar}
                          alt="Forge of Legends"
                          className="w-[20%] rounded-full"
                        />
                        <div className="ml-[3%] mt-[4%]">
                          <p className="text-[14px] md:text-2xl">{friend.name}</p>
                        </div>
                      </div>
                      <div className="text-4xl text-gray-500 text-center mt-[4%] flex">
                        <input
                          type="checkbox"
                          className="w-[25px] h-[25px]"
                          onClick={() => (friend.checked = true)}
                        />
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <h1>No Teams Found</h1>
            )}

            <div className="md:mx-[10%] mt-[8%] mb-[4%] flex justify-between">
              <button
                className="w-[45%] bg-transparent backdrop-blur-sm backdrop-filte border-2 border-gray-600 py-2 px-4 rounded-4xl"
                onClick={onReset}
              >
                Reset
              </button>
              <button
                className="w-[45%] bg-gradient-to-b from-[#F89F17] to-[#925E0E] py-2 px-4 rounded-4xl"
                onClick={onInviteFriend}
              >
                Invite Friend
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

