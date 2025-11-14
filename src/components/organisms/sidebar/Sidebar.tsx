// src/components/organisms/sidebar/Sidebar.tsx
import { apiLogout } from "@apis/auth";
import { apiGetUser } from "@apis/user";
import { UserData } from "@app-types/interfaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Image } from "../../atoms/Image";

type NavItem = {
  label: string;
  to: string;
  iconSrc: string;
  chevron?: boolean;
};

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

const nav: NavItem[] = [
  {
    label: "Dashboard",
    to: "/homedashboard",
    iconSrc: "/assets/images/icons/Sidebar-Icon1.svg",
  },
  // {
  //   label: "Individual Matches",
  //   to: "/individual-match",
  //   iconSrc: "/assets/images/icons/Sidebar-Icon2.svg",
  //   chevron: true,
  // },
  // {
  //   label: "Team Matches",
  //   to: "/team-matches",
  //   iconSrc: "/assets/images/icons/Sidebar-Icon-Users.svg",
  //   chevron: true,
  // },
  // {
  //   label: "My Team",
  //   to: "/my-team",
  //   iconSrc: "/assets/images/icons/Team.svg",
  // },
  {
    label: "Achievements",
    to: "/achievements",
    iconSrc: "/assets/images/icons/Sidebar-Icon_trophy-outline.svg",
  },
  {
    label: "Shop",
    to: "/shop",
    iconSrc: "/assets/images/icons/Sidebar-Icon_shop.svg",
  },
  {
    label: "How to play",
    to: "/how-to-play",
    iconSrc: "/assets/images/icons/Sidebar-Icon_proicons_play-circle.svg",
  },
  {
    label: "Terms and Condition",
    to: "/terms-and-condition",
    iconSrc: "/assets/images/icons/Sidebar-Icon_book-open-text.svg",
  },
  // {
  //   label: "Privacy and Policy",
  //   to: "/privacy-and-policy",
  //   iconSrc: "/assets/images/icons/Sidebar-Icon_shield.svg",
  // },
  {
    label: "Sweep Rules",
    to: "/sweep-rules",
    iconSrc: "/assets/images/icons/Sidebar-Icon_book-open-text.svg",
  },
];

