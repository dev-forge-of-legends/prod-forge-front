// src/components/organisms/sidebar/MobileSidebarDrawer.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Image } from "../../atoms/Image";

// same nav as Sidebar (copy kept local to avoid touching Sidebar.tsx)
const nav = [
  { label: "Dashboard", to: "/homedashboard", iconSrc: "/assets/images/icons/Sidebar-Icon1.svg" },
  { label: "Individual Matches", to: "/individual-matches", iconSrc: "/assets/images/icons/Sidebar-Icon2.svg", chevron: true },
  { label: "Team Matches", to: "/team-matches", iconSrc: "/assets/images/icons/Sidebar-Icon-Users.svg", chevron: true },
  { label: "My Team", to: "/my-team", iconSrc: "/assets/images/icons/Team.svg" },
  { label: "Achievements", to: "/achievements", iconSrc: "/assets/images/icons/Sidebar-Icon_trophy-outline.svg" },
  { label: "Shop", to: "/shop", iconSrc: "/assets/images/icons/Sidebar-Icon_shop.svg" },
  { label: "How to play", to: "/how-to-play", iconSrc: "/assets/images/icons/Sidebar-Icon_proicons_play-circle.svg" },
  { label: "Terms and Condition", to: "/terms", iconSrc: "/assets/images/icons/Sidebar-Icon_book-open-text.svg" },
  // { label: "Privacy and Policy", to: "/privacy", iconSrc: "/assets/images/icons/Sidebar-Icon_shield.svg" },
  { label: "Sweep Rules", to: "/sweep-rules", iconSrc: "/assets/images/icons/Sidebar-Icon_book-open-text.svg" },
];

type Props = { onNavigate?: () => void };

export const MobileSidebarDrawer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header (logo) */}
      <div className="flex items-center justify-center pt-6 pb-4">
        <Image
          src="/assets/images/logo/LOGO.svg"
          alt="Forge Legions"
          className="h-[40px] object-contain"
          fallbackSrc="/assets/images/icons/default.svg"
        />
      </div>

      {/* Nav */}
      <nav className="px-2 pb-6 space-y-2 overflow-y-auto custom-scrollbar">
        {nav.map(({ label, to, iconSrc, chevron }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              [
                "group rounded-xl px-3 py-2 text-sm font-vastagoMedium",
                "flex items-center justify-between",
                "transition-colors",
                isActive ? "bg-white/10 text-white" : "text-gray hover:text-white hover:bg-white/5",
              ].join(" ")
            }
          >
            <span className="flex items-center gap-3">
              <Image
                src={iconSrc}
                alt={`${label} icon`}
                className="h-5 w-auto opacity-80 group-hover:opacity-100 shrink-0"
                fallbackSrc="/assets/images/icons/default.svg"
              />
              <span>{label}</span>
            </span>

            {chevron && (
              <svg className="h-4 w-4 opacity-60 group-hover:opacity-80" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </NavLink>
        ))}

        <div className="my-3 border-t border-white/10" />
        <button
          type="button"
          className="w-full text-left rounded-xl px-3 py-2 hover:bg-white/5 text-red-400 font-vastagoMedium"
          onClick={onNavigate}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

