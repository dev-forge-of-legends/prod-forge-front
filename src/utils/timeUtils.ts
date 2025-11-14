export const formatTimeInDHMS = (seconds: number) => {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
};

export const formatTimeInHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

export const formatTimeInHMSWithColon = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${minutes}:${secs}`;
};

export const formatTimeInMSWithColon = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // Pad minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(secs).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};


export const formatTimeAgo = (createdAt: string) => {
  if (!createdAt || isNaN(new Date(createdAt).getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const createdDate = new Date(createdAt);
  const secondsAgo = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  let interval = Math.floor(secondsAgo / 31536000);
  if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(secondsAgo / 2592000);
  if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(secondsAgo / 86400);
  if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(secondsAgo / 3600);
  if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";

  interval = Math.floor(secondsAgo / 60);
  if (interval >= 1) return interval + " min" + (interval > 1 ? "s" : "") + " ago";

  return "just now";
}

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleString("en-US", options);
};

export const formatDateLocal = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const formatDateLocalMDHMS = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    month: 'short', // Short month name
    day: 'numeric', // Numeric day
    hour: 'numeric', // Numeric hour
    minute: 'numeric', // Numeric minute
    hour12: true // 12-hour format
  });
}