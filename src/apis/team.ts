import { apiService } from "@services/api.service";

const apiTest = async () => {
  const response = await apiService.publicRequest("/", "GET");
  return response.data;
};

const apiCreateTeam = async (name: string, members: string[]) => {
  const response = await apiService.publicRequest("/teams", "POST", {
    name,
    members,
  });
  return response.data;
};

// const apiCreateTeam = async (data:any) => {
//   const response = await apiService.publicRequest("/teams", "POST", {data});
//   return response.data;
// };

const apiGetTeam = async (teamId: string, populate: boolean) => {
  const response = await apiService.publicRequest(
    `/teams/${teamId}?populate=${populate}`,
    "GET",
    { teamId, populate }
  );
  return response.data;
};

const apiUpdateTeam = async (teamId: string) => {
  const response = await apiService.publicRequest(
    `/teams/${teamId}`,
    "PUT",
    teamId
  );
  return response.data;
};

const apiDeleteTeam = async (teamId: string) => {
  const response = await apiService.publicRequest(
    `/teams/${teamId}`,
    "DELETE",
    teamId
  );
  return response.data;
};

const apiGetTeamJoinRequests = async () => {
  const response = await apiService.publicRequest(
    `team-join/my-requests`,
    "GET"
  );
  return response.data;
};

const apiJoinRequest = async (teamId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${teamId}`,
    "POST",
    teamId
  );
  return response.data;
};

const apiGetJoinRequest = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${userId}`,
    "GET",
    userId
  );
  return response.data;
};

const apiDeleteJoinRequest = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${userId}`,
    "DELETE",
    userId
  );
  return response.data;
};

const apiGetJoinRequestByTeam = async (teamId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/team/${teamId}`,
    "GET",
    teamId
  );
  return response.data;
};

const apiGetJoinRequestByUser = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/user/${userId}`,
    "GET",
    userId
  );
  return response.data;
};

const apiAcceptJoinRequest = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${userId}/accept`,
    "POST",
    userId
  );
  return response.data;
};

const apiRejectJoinRequest = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${userId}/reject`,
    "POST",
    userId
  );
  return response.data;
};

const apiCancelJoinRequest = async (userId: string) => {
  const response = await apiService.publicRequest(
    `/team-join/${userId}/cancel`,
    "POST",
    userId
  );
  return response.data;
};

const apiGetTeams = async (
  skip: number,
  count: number,
  search: string,
  populate: boolean
) => {
  const response = await apiService.privateRequest(
    `/teams?skip=${skip}&count=${count}&name=${search}&populate=${populate}`,
    "GET"
  );
  return response.data;
};

const apiGetChatRooms = async () => {
  const response = await apiService.publicRequest(`chat/rooms`, "GET");
  return response.data;
};

const apiGetMatchChatRoom = async (teamId: string, matchId: string) => {
  const response = await apiService.publicRequest(
    `/chat/matchroom/${teamId}/${matchId}`,
    "GET"
  );
  return response.data;
};

const apiGetSupportChatRoom = async () => {
  const response = await apiService.publicRequest(`/support-chat`, "GET");
  return response.data;
};

const apiSendMessageToSupport = async (message: string) => {
  const response = await apiService.publicRequest(`/support-chat`, "POST", {
    message,
  });
  return response.data;
};

const apiGetSupportChatUnreadCount = async () => {
  const response = await apiService.publicRequest(
    `/support-chat/unread-count`,
    "GET"
  );
  return response.data;
};

const apiMarkSupportMessageAsRead = async (chatId: string) => {
  const response = await apiService.publicRequest(
    `/support-chat/read/${chatId}`,
    "PUT",
    chatId
  );
  return response.data;
};

const apiGetRoomMembers = async (roomId: string) => {
  const response = await apiService.publicRequest(
    `/chat/rooms/${roomId}/members`,
    "GET",
    roomId
  );
  return response.data;
};

const apiAddMemberToRoom = async (roomId: string) => {
  const response = await apiService.publicRequest(
    `/chat/rooms/${roomId}/members`,
    "POST",
    roomId
  );
  return response.data;
};

const apiRemoveMemberFromRoom = async (roomId: string, userId: string) => {
  const response = await apiService.publicRequest(
    `/chat/rooms/${roomId}/members/${userId}`,
    "DELETE",
    { roomId, userId }
  );
  return response.data;
};

const apiSendMessageToRoom = async (roomId: string, content: string) => {
  const response = await apiService.publicRequest(
    `chat/rooms/${roomId}/messages`,
    "POST",
    { roomId, content }
  );
  return response.data;
};

const apiMessagesInRoom = async (
  roomId: string,
  skip: number,
  count: number
) => {
  // const apiMessagesInRoom = async(roomId: string) => {
  const response = await apiService.publicRequest(
    `chat/rooms/${roomId}/messages?skip=${skip}&count=${count}`,
    // `chat/rooms/${roomId}/messages`,
    "GET",
    roomId
  );
  return response.data;
};

const apiMarkMessageAsRead = async (messageId: string) => {
  const response = await apiService.publicRequest(
    `chat/messages/${messageId}/read`,
    "PUT",
    messageId
  );
  return response.data;
};

const apiGetUnreadMessageCount = async (roomId: string) => {
  const response = await apiService.publicRequest(
    `chat/rooms/${roomId}/unread-count`,
    "GET",
    roomId
  );
  return response.data;
};

export {
  apiTest,
  apiCreateTeam,
  apiGetTeam,
  apiUpdateTeam,
  apiDeleteTeam,
  apiGetTeams,
};
export {
  apiJoinRequest,
  apiGetJoinRequest,
  apiDeleteJoinRequest,
  apiGetJoinRequestByTeam,
  apiGetJoinRequestByUser,
  apiAcceptJoinRequest,
  apiRejectJoinRequest,
  apiCancelJoinRequest,
  apiGetTeamJoinRequests,
  apiGetMatchChatRoom,
  apiGetSupportChatRoom,
  apiGetSupportChatUnreadCount,
  apiMarkSupportMessageAsRead,
  apiSendMessageToSupport,
};

export {
  apiGetChatRooms,
  apiGetRoomMembers,
  apiAddMemberToRoom,
  apiRemoveMemberFromRoom,
  apiSendMessageToRoom,
  apiMessagesInRoom,
  apiGetUnreadMessageCount,
  apiMarkMessageAsRead,
};
