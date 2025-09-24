import { faker } from "@faker-js/faker";
// import { getProducts } from "../api/getProducts";
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
  salesChannel: string;
}
export async function generateSalesData(
  count: number,
  products: Products[]
): Promise<SaleRecord[]> {
  // const products = await getProducts();

  const sales = Array.from({ length: count }).map(() => {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 10 });
    const salesStatus = ["completed", "pending", "returns"];
    const paymentMethod = ["credit_card", "paypal", "bank_transfer"];
    const salesChannel = ["online", "physical"];
    return {
      id: faker.string.alphanumeric(5),
      customerName: faker.person.firstName(),
      customerEmail: faker.internet.email(),
      productId: product.id,
      productName: product.title,
      category: product.category.name,
      price: product.price,
      quantity,
      total: quantity * product.price,
      date: faker.date.recent({ days: 90 }),
      status: faker.helpers.arrayElement(salesStatus),
      payment: faker.helpers.arrayElement(paymentMethod),
      salesChannel: faker.helpers.arrayElement(salesChannel),
    };
  });

  return sales;
}
