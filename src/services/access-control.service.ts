interface IpApiResponse {
  ip: string;
  country: string; // Country code (e.g., "IN")
  country_name: string; // Full country name (e.g., "India")
  security?: {
    vpn: boolean;
    proxy: boolean;
    tor: boolean;
  };
}

export interface AccessCheckResult {
  isVPN: boolean;
  isAllowedCountry: boolean;
  userCountry: string;
  userCountryCode: string;
  ip: string;
}

export class AccessControlService {
  private static readonly API_ENDPOINT = "https://ipapi.co/json/";

  static async checkAccess(): Promise<AccessCheckResult> {
    try {
      const response = await fetch(this.API_ENDPOINT);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: IpApiResponse = await response.json();

      // Check if the response is valid
      if (!data.ip || !data.country) {
        throw new Error("Invalid response from IP API");
      }

      const isVPN = data.security?.vpn ?? false;
      const allowedCountries = this.getAllowedCountries();
      const isAllowedCountry = allowedCountries.includes(data.country);

      return {
        isVPN,
        isAllowedCountry,
        userCountry: data.country_name,
        userCountryCode: data.country,
        ip: data.ip,
      };
    } catch (error) {
      console.error("Access check failed:", error);

      // Fallback behavior
      return {
        isVPN: false,
        isAllowedCountry: true, // Allow access by default on error
        userCountry: "Unknown",
        userCountryCode: "Unknown",
        ip: "Unknown",
      };
    }
  }

  private static getAllowedCountries(): string[] {
    return (
      import.meta.env.VITE_ALLOWED_COUNTRIES?.split(",") || ["IN", "US", "CA"]
    );
  }

  static isVPNDetected(data: IpApiResponse): boolean {
    return data.security?.vpn ?? false;
  }

  static isCountryAllowed(countryCode: string): boolean {
    const allowedCountries = this.getAllowedCountries();
    return allowedCountries.includes(countryCode);
  }
}
