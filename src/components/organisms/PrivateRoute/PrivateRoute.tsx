import { PageLoader } from "@components/atoms/Loader/PageLoader";
import { setLoginRedirectUrl } from "@redux/slices/redirect.slice";
import { useAppSelector } from "@redux/store";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authenticated = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!authenticated) {
      // Preserve the current location (including search params) for redirect after login
      const currentPath = location.pathname + location.search;
      dispatch(setLoginRedirectUrl(encodeURIComponent(currentPath)));

      // Navigate to login
      navigate(`/?login=true`);
    }
  }, [authenticated, navigate, location, dispatch]);

  // Show loader while redirecting to login
  if (!authenticated) {
    return <PageLoader />;
  }

  return authenticated ? <>{children}</> : <Navigate to={`/?login=true`} replace />;
};