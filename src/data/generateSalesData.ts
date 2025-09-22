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
}
export async function generateSalesData(
  days: number = 30,
  products: Products[]
): Promise<SaleRecord[]> {
  // const products = await getProducts();

  const sales = Array.from({ length: 50 }).map(() => {
    const product = faker.helpers.arrayElement(products);
    const quantity = faker.number.int({ min: 1, max: 10 });
    const salesStatus = ["completed", "pending", "shipped", "delivered"];
    const paymentMethod = ["credit_card", "paypal", "bank_transfer"];
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
      date: faker.date.recent({ days }),
      status: faker.helpers.arrayElement(salesStatus),
      payment: faker.helpers.arrayElement(paymentMethod),
    };
  });
  console.log("fromSaleData", sales); // for testing

  return sales;
}
