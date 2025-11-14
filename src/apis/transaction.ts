import { apiService } from "@services/api.service";

const apiTransactionHistory = async ({
  skip,
  count,
  type = "",
}: {
  skip: number;
  count: number;
  type?: string;
}) => {
  const response = await apiService.publicRequest(
    `/transactions?skip=${skip}&count=${count}&type=${type}`,
    "GET"
  );
  return response.data;
};

export { apiTransactionHistory };
