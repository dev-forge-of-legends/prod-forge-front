import { BackgroundWrapper } from "..";

import { Outlet } from "react-router-dom";

export const BackgroundWrapperLayout = () => {
  return (
    <BackgroundWrapper>
      <Outlet />
    </BackgroundWrapper>
  );
};