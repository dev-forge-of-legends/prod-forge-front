import { STORAGE_KEYS } from "@app-types/constants";
import { IWallet } from "@app-types/interfaces";
import { getStorageValue, setStorageValue } from "@app-utils/storageUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const storedData = getStorageValue(STORAGE_KEYS.WALLET);
const initialState: IWallet = {
  gc: storedData?.gc || 0,
  st: storedData?.st || 0,
  redeemable: storedData?.redeemable || 0,
  selectedCurrency: storedData?.selectedCurrency || "GC",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, { payload }: PayloadAction<IWallet>) => {
      state.gc = payload.gc;
      state.st = payload.st;
      state.redeemable = payload.redeemable;
      state.selectedCurrency = "GC";
      setStorageValue(STORAGE_KEYS.WALLET, state);
      return state;
    },
    clearWallet: (state) => {
      state = initialState;
      setStorageValue(STORAGE_KEYS.WALLET, state);
      return state;
    },
    updateWalletBalance: (
      state,
      { payload }: PayloadAction<Partial<IWallet>>
    ) => {
      state.gc = payload.gc ?? state.gc;
      state.st = payload.st ?? state.st;
      state.redeemable = payload.redeemable ?? state.redeemable;
      setStorageValue(STORAGE_KEYS.WALLET, state);
      return state;
    },
    toggleCurrency: (state) => {
      state.selectedCurrency =
        state.selectedCurrency === "GC" ? "ST" : "GC";
      setStorageValue(STORAGE_KEYS.WALLET, state);
      return state;
    },
    setSelectedCurrency: (state, { payload }: PayloadAction<"GC" | "ST">) => {
      console.log("selected currency update:", payload);
      state.selectedCurrency = payload;
      setStorageValue(STORAGE_KEYS.WALLET, state);
      return state;
    },
  },
});

export const {
  setWallet,
  clearWallet,
  updateWalletBalance,
  toggleCurrency,
  setSelectedCurrency
} = walletSlice.actions;

export default walletSlice.reducer;

export const selectWallet = (state: RootState) => state.wallet;
