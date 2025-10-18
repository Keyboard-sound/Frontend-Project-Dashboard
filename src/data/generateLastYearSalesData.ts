import { faker } from "@faker-js/faker";
import type { Products } from "../api/getProducts";

export interface LastYearSalesData {
  totalPhysicalSales: number;
  totalOnlineSales: number;
  totalReturns: number;
  totalSales: number;
}

export interface LastYearData {
  "7d": LastYearSalesData;
  "30d": LastYearSalesData;
  "90d": LastYearSalesData;
}

function generatePeriodData(
  products: Products[],
  salesCount: number
): LastYearSalesData {
  let physicalTotal = 0;
  let onlineTotal = 0;
  let returnsTotal = 0;

  // Generate realistic sales based on actual product prices
  for (let i = 0; i < salesCount; i++) {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 10 });
    const total = product.price * quantity;
    const channel = faker.helpers.arrayElement(["online", "physical"]);
    const status = faker.helpers.arrayElement([
      "completed",
      "pending",
      "returns",
    ]);

    if (status === "returns") {
      returnsTotal += total;
    } else if (channel === "physical" && status === "completed") {
      physicalTotal += total;
    } else if (channel === "online" && status === "completed") {
      onlineTotal += total;
    }
  }

  return {
    totalPhysicalSales: Math.round(physicalTotal),
    totalOnlineSales: Math.round(onlineTotal),
    totalReturns: Math.round(returnsTotal),
    totalSales: Math.round(physicalTotal + onlineTotal),
  };
}

export function generateLastYearSalesData(products: Products[]): LastYearData {
  return {
    "7d": generatePeriodData(products, faker.number.int({ min: 20, max: 50 })),
    "30d": generatePeriodData(
      products,
      faker.number.int({ min: 80, max: 150 })
    ),
    "90d": generatePeriodData(
      products,
      faker.number.int({ min: 200, max: 400 })
    ),
  };
}
