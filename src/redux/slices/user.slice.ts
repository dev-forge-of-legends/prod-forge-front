import { DEFAULT_AVATAR_URL, STORAGE_KEYS } from "@app-types/constants";
import { getStorageValue, removeStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { getValidImageUrl } from "@app-utils/stringUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const isTokenExpiredCheck = (expiry: number | null): boolean => {
  if (!expiry) return true;
  return Date.now() >= expiry * 1000;
};

export interface IUserState {
  id: number;
  userName: string;
  email: string;
  role: string;
  avatar: string;
  teamId?: string;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
}

const userData = getStorageValue(STORAGE_KEYS.USER);
const storedAccessToken = getStorageValue("accessToken");
const storedRefreshToken = getStorageValue("refreshToken");

const initialState: IUserState = {
  id: userData.id || -1,
  email: userData.email || "",
  role: userData.role || "",
  avatar:
    userData.avatar ||
    getValidImageUrl(DEFAULT_AVATAR_URL),
  isAuthenticated: !!storedAccessToken,
  accessToken: storedAccessToken,
  refreshToken: storedRefreshToken,
  tokenExpiry: null,
  userName: userData.userName || "",
  teamId: userData.teamId || undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
      state,
      {
        payload,
      }: PayloadAction<{
        user: Partial<IUserState>;
        accessToken: string;
        refreshToken?: string;
        expiresIn?: number;
      }>
    ) => {
      const { user, accessToken, refreshToken } = payload;

      if (user) {
        state.id = user.id ?? state.id;
        state.userName = user.userName ?? "";
        state.email = user.email ?? "";
        state.role = user.role ?? "";
        state.avatar =
          user.avatar ??
          getValidImageUrl(DEFAULT_AVATAR_URL);
        state.teamId = user.teamId ?? state.teamId;
      }

      state.accessToken = accessToken;
      state.refreshToken = refreshToken || null;
      state.isAuthenticated = true;
      state.tokenExpiry = null;

      setStorageValue("accessToken", accessToken);
      if (refreshToken) {
        setStorageValue("refreshToken", refreshToken);
      }
      removeStorageValue("tokenExpiry");
    },

    updateTokens: (
      state,
      {
        payload,
      }: PayloadAction<{
        accessToken: string;
        refreshToken?: string;
        expiresIn?: number;
      }>
    ) => {
      const { accessToken, refreshToken } = payload;

      state.accessToken = accessToken;
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
      state.tokenExpiry = null;
      state.isAuthenticated = true;
      setStorageValue("isAuthenticated", true);
      setStorageValue("accessToken", accessToken);
      if (refreshToken) {
        setStorageValue("refreshToken", refreshToken);
      }
      removeStorageValue("tokenExpiry");
    },

    updateUser: (state, { payload }: PayloadAction<Partial<IUserState>>) => {
      state.id = payload.id ?? state.id;
      state.userName = payload.userName ?? state.userName;
      state.email = payload.email ?? state.email;
      state.role = payload.role ?? state.role;
      state.avatar = payload.avatar ?? state.avatar;
      state.teamId = payload.teamId ?? state.teamId;
    },

    updateUserAvatar: (state, { payload }: PayloadAction<string>) => {
      state.avatar = payload;
    },

    logoutUser: () => {
      removeStorageValue("user");
      removeStorageValue("accessToken");
      removeStorageValue("refreshToken");
      removeStorageValue("tokenExpiry");
      removeStorageValue("userdata");

      return {
        id: -1,
        userName: "",
        email: "",
        role: "",
        avatar:
          getValidImageUrl(DEFAULT_AVATAR_URL),
        teamId: undefined,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        tokenExpiry: null,
      };
    },

    checkTokenExpiry: (state) => {
      if (state.tokenExpiry && isTokenExpiredCheck(state.tokenExpiry)) {
        state.isAuthenticated = false;
        state.accessToken = null;
        removeStorageValue("accessToken");
      }
    },

    clearExpiredToken: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiry = null;

      removeStorageValue("accessToken");
      removeStorageValue("refreshToken");
      removeStorageValue("tokenExpiry");
    },
  },
});

export const {
  loginUser,
  updateTokens,
  updateUser,
  updateUserAvatar,
  logoutUser,
  checkTokenExpiry,
  clearExpiredToken,
} = userSlice.actions;

export default userSlice.reducer;
