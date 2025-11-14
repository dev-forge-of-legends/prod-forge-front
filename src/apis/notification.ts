import { apiService } from "@services/api.service";

const apiGetNotifications = async (skip: number = 0, count: number = 10) => {
  const response = await apiService.privateRequest(
    `/notifications?skip=${skip}&count=${count}`,
    "GET"
  );
  return response.data;
}

const apiGetUnreadCount = async () => {
  const response = await apiService.privateRequest(
    "/notifications/unread-count",
    "GET"
  );
  return response.data;
}

const apiReadNotification = async (id: string) => {
  const response = await apiService.privateRequest(
    `/notifications/read/${id}`,
    "PUT"
  );
  return response.data;
}

export {
  apiGetNotifications,
  apiGetUnreadCount,
  apiReadNotification
};