import { apiService } from "@services/api.service";

const apiCheckDailyStatus = async () => {
  const res = await apiService.privateRequest('/rewards/daily-wheel/check-status', "POST");
  return res.data;
}

const apiSpinRiskWheel = async (data: { clientSeed: string }) => {
  const res = await apiService.privateRequest('/rewards/daily-wheel/spin-risk-wheel', "POST", data);
  return res.data;
}

const apiSpinWheel = async (data: {clientSeed: string}) => {
  const res = await apiService.privateRequest('/rewards/daily-wheel/spin-wheel', "POST", data);
  return res.data;
}

export {
  apiCheckDailyStatus, apiSpinRiskWheel,
  apiSpinWheel
};
