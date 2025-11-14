import { useState, useEffect } from "react";
import {
  AccessControlService,
  AccessCheckResult,
} from "@services/access-control.service";

interface UseAccessCheckResult {
  isVPN: boolean | null;
  isAllowedCountry: boolean | null;
  isLoading: boolean;
  error: string | null;
  userCountry: string | null;
  userCountryCode: string | null;
  ip: string | null;
}

export const useAccessCheck = (): UseAccessCheckResult => {
  const [accessData, setAccessData] = useState<AccessCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await AccessControlService.checkAccess();
        setAccessData(result);
      } catch (err) {
        console.error("Access check failed:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");

        // Fallback values
        setAccessData({
          isVPN: false,
          isAllowedCountry: true,
          userCountry: "Unknown",
          userCountryCode: "Unknown",
          ip: "Unknown",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, []);

  return {
    isVPN: accessData?.isVPN ?? null,
    isAllowedCountry: accessData?.isAllowedCountry ?? null,
    isLoading,
    error,
    userCountry: accessData?.userCountry ?? null,
    userCountryCode: accessData?.userCountryCode ?? null,
    ip: accessData?.ip ?? null,
  };
};
