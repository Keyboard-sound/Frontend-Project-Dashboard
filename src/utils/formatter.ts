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
