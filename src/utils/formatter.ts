export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString()}`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${day}-${month}`;
};
