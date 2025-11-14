import { apiRefreshToken } from "@apis/auth";
import {
  clearExpiredToken,
  logoutUser,
  updateTokens
} from "@redux/slices/user.slice";
import { store } from "@redux/store";

export class AuthService {
  // Get current access token
  static getAccessToken(): string | null {
    const state = store.getState();
    return state.user.accessToken;
  }

  // Set access token
  static setAccessToken(accessToken: string): void {
    if (accessToken) return;

    store.dispatch(
      updateTokens({
        accessToken: accessToken,
      })
    );
  }

  // Get current refresh token
  static getRefreshToken(): string | null {
    const state = store.getState();
    return state.user.refreshToken;
  }

  // Check if user is authenticated with valid token
  static isAuthenticated(): boolean {
    const state = store.getState();
    return state.user.isAuthenticated && !!state.user.accessToken;
  }

  // Check if token is expired - disabled (no expiry tracking on frontend)
  static isTokenExpired(): boolean {
    return false; // Tokens don't expire on frontend, only backend validates
  }

  // Get time until token expires (in minutes) - disabled (no expiry tracking)
  static getTimeUntilExpiry(): number {
    return Infinity; // Tokens don't expire on frontend
  }

  // Refresh access token using refresh token
  static async refreshAccessToken(): Promise<boolean> {
    try {
      const refreshToken = AuthService.getRefreshToken();

      if (!refreshToken) {
        console.warn("No refresh token available");
        store.dispatch(logoutUser());
        return false;
      }

      // Call your refresh token API endpoint
      const response = await apiRefreshToken(refreshToken);

      if (!response.ok) {
        // Token refresh failed
        console.error("Token refresh failed");
        store.dispatch(logoutUser());
        return false;
      }

      const data = await response.json();

      // Update tokens in store
      store.dispatch(
        updateTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken, 
          expiresIn: data.expiresIn,
        })
      );

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      store.dispatch(clearExpiredToken());
      return false;
    }
  }

  // Auto-refresh token before it expires - disabled (no expiry tracking)
  static startTokenRefreshTimer(): void {
    // Token refresh timer disabled - tokens don't expire on frontend
    // Only backend 401 responses will trigger token refresh/logout
    console.log("Token refresh timer is disabled - relying on backend validation");
  }

  // Clear all tokens and logout
  static logout(): void {
    store.dispatch(logoutUser());
    window.location.href = "/?login=true"; // Redirect to login
  }

  // Get authorization header for API requests
  static getAuthHeader(): { Authorization?: string } {
    const token = AuthService.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// Auto-start token refresh timer when module loads
if (typeof window !== 'undefined') {
    // AuthService.startTokenRefreshTimer();
}
