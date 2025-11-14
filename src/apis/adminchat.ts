import { apiService } from "@services/api.service";

const apiGetMessages = async (skip: number, page: number) => {
  const response = await apiService.privateRequest(`/support-chat?skip=${skip}&page=${page}`, 'GET');
  return response.data;
}

const apiSendMessage = async (message: string) => {
  const response = await apiService.privateRequest('/support-chat', 'POST', { message });
  return response.data;
}

const apiUnreadMessageCount = async () => {
  const response = await apiService.privateRequest('/support-chat/unread-count', 'GET');
  return response.data;
}

const apiReadMessage = async (messageId: string) => {
  const response = await apiService.privateRequest(`/support-chat/read/${messageId}`, 'PUT');
  return response.data;
}

export {
  apiGetMessages, apiReadMessage, apiSendMessage, apiUnreadMessageCount
};