export const Sidebar: React.FC<Props> = ({ collapsed, onToggle }) => {
  //  const [open, setOpen] = useState(false);
  const [subindividualOpen, setSubindividualmenuOpen] = useState(false);
  const [subteamOpen, setSubteammenuOpen] = useState(false);
  const [submyteamOpen, setSubmyteammenuOpen] = useState(false);
  const widthCls = collapsed ? "lg:w-15" : "lg:w-50";
  const navigate = useNavigate();

  const handlelogout = async () => {
    await apiLogout();
    navigate("/");
  };
  const [profile, setProfile] = useState<UserData>();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const data = await apiGetUser();
    setProfile(data);
  };

  return (
    <aside
      className={`hidden lg:flex ${widthCls} shrink-0 py-0 transition-[width] duration-400 ease-in-out [will-change:width]`}
    >
      <div
        className="sticky top-0 w-full h-[100dvh] bg-bgclr 
                        overflow-x-visible overflow-y-auto
                custom-scrollbar sidebar-glass-border
                "
      >
        {" "}
        <div className="relative flex items-center justify-center  pt-6 pb-4">
          <Image
            src="/assets/images/Logo v1.webp"
            alt="Forge Legions"
            className={
              "w-20 object-contain mr-3 ml-3"
              // collapsed
              //   ? "w-20 object-contain "
              //   : "w-40  object-contain"
            }
            fallbackSrc="/assets/images/Logo v1.webp"
          />
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
               z-50 h-8 w-8 rounded-full
               bg-white/5 glass-border
               backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,.5)]
               hover:bg-white/10 transition-all"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-white/80" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-white/80" />
            )}
          </button>
        </div>
        {/* Nav */}
        <nav className=" pt-2 pb-4 space-y-3">
          <ul className="space-y-1 ml-2">
            {/* -----------------------Individual Matches-------------------- */}
            <li>
              <button
                onClick={() => setSubindividualmenuOpen((s) => !s)}
                aria-expanded={subindividualOpen}
                aria-controls="submenu-Products"
                className="w-full text-left px-3 py-2 font-vastagoMedium text-white rounded hover:bg-gray-700 flex items-center justify-between"
              >
                <span
                  className={`flex items-center ${collapsed ? "justify-center" : ""
                    } gap-3`}
                >
                  <Image
                    src={"/assets/images/icons/Sidebar-Icon2.svg"}
                    alt={`${"Individual Matches"} icon`}
                    className="h-5 opacity-80 group-hover:opacity-100 shrink-0"
                    fallbackSrc={"/assets/images/icons/Sidebar-Icon2.svg"}
                  />
                  {!collapsed && <span>{"Individual Matches"}</span>}
                </span>
                <span className={subindividualOpen ? "rotate-180" : ""}>▾</span>
              </button>
              {subindividualOpen && (
                <ul id="submenu-Products" className="ml-4 mt-1 space-y-1">
                  <NavLink
                    key={"individual-all-matches"}
                    to={"/individual-all-matches"}
                    end
                    className={({ isActive }) =>
                      [
                        "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                        "flex items-center",
                        collapsed ? "justify-center" : "justify-between",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray hover:text-white hover:bg-white/5",
                      ].join(" ")
                    }
                    title={collapsed ? "All Matches" : undefined}
                  >
                    <span
                      className={`flex items-center ${collapsed ? "justify-center" : ""
                        } gap-3`}
                    >
                      + {!collapsed && <span>{"All Matches"}</span>}
                    </span>
                  </NavLink>

                  <NavLink
                    key={"create-individual-match"}
                    to={"/create-individual-match"}
                    end
                    className={({ isActive }) =>
                      [
                        "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                        "flex items-center",
                        collapsed ? "justify-center" : "justify-between",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray hover:text-white hover:bg-white/5",
                      ].join(" ")
                    }
                    title={collapsed ? "Create Matches" : undefined}
                  >
                    <span
                      className={`flex items-center ${collapsed ? "justify-center" : ""
                        } gap-3`}
                    >
                      +{!collapsed && <span>{"Create Matches"}</span>}
                    </span>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* -------------------------Team Matches-------------------------  */}

            <li>
              <button
                onClick={() => setSubteammenuOpen((s) => !s)}
                aria-expanded={subteamOpen}
                aria-controls="submenu-Products"
                className="w-full group text-left px-3 py-2 font-vastagoMedium text-white rounded hover:bg-gray-700 flex items-center justify-between"
              >
                <span
                  className={`flex items-center ${collapsed ? "justify-center" : ""
                    } gap-3`}
                >
                  <Image
                    src={"/assets/images/icons/Sidebar-Icon-Users.svg"}
                    alt={`${"Individual Matches"} icon`}
                    className="h-5 opacity-80 group-hover:opacity-100 shrink-0"
                    fallbackSrc={"/assets/images/icons/Sidebar-Icon2.svg"}
                  />
                  {!collapsed && <span>{"Team Matches"}</span>}
                </span>
                <span className={subteamOpen ? "rotate-180" : ""}>▾</span>
              </button>
              {subteamOpen && (
                <ul id="submenu-Products" className="ml-4 mt-1 space-y-1">
                  <NavLink
                    key={"to"}
                    to={"/team-all-matches"}
                    end
                    className={({ isActive }) =>
                      [
                        "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                        "flex items-center",
                        collapsed ? "justify-center" : "justify-between",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray hover:text-white hover:bg-white/5",
                      ].join(" ")
                    }
                    title={collapsed ? "All Matches" : undefined}
                  >
                    <span
                      className={`flex items-center ${collapsed ? "justify-center" : ""
                        } gap-3`}
                    >
                      +{!collapsed && <span>{"All Matches"}</span>}
                    </span>
                  </NavLink>

                  <NavLink
                    key={"to"}
                    to={"/create-team-matches"}
                    end
                    className={({ isActive }) =>
                      [
                        "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                        "flex items-center",
                        collapsed ? "justify-center" : "justify-between",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray hover:text-white hover:bg-white/5",
                      ].join(" ")
                    }
                    title={collapsed ? "Create Matches" : undefined}
                  >
                    <span
                      className={`flex items-center ${collapsed ? "justify-center" : ""
                        } gap-3`}
                    >
                      + {!collapsed && <span>{"Create Matches"}</span>}
                    </span>
                  </NavLink>
                </ul>
              )}
            </li>

            {/* -------------------------My Team Info-------------------------  */}

            <li>
              <button
                onClick={() => setSubmyteammenuOpen((s) => !s)}
                aria-expanded={submyteamOpen}
                aria-controls="submenu-Products"
                className="w-full text-left px-3 py-2 font-vastagoMedium text-white rounded hover:bg-gray-700 flex items-center justify-between"
              >
                <span
                  className={`flex items-center ${collapsed ? "justify-center" : ""
                    } gap-3`}
                >
                  <Image
                    src={"/assets/images/icons/Team.svg"}
                    alt={`${"Individual Matches"} icon`}
                    className="h-5 opacity-80 group-hover:opacity-100 shrink-0"
                    fallbackSrc={"/assets/images/icons/Team.svg"}
                  />
                  {!collapsed && <span>{"My Team"}</span>}
                </span>
                <span className={submyteamOpen ? "rotate-180" : ""}>▾</span>
              </button>
              {submyteamOpen && (
                <ul id="submenu-Products" className="ml-4 mt-1 space-y-1">
                  {profile?.role === "teamLeader" ? (
                    <div>
                      <NavLink
                        key={"to"}
                        to={"/team-info"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "All Matches" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Team Information"}</span>}
                        </span>
                      </NavLink>
                      <NavLink
                        key={"to"}
                        to={"/team-chat"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "All Matches" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Team Chat"}</span>}
                        </span>
                      </NavLink>
                      <NavLink
                        key={"to"}
                        to={"/teammembers"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "Team Members  " : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Team Members"}</span>}
                        </span>
                      </NavLink>
                      <NavLink
                        key={"to"}
                        to={"/join-requests"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "All Matches" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Join Request"}</span>}
                        </span>
                      </NavLink>
                    </div>
                  ) : profile?.role === "member" ? (
                    <div>
                      <NavLink
                        key={"to"}
                        to={"/join-team"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "Join Team" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Join Team"}</span>}
                        </span>
                      </NavLink>
                      <NavLink
                        key={"to"}
                        to={"/team-chat"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "All Matches" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Team Chat"}</span>}
                        </span>
                      </NavLink>
                    </div>
                  ) : (
                    <div>
                      <NavLink
                        key={"to"}
                        to={"/create-team"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "Create Team" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Create Team"}</span>}
                        </span>
                      </NavLink>

                      <NavLink
                        key={"to"}
                        to={"/join-team"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "Join Team" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Join Team"}</span>}
                        </span>
                      </NavLink>
                      <NavLink
                        key={"to"}
                        to={"/team-chat"}
                        end
                        className={({ isActive }) =>
                          [
                            "group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                            "flex items-center",
                            collapsed ? "justify-center" : "justify-between",
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-gray hover:text-white hover:bg-white/5",
                          ].join(" ")
                        }
                        title={collapsed ? "All Matches" : undefined}
                      >
                        <span
                          className={`flex items-center ${collapsed ? "justify-center" : ""
                            } gap-3`}
                        >
                          + {!collapsed && <span>{"Team Chat"}</span>}
                        </span>
                      </NavLink>
                    </div>
                  )}
                </ul>
              )}

              {nav.map(({ label, to, iconSrc, chevron }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    [
                      "ml-2 group rounded-xl px-3 py-2 text-sm transition-colors font-vastagoMedium",
                      "flex items-center",
                      collapsed ? "justify-center" : "justify-between",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray hover:text-white hover:bg-white/5",
                    ].join(" ")
                  }
                  title={collapsed ? label : undefined}
                >
                  <span
                    className={`flex items-center ${collapsed ? "justify-center" : ""
                      } gap-3`}
                  >
                    <Image
                      src={iconSrc}
                      alt={`${label} icon`}
                      className="h-5 w-auto opacity-80 group-hover:opacity-100 shrink-0"
                      fallbackSrc={iconSrc}
                    />
                    {!collapsed && <span>{label}</span>}
                  </span>

                  {!collapsed && chevron && (
                    <svg
                      className="h-4 w-4 opacity-60 group-hover:opacity-80"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </NavLink>
              ))}

              {/* Divider + Logout */}
              <div className="my-4 border-t border-white/10" />
              <button
                className={`group w-full rounded-xl px-3 py-2 text-left hover:bg-white/5 transition-colors
                       ${collapsed
                    ? "flex items-center justify-center"
                    : "flex items-center gap-3"
                  }`}
                type="button"
                title="Logout"
                onClick={handlelogout}
              >
                {!collapsed && (
                  <span className="font-vastagoMedium text-red-400">
                    Logout
                  </span>
                )}
                {collapsed && (
                  <span className="block h-2 w-2 rounded-full bg-red-400" />
                )}{" "}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
