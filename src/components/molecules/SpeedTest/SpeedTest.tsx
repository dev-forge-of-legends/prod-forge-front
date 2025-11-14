import { getStorageValue } from "@app-utils/storageUtils";
import { AnimatePing } from "@components/atoms/AnimatePing/AnimatePing";
import * as Tooltip from "@radix-ui/react-tooltip";
import { logoutUser } from "@redux/slices/user.slice";
import { updateWalletBalance } from "@redux/slices/wallet.slice";
import { store, useAppSelector } from "@redux/store";
import socketService from "@services/socket.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ISpeedTestProps {
  className?: string;
}
export const SpeedTest = ({ className }: ISpeedTestProps) => {
  const [pingTime, setPingTime] = useState<number | null>(null);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const accessToken = getStorageValue("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      socketService.handleAuthChange(accessToken);
    } else {
      socketService.disconnect();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socketService.isConnected()) {
        const handlePong = (data: any) => {
          const end = performance.now();
          const timeTaken = end - data.start;
          setPingTime(timeTaken);
          // setConnectionStatus('Connected');
        };

        const start = performance.now();
        socketService.emit("ping", { start: start });
        socketService.addEventHandler("pong", handlePong);
      } else {
        setPingTime(null);
        socketService.connect(accessToken);
        // setConnectionStatus('Socket is not connected.');
      }
    }, 3000);

    socketService.addEventHandler("auto-logout", handleAutoLogout);
    socketService.addEventHandler("walletUpdated", handleWalletUpdateEvent);
    return () => {
      clearInterval(interval);
      socketService.removeEventHandler("auto-logout", handleAutoLogout);
      socketService.removeEventHandler(
        "walletUpdated",
        handleWalletUpdateEvent
      );
    };
  }, []);

  const handleAutoLogout = () => {
    setPingTime(null);
    toast.success(
      "You have been logged out due to access from another device.",
      {
        duration: 5000,
      }
    );
    store.dispatch(logoutUser());
  };

  const handleWalletUpdateEvent = (data: any) => {
    store.dispatch(updateWalletBalance(data));
  };

  return (
    <div className={`block cursor-pointer text-md text-right ${className}`}>
      {pingTime === null ? (
        <div className="items-right">
          <AnimatePing
            bgcolor="bg-gray-500"
            textcolor="bg-gray-300"
            size="small"
          />
        </div>
      ) : (
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <div>
                {pingTime >= 300 ? (
                  <AnimatePing
                    bgcolor="bg-red-500"
                    textcolor="bg-red-300"
                    size="small"
                  />
                ) : (
                  <AnimatePing
                    bgcolor="bg-green-500"
                    textcolor="bg-green-300"
                    size="small"
                  />
                )}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="bottom"
                align="center"
                className="w-full max-w-[350px] justify-center !bg-white text-xs rounded-full quicksand-font shadow-lg z-150"
                sideOffset={8}
              >
                <p
                  className={`${
                    pingTime >= 300 ? "bg-red-500" : "bg-green-500"
                  } rounded-full text-white font-bold flex items-center px-4 py-1 cursor-pointer`}
                >
                  {pingTime.toFixed(2)} ms
                </p>
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
};
