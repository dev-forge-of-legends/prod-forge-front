import {
  CalendarHeart,
  Gamepad2,
  Gem,
  Gift,
  Home,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogout } from "../../../apis/auth";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiLogout();
    navigate("/");
  };
  const links = [
    {
      label: "Home",
      link: "/homedashboard",
      icon: <Home className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Individual Match",
      link: "/individual-match",
      icon: <Gamepad2 className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Team Matches",
      link: "/team-matches",
      icon: <Users className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Team Dashboard",
      link: "/team-dashboard",
      icon: <Gem className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Challenge Teams",
      link: "/challenge-teams",
      icon: <ShoppingCart className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Match History",
      link: "/match-histories",
      icon: <CalendarHeart className="w-5 h-5 text-yellow-400" />,
    },
    {
      label: "Sweep Rules",
      link: "/sweep-rules",
      icon: <Gift className="w-5 h-5 text-yellow-400" />,
    },
  ];

  return (
    <aside className="fixed bg-zinc-900 top-0 left-0 h-full w-68 text-white shadow-lg z-50 border-r border-yellow-500 flex flex-col justify-between overflow-auto pb-20">
      <div className="p-4 space-y-2">
        <img
          src="/assets/images/header/logo1.webp"
          alt="Logo"
          className="h-16 mb-4"
        />
        <div className="border-t border-yellow-500 my-4"></div>
        {links.map((item, idx) => (
          <Link
            key={idx}
            className="flex items-center gap-3  bg-clip-text py-2 px-4 hover:bg-[#1c1f29] [background-image:linear-gradient(90deg,#ffc700_0,#ffeca8_51%,#ffc700_100%)] [color:transparent] hover:text-yellow-300"
            to={item.link}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}

        <div className="border-t border-yellow-500 my-4"></div>

        <div className="flex justify-center gap-6 mb-4">
          <Link to="/profile" className="text-white">
            <img
              src="/assets/images/header/profile.webp"
              alt="user-img"
              className="h-10 w-10 rounded-full"
            />
          </Link>
          <Link to="/settings">
            <Settings className="w-8 h-8 text-yellow-500" />
          </Link>
        </div>
        <div className="border-t border-yellow-500 my-4"></div>
        <Link
          to="/privacy-policy"
          className="flex whitespace-nowrap items-center gap-3  bg-clip-text py-2 px-4 hover:bg-[#1c1f29] [background-image:linear-gradient(90deg,#ffc700_0,#ffeca8_51%,#ffc700_100%)] [color:transparent] hover:text-yellow-300"
        >
          Responsible Gaming Controls
        </Link>

        <Link
          to="/terms-and-condition"
          className="flex items-center gap-3  bg-clip-text py-2 px-4 hover:bg-[#1c1f29] [background-image:linear-gradient(90deg,#ffc700_0,#ffeca8_51%,#ffc700_100%)] [color:transparent] hover:text-yellow-300"
        >
          Terms and Policies
        </Link>
      </div>
      <div className="border-t border-yellow-500 my-4"></div>
      <div className="p-4 border-t border-yellow-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 font-semibold hover:text-red-700"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
};
