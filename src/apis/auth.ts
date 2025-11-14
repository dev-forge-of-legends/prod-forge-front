import { apiService } from "@services/api.service";
import { store } from "@redux/store";
import { loginUser, logoutUser } from "@redux/slices/user.slice";
import { setIsRedirecting } from "@redux/slices/redirect.slice";
import socketService from "@services/socket.service";

const apiTest = async () => {
  const response = await apiService.publicRequest("/", "GET");
  return response.data;
};

const apiLogin = async (data: { email: string; password: string }) => {
  const response = await apiService.publicRequest(
    "/auth/login-with-email",
    "POST",
    data
  );

  store.dispatch(
    loginUser({
      user: {},
      accessToken: response.data.accessToken,
      expiresIn: response.data.expiresIn || 3600, // Default 1 hour
    })
  );

  // Clear redirecting state after successful login
  store.dispatch(setIsRedirecting(false));

  await socketService.connect(response.data.accessToken);

  await socketService.emit("ping", {});

  return response.data;
};

const apiSignup = async (data: any) => {
  try {
    const response = await apiService.publicRequest(
      "/auth/sign-up",
      "POST",
      data
    );

    // If signup successful and includes login data, update Redux store
    if (response.data.accessToken) {
      store.dispatch(
        loginUser({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn || 3600,
        })
      );

      // Clear redirecting state after successful signup/login
      store.dispatch(setIsRedirecting(false));
    }

    return {
      ...response.data,
      statusCode: response.status,
    };
  } catch (error: any) {
    console.error("Signup error:", error);
    if (error.message && error.statusCode) {
      return {
        message: error.message || "An error occurred.",
        statusCode: error.statusCode || 500,
      };
    } else {
      return {
        message: "Network error. Please try again.",
        statusCode: 500,
      };
    }
  }
};

const apiForgotPassword = async (email: string) => {
  const response = await apiService.publicRequest(
    "/auth/forgot-password",
    "POST",
    { email }
  );
  return response.data;
};

const apiResetPassword = async (data: {
  token: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await apiService.publicRequest(
    "/auth/reset-password",
    "POST",
    data
  );
  return response.data;
};

const apiLogout = async () => {
  store.dispatch(logoutUser());
  socketService.disconnect();
};

const apiRefreshToken = async (refreshToken: string) => {
  const response = await apiService.publicRequest("/auth/refresh", "POST", {
    refreshToken,
  });
  return response.data;
};

const apiGoogleLogin = async (
  idToken: string | undefined,
  referalCode: string | undefined,
  adsBy: string | undefined
) => {
  const response = await apiService.publicRequest(
    "/auth/login-with-google",
    "POST",
    { idToken, referalCode, adsBy }
  );
  const { user } = response.data;
  const userData = { ...user, avatar: response.data.socialAuth.profilePicture };
  store.dispatch(
    loginUser({
      user: userData,
      accessToken: response.data.accessToken,
      expiresIn: response.data.expiresIn || 3600, // Default 1 hour
    })
  );

  await socketService.connect(response.data.accessToken);

  await socketService.emit("ping", {});

  return response.data;
};

const apiFacebookLogin = async (
  accessToken: string | undefined,
  referalCode: string | undefined,
  adsBy: string | undefined
) => {
  const response = await apiService.publicRequest(
    "/auth/login-with-facebook",
    "POST",
    { accessToken, referalCode, adsBy }
  );
  const { user } = response.data;
  const userData = { ...user, avatar: response.data.socialAuth.profilePicture };
  store.dispatch(
    loginUser({
      user: userData,
      accessToken: response.data.accessToken,
      expiresIn: response.data.expiresIn || 3600, // Default 1 hour
    })
  );

  await socketService.connect(response.data.accessToken);

  await socketService.emit("ping", {});

  return response.data;
};

export {
  apiTest,
  apiLogin,
  apiSignup,
  apiForgotPassword,
  apiResetPassword,
  apiLogout,
  apiRefreshToken,
  apiGoogleLogin,
  apiFacebookLogin,
};
