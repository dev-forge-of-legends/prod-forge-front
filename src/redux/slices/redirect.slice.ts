import { STORAGE_KEYS } from "@app-types/constants";
import { getStorageValue, removeStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedData = getStorageValue(STORAGE_KEYS.REDIRECT);
const initialState = {
  loginRedirectUrl: storedData?.loginRedirectUrl || null,
  isRedirecting: storedData?.isRedirecting || false,
};

export const redirectSlice = createSlice({
  name: "redirect",
  initialState,
  reducers: {
    setLoginRedirectUrl: (state, { payload }: PayloadAction<string | null>) => {
      state.loginRedirectUrl = payload;
      setStorageValue(STORAGE_KEYS.REDIRECT, state);
      return state;
    },
    setIsRedirecting: (state, { payload }: PayloadAction<boolean>) => {
      state.isRedirecting = payload;
      setStorageValue(STORAGE_KEYS.REDIRECT, state);
      return state;
    },
    clearRedirect: (state) => {
      state.loginRedirectUrl = null;
      state.isRedirecting = false;
      removeStorageValue(STORAGE_KEYS.REDIRECT);
      return state;
    },
  },
});

export const {
  setLoginRedirectUrl,
  setIsRedirecting,
  clearRedirect,
} = redirectSlice.actions;

export default redirectSlice.reducer;