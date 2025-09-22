import { generateSalesData } from "../../data/generateSalesData";

export async function dashboardLoader() {
  const salesData = await generateSalesData();

  return { salesData };
}
