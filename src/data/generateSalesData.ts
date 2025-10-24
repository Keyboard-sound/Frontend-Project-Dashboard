import { faker } from "@faker-js/faker";
import type { Products } from "../api/getProducts";

export interface SaleRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  productId: number;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
  date: Date;
  status: string;
  channel: string;
}

export function generateSalesData(
  count: number,
  products: Products[]
): SaleRecord[] {
  const sales = Array.from({ length: count }).map(() => {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 10 });
    const salesStatus = ["completed", "pending", "returns"];
    const paymentMethod = ["credit_card", "paypal", "bank_transfer"];
    const channel = ["online", "physical"];
    return {
      id: faker.string.alphanumeric(5),
      customerName: faker.person.firstName(),
      customerEmail: faker.internet.email(),
      productId: product.id,
      productName: product.title,
      category: product.category,
      price: product.price,
      quantity,
      total: quantity * product.price,
      date: faker.date.recent({ days: 90 }),
      status: faker.helpers.arrayElement(salesStatus),
      payment: faker.helpers.arrayElement(paymentMethod),
      channel: faker.helpers.arrayElement(channel),
    };
  });

  return sales;
}
