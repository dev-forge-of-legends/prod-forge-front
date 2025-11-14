import { apiService } from "@services/api.service";

const apiCreateReferralLink = async () => {
  const response = await apiService.privateRequest("/users/referral-links", "POST");
  return response.data;
};

const apiGetRefferalLinks = async () => {
  const response = await apiService.privateRequest("/users/referral-links", "GET");
  return response.data;
};

const apiGetRefferalEarning = async () => {
  const response = await apiService.privateRequest("/users/referral-earning", "GET");
  return response.data;
};

const apiGetRefferals = async () => {
  const response = await apiService.privateRequest("/users/referrals", "GET");
  return response.data;
};

export {
  apiCreateReferralLink, apiGetRefferalEarning, apiGetRefferalLinks, apiGetRefferals
};
