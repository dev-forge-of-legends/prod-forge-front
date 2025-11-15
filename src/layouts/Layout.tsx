// import React from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Sidebar from "@components/organisms/sidebar/Sidebar";
// import { Footer } from "@components/organisms/footer/Footer";
// import BackgroundWrapper from "@components/atoms/BackgroundWrapper/BackgroundWrapper";

// import { Header } from "@components/organisms/header";

// const DashboardLayout: React.FC = () => {
//   const { pathname } = useLocation();
//   if (pathname.startsWith("/gamesplay")) return <Outlet />;

//   return (
//     <BackgroundWrapper>
//       <div className="min-h-screen flex">

//         <Sidebar />

//         <div className="flex-1 min-w-0 flex flex-col">
//           <div className="sticky top-0 z-40 bg-[#00000066] backdrop-blur-md border-b border-white/10">
//             <div className="mx-auto  w-full">
//               <Header />
//             </div>
//           </div>
//           <div className="flex-1">
//             <div className="flex-1 w-full  ">
//               <Outlet />
//             </div>
//           </div>

//           <div className="mt-auto">
//             <Footer />
//           </div>
//         </div>
//       </div>
//     </BackgroundWrapper>
//   );
// };

// export default DashboardLayout;

import { Sidebar as DesktopSidebar } from "@components/organisms/sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import { Footer } from "@components/organisms/footer/Footer";
import { BackgroundWrapper } from "@components/atoms/BackgroundWrapper/BackgroundWrapper";
import { Header } from "@components/organisms/header";

import { MobileSidebarDrawer } from "@components/organisms/sidebar/MobileSidebarDrawer";
import { Menu, X } from "lucide-react";

const DashboardLayout: React.FC = () => {
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("sidebar:collapsed") === "1";
  });
  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/gamesplay")) return <Outlet />;

  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex">
        {/* LEFT: Sidebar */}
        <DesktopSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
        />

        {/* RIGHT: Header + Content + Footer */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="sticky top-0 z-40 bg-[#00000066] backdrop-blur-md border-b border-white/10">
            <div className="mx-auto w-full">
              <Header />
            </div>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden fixed left-3 top-3 z-[70] h-10 w-10 rounded-full
                       bg-white/10 backdrop-blur-md shadow
                       border border-white/15 flex items-center justify-center"
          >
            <Menu className="h-5 w-5 text-white/90" />
          </button>
          {/* Mobile Drawer Overlay - absolute, content shift nahi hoga */}
          <div
            className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200
                       ${mobileOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
              }`}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div
              className={`absolute left-0 top-0 h-[100dvh] w-[260px]
                          bg-bgclr sidebar-glass-border
                          transition-transform duration-300 ease-in-out
                          ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
              {/* Close btn inside drawer */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 z-[61] h-9 w-9 rounded-full
                           bg-white/10 border border-white/15 flex items-center justify-center"
              >
                <X className="h-5 w-5 text-white/90" />
              </button>
              <MobileSidebarDrawer onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>

          <div className="flex-1">
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          {/* <div className="mt-auto">
            <Footer />
          </div> */}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default DashboardLayout;
