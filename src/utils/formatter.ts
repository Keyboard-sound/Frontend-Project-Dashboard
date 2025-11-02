export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${day}-${month}`;
};

//
export const truncateTitle = (title: string, maxLength: number): string => {
  if (title.length <= maxLength) {
    return title;
  }
  // Find the first whitespace AFTER maxLength index
  const spaceAfterMax = title.indexOf(" ", maxLength);
  if (spaceAfterMax !== -1) {
    return title.slice(0, spaceAfterMax) + "...";
  }

  //if no space found
  return title.slice(0, maxLength) + "...";
};

export const getDaysAgo = (date: string | Date): string => {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  const diffInMs = today.getTime() - targetDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};
