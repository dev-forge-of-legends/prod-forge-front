import { updateUser } from "@redux/slices/user.slice";
import { updateWalletBalance } from "@redux/slices/wallet.slice";
import { store } from "@redux/store";
import { apiService } from "@services/api.service";

const apiGetUser = async () => {
  const response = await apiService.privateRequest("/users/me", "GET");
  store.dispatch(updateUser(response.data));
  return response.data;
};

const apiUpdateUser = async(email: string, userName:string) => {
  const res =  await apiService.publicRequest("/users", "PUT", {email, userName});
  return res.data;
}

const apiGetUsers = async (search: string) => {
  const searchParams = new URLSearchParams();
  searchParams.set("name", search);
  const response = await apiService.privateRequest(
    `/users?${searchParams.toString()}`,
    "GET"
  );
  return response.data;
};

const apiGetWallet = async () => {
  const response = await apiService.privateRequest("/users/wallet", "GET");
  store.dispatch(updateWalletBalance(response.data));
  return response.data;
};

const apiGetRedeemableAmount = async () => {
  const response = await apiService.privateRequest(
    "/users/redeemable-amount",
    "GET"
  );
  return response.data;
};

const apiGetRolloverDetails = async () => {
  const response = await apiService.privateRequest(
    "/users/rollover-details",
    "GET"
  );
  return response.data;
};

const apiGetSpendingLimits = async () => {
  const response = await apiService.privateRequest(
    "/users/spending-limits",
    "GET"
  );
  return response.data;
};

const apiUpdateSpendingLimit = async (data: {
  period: string;
  limit: number;
}) => {
  const response = await apiService.privateRequest(
    "/users/spending-limits",
    "PUT",
    data
  );
  return response.data;
};

const apiChangePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const res = await apiService.publicRequest(
    "/users/change-password",
    "POST",
    data
  );
  return res.data;
};

const apiGetActivity = async () => {
  const res = await apiService.publicRequest("/users/activity-reminder");
  return res.data;
};

const apiUpdateActivityStatus = async (data: any) => {
  const res = await apiService.publicRequest(
    "/users/activity-reminder",
    "PUT",
    data
  );
  return res.data;
};

const apiGetSelfExclusion = async () => {
  const res = await apiService.publicRequest("/users/self-exclusion");
  return res.data;
};

const apiUpdateSelfExclusion = async (data: any) => {
  const res = await apiService.publicRequest(
    "/users/self-exclusion",
    "PUT",
    data
  );
  return res.data;
};

const apiDeactivateAccount = async () => {
  const res = await apiService.publicRequest(
    "/users/deactivate-account",
    "POST"
  );
  return res.data;
};

const apiGetVipLevel = async () => {
  const res = await apiService.publicRequest(
    "/users/vip-level"
  );
  return res.data;
}

export {
  apiChangePassword, apiDeactivateAccount, apiGetActivity, apiGetRedeemableAmount, apiUpdateUser,
  apiGetRolloverDetails, apiGetSelfExclusion, apiGetSpendingLimits, apiGetUser, apiGetUsers, apiGetVipLevel, apiGetWallet, apiUpdateActivityStatus, apiUpdateSelfExclusion, apiUpdateSpendingLimit
};

