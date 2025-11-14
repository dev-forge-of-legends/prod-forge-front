import { apiService } from "@services/api.service";

const apiCheckRewardAvailable = async() => {
  const response = await apiService.publicRequest('/achievement/checkRewardAvailable', 'PUT');
  return response.data;
}

const apiGetClaimedReward = async() => {
  const response = await apiService.publicRequest('/achievement/getClaimedReward', 'GET');
  return response.data;
}

const apiPutClaimedRewardToUser = async(id: string) => {
  const response = await apiService.publicRequest(`/achievement/putClaimedRewardToUser/${id}`, 'PUT', id);
  return response.data;
}

export {
  apiCheckRewardAvailable,
  apiGetClaimedReward,
  apiPutClaimedRewardToUser
}