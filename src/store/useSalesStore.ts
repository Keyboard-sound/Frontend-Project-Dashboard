import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSalesData } from "../data/generateSalesData";
import { getProducts } from "../api/getProducts";
import type { SaleRecord } from "../data/generateSalesData";
import type { Products } from "../api/getProducts";

export interface SalesStore {
  salesData: SaleRecord[];
  products: Products[];
  loading: boolean;
  filters: {
    dateRange: "7d" | "30d" | "90d";
  };

  setSalesData: (data: SaleRecord[]) => void;
  addSalesData: (data: SaleRecord[]) => void;
  setProducts: (products: Products[]) => void;
  setLoading: (loading: boolean) => void;
  clearAllData: () => void;
  generateSalesData: (count: number) => Promise<void>;
  fetchProducts: () => Promise<void>;

  getTotalSales: () => number;
  getPhysicalSales: () => SaleRecord[];
  getTotalPhysicalSale: () => number;
  getTotalOnlineSale: () => number;
  getOnlineSales: () => SaleRecord[];
  getTotalReturns: () => number;
  getTotalCustomers: () => number;
  getTotalOrders: () => number;
  getFilteredSales: () => SaleRecord[];
}

const useSalesStore = create<SalesStore>()(
  persist(
    (set, get) => ({
      salesData: [],
      products: [],
      loading: false,
      filters: {
        dateRange: "30d",
      },
      setSalesData: (data) => set({ salesData: data }),

      addSalesData: (data) =>
        set((state) => ({
          salesData: [...state.salesData, ...data],
        })),
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      clearAllData: () =>
        set({
          salesData: [],
          products: [],
          filters: { dateRange: "30d" },
        }),

      fetchProducts: async () => {
        const { setProducts, setLoading } = get();

        try {
          setLoading(true);
          const products = await getProducts();
          setProducts(products);
          console.log("Products from store", products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
        setLoading(false);
      },

      generateSalesData: async (count) => {
        const { products, addSalesData, fetchProducts } = get();

        if (products.length === 0) {
          await fetchProducts();
        }

        try {
          const currentProducts = get().products;
          const newSales = await generateSalesData(count, currentProducts);
          addSalesData(newSales);
        } catch (error) {
          console.error("Error generating sales data", error);
        }
      },

      getTotalSales: () => {
        const { salesData } = get();

        return salesData.reduce((sum, sale) => {
          return sale.status !== "pending" ? sum + (sale.total || 0) : sum;
        }, 0);
      },

      getPhysicalSales: () => {
        const { salesData } = get();
        return salesData.filter(
          (sale) => sale.channel === "physical" && sale.status === "completed"
        );
      },
      getTotalPhysicalSale: () => {
        const { salesData } = get();
        return salesData.reduce((sum, sale) => {
          return sale.channel === "physicals" && sale.status === "completed"
            ? sum + (sale.total || 0)
            : sum;
        }, 0);
      },
      getTotalOnlineSale: () => {
        const { salesData } = get();
        return salesData.reduce((sum, sale) => {
          return sale.channel === "online" && sale.status === "completed"
            ? sum + (sale.total || 0)
            : sum;
        }, 0);
      },
      getOnlineSales: () => {
        const { salesData } = get();
        return salesData.filter(
          (sale) => sale.channel === "online" && sale.status === "completed"
        );
      },
      getTotalReturns: () => {
        const { salesData } = get();
        return salesData.reduce((sum, sale) => {
          return sale.status === "returns" ? sum + (sale.total || 0) : sum;
        }, 0);
      },

      getTotalCustomers: () => {
        const { salesData } = get();
        return new Set(salesData.map((sale) => sale.customerEmail)).size;
      },

      getTotalOrders: () => get().salesData.length,

      getFilteredSales: () => {
        const { salesData, filters } = get();

        return salesData.filter((sale) => {
          const daysDiff = Math.floor(
            (Date.now() - sale.date.getTime()) / (1000 * 60 * 60 * 24)
          );
          const dateLimit = parseInt(filters.dateRange.replace("d", ""));
          if (daysDiff > dateLimit) return false;

          return true;
        });
      },
    }),
    {
      name: "sales-store",
      partialize: (state) => ({
        salesData: state.salesData,
        products: state.products,
        filters: state.filters,
      }),
    }
  )
);

export default useSalesStore;
