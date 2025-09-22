import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSalesData } from "../data/generateSalesData";
import { getProducts } from "../api/getProducts";
import type { SaleRecord } from "../data/generateSalesData";
import type { Products } from "../api/getProducts";

interface SalesStore {
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
  generateSalesData: (days: number) => Promise<void>;
  fetchProducts: () => Promise<void>;

  getTotalRevenue: () => number;
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
        } catch (error) {
          console.error("Error fetching products:", error);
        }
        setLoading(false);
      },

      generateSalesData: async (days) => {
        const { products, addSalesData, fetchProducts } = get();

        if (products.length === 0) {
          await fetchProducts();
        }

        try {
          const currentProducts = get().products;
          const newSales = await generateSalesData(days, currentProducts);
          addSalesData(newSales);
        } catch (error) {
          console.error("Error generating sales data", error);
        }
      },

      getTotalRevenue: () => {
        const { salesData } = get();
        return salesData.reduce((sum, sale) => sum + (sale.total || 0), 0);
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
