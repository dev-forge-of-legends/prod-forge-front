import { apiService } from "@services/api.service";

const apiCreateIndividualMatch = async (data: any) => {
  const response = await apiService.privateRequest(
    "/individual-matches",
    "POST",
    data
  );
  return response.data;
};

const apiGetIndividualMatches = async () => {
  const response = await apiService.privateRequest(
    "/individual-matches",
    "GET"
  );
  return response.data;
};

const apiGetIndividualInvitedMatches = async () => {
  const response = await apiService.privateRequest(
    "/individual-matches/invited",
    "GET"
  );
  return response.data;
};

const apiGetIndividualCreatedMatches = async () => {
  const response = await apiService.privateRequest(
    "/individual-matches/my-matches",
    "GET"
  );
  return response.data;
};

const apiGetIndividualIdMatches = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/individual-matches/${id_data}`,
    "GET"
  );
  return response.data;
};

const apiJoinIndividualMatches = async (id_data: string, data: any) => {
  const response = await apiService.privateRequest(
    `/individual-matches/${id_data}/join`,
    "POST",
    data
  );
  return response.data;
};

const apiStartMatch = async (id_data: string) => {
  const res = await apiService.privateRequest(
    `/individual-matches/${id_data}/start`,
    "POST"
  );
  return res.data;
};

const apiRollDice = async (matchId: string) => {
  await apiService.privateRequest(
    `/individual-matches/${matchId}/roll`,
    "POST"
  );
};

const apiMovePawn = async (matchId: string, pawnId: string) => {
  await apiService.privateRequest(
    `/individual-matches/${matchId}/move/${pawnId}`,
    "POST"
  );
};

const apiReadyMatch = async (id_data: string) => {
  const res = await apiService.privateRequest(
    `/individual-matches/${id_data}/ready`,
    "POST"
  );
  return res.data;
};

const apiNotReadyMatch = async (id_data: string) => {
  const res = await apiService.privateRequest(
    `/individual-matches/${id_data}/not-ready`,
    "POST"
  );
  return res.data;
};

const apiPlayerOutMatch = async (id_data: string) => {
  const res = await apiService.privateRequest(
    `/individual-matches/${id_data}/leave`,
    "POST"
  );
  return res.data;
};
export {
  apiCreateIndividualMatch,
  apiGetIndividualCreatedMatches,
  apiGetIndividualIdMatches,
  apiGetIndividualInvitedMatches,
  apiGetIndividualMatches,
  apiJoinIndividualMatches,
  apiMovePawn,
  apiNotReadyMatch,
  apiReadyMatch,
  apiRollDice,
  apiStartMatch,
  apiPlayerOutMatch,  
};