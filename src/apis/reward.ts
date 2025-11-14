import { apiService } from "@services/api.service";

const apiGetIsBonusReceivedById = async () => {
  const response = await apiService.publicRequest(
    "/dailybonus/dailybonus/getIsBonusReceivedById",
    "GET"
  );
  return response.data;
};

const apiGetRollXpCoins = async () => {
  const response = await apiService.publicRequest(
    "/dailybonus/dailybonus/getRollXpCoins",
    "GET"
  );
  return response.data;
};

const apiPostBonusClaimed = async () => {
  const response = await apiService.publicRequest(
    "/dailybonus/dailybonus/postBonusClaimed",
    "PUT"
  );
  return response.data;
};

const apiGetRolledState = async () => {
  const response = await apiService.publicRequest(
    '/dailybonus/dailybonus/getRolledState', 'PUT'
  );
  return response.data;
}

const apiGetXPCoins = async () => {
  const response = await apiService.publicRequest(
    'dailybonus/dailybonus/getXpCoins', 'GET'
  )
  return response.data;
}

export { apiGetIsBonusReceivedById, apiGetRollXpCoins, apiPostBonusClaimed, apiGetRolledState, apiGetXPCoins };
