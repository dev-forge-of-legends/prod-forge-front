import { apiLogout } from "@apis/auth";
import { Image } from "@components/atoms/Image";
import { NotificationBox } from "@components/molecules/NotificationBox/NotificationBox";
import { SpeedTest } from "@components/molecules/SpeedTest/SpeedTest";
import { useClickOutside } from "@hooks/useClickOutside";
import SupportChat from "@pages/Help/SupportChat";
import { useAppSelector } from "@redux/store";
import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setDropdown(false));

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiLogout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const data = () => {
    {
      try {
        const d = localStorage.getItem("userdata");
        if (!d) {
          console.error("User data not found");
        } else {
          const data = JSON.parse(d);
          return data;
        }
      } catch (error) {
        console.error(error);
      }
      return data;
    }
  };
  return (
    <nav className="sticky top-0 z-100 quicksand-font w-full header-glass">
      <div
        className={`w-full max-w-full mx-auto flex items-center justify-end  md:gap-4 ${
          user.isAuthenticated ? "py-2" : "py-1"
        } px-4 sm:px-6`}
      >
        {!user.isAuthenticated ? (
          <div className="flex items-center">
            <div className="p-2 ">
              <div className="glass-border rounded-3xl p-2">
                <Image src="/assets/images/icons/Notification.svg" />
              </div>
            </div>
            <div className="glass-profile hidden md:flex border-[#393935] bg-red-300  items-center px-4 py-2 rounded-full gap-3 cursor-pointer">
              <Image
                src="/assets/images/users/user1.webp"
                alt="user avatar"
                className="h-10 w-10 rounded-full border border-white/20"
              />
              <div className="flex flex-col leading-tight ">
                <span className="text-white font-semibold text-bas  e"></span>
                <span className="text-gray-300 text-sm">Level: 11</span>
              </div>
              <ChevronDown className="text-white ml-auto" size={20} />
            </div>

            <div className="glass-profile flex md:hidden items-center px-2 py-2 rounded-full gap-2 cursor-pointer">
              <Image
                src="/assets/images/users/user1.webp"
                alt="user avatar"
                className="h-10 w-10 rounded-full border border-white/20"
              />
            </div>
          </div>
        ) : (
          <div className="items-center flex gap-0 sm:gap-4 relative">
            <div className="h-7 border-[#393935]  bordered border-[1px] bg-[#221104] rounded-full flex flex-row items-center justify-between">
              <img
                className="w-10 h-10 rounded-full mr-1"
                src="https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/noto_coin.png"
                alt=""
              />
              <p className="text-[white] text-[12px] mr-2 font-bold">
                {data().wallet.coin}
              </p>
            </div>
            <SpeedTest className="mr-4" />
            <SupportChat />
            <NotificationBox />
            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdown((prev) => !prev)}
                className="flex w-50  items-center cursor-pointer rounded-full p-1 pl-2 bordered border-0 md:border-2 border-[#23123a] w-full"
              >
                <Image
                  src={data().avatar}
                  alt="user-img"
                  className="h-10 w-10 rounded-full border-2"
                />
                <div className="flex flex-col ml-1 w-full hidden md:block">
                  <p className="text-[white] text-[14px] font-bold">
                    {" "}
                    {data().userName}
                  </p>
                  <p className="text-[white] text-[11px]">
                    Level : {data().level}
                  </p>
                </div>
                <ChevronDown className="text-white ml-2 hidden md:block" />
              </div>
              {dropdown && (
                <div className="absolute right-0 mt-2 w-30 bg-gradient-to-b from-[#241B14]/95 to-[#120E0B]/95 backdrop-blur-md text-white rounded-lg shadow-xl z-50 animate-fade-in">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 transition-colors flex items-center hover:text-yellow-400 rounded-md mx-1"
                    onClick={() => setDropdown(false)}
                  >
                    <div
                      className="w-4 h-4 mr-2 bg-cover bg-center rounded-full"
                      style={{
                        backgroundImage:
                          'url("https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/notification/Vector.webp")',
                      }}
                    />
                    {/* <div className="flex items-center bg-yellow-400 rounded-full">
                      <CircleUserRound className="full-yellow-5" />
                    </div> */}
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full flex items-center transition-colors hover:text-yellow-400 rounded-md mx-1"
                  >
                    {/* <div
                      className="w-5 h-5 mr-2 bg-cover bg-center rounded-full"
                      style={{
                        backgroundImage: 'url("https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/notification/material-symbols_logout.png")',
                      }}
                    /> */}
                    <div className="flex items-center text-red-500">
                      <LogOut className="w-5 h-5 mr-2 bg-cover bg-center" />
                    </div>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
