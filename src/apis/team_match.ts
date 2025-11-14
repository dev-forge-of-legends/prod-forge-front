import { apiService } from "@services/api.service";

const apiCreateTeamMatch = async (data: any) => {
  const response = await apiService.privateRequest(
    "/team-matches",
    "POST",
    data
  );
  return response.data;
};

const apiGetPublicTeamMatches = async () => {
  const response = await apiService.privateRequest(
    "/team-matches",
    "GET"
  );
  return response.data;
};

const apiGetInvitedTeamMatches = async () => {
  const response = await apiService.privateRequest(
    "/team-matches/invited",
    "GET"
  );
  return response.data;
};

const apiGetCreatedTeamMatches = async () => {
  const response = await apiService.privateRequest(
    "/team-matches/my-team",
    "GET"
  );
  return response.data;
};

const apiGetTeamMatchesById = async (team_id:string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${team_id}`,
    "GET"
  );
  return response.data;
};


const apiJoinTeamMatches = async (id_data: string, data: any) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/teams/join`,
    "POST",
    data
  );
  return response.data;
};

const apiLeaveTeamMatches = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/teams/leave`,
    "POST"
  );
  return response.data;
};

const apiReadyTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/teams/ready`,
    "POST"
  );
  return response.data;
};

const apiNotReadyTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/teams/unready`,
    "POST"
  );
  return response.data;
};

const apiMemberJoinTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/members/join`,
    "POST"
  );
  return response.data;
};

const apiMemberLeaveTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/members/leave`,
    "POST"
  );
  return response.data;
};

const apiStartTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/start`,
    "POST"
  );
  return response.data;
};
const apiCancelTeamMatch = async (id_data: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${id_data}/cancel`,
    "POST"
  );
  return response.data;
};
const apiRollDice = async (matchId: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${matchId}/play/roll`,
    "POST"
  )
  return response.data;
};
const apiVotePawn = async (matchId: string, pawnId: string) => {
  const response = await apiService.privateRequest(
    `/team-matches/${matchId}/play/vote`,
    "POST",
    { pawnId }
  )
  return response.data;
};
export {
  apiCancelTeamMatch, apiCreateTeamMatch, apiGetCreatedTeamMatches, apiGetInvitedTeamMatches, apiGetPublicTeamMatches, apiGetTeamMatchesById,
  apiJoinTeamMatches, apiLeaveTeamMatches, apiMemberJoinTeamMatch, apiMemberLeaveTeamMatch, apiNotReadyTeamMatch,
  apiReadyTeamMatch, apiRollDice, apiStartTeamMatch, apiVotePawn
};

