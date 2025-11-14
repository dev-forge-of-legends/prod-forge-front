import { apiService } from "@services/api.service";

export const createInquiry = async (data: any) => {
  const res = await apiService.publicRequest(`/users/kyc/create-inquiry`, "POST", data);

  return res.data
}

export const isUserVerified = async () => {
  const res = await apiService.publicRequest('/users/kyc/status');

  return res.data
}


export const refreshKyc = async () => {
  const res = await apiService.publicRequest('/users/kyc/refresh', "POST");

  return res.data
}