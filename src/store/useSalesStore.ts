import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSalesData } from "../data/generateSalesData";
import { getProducts } from "@api/productsApi";
import { generateLastYearSalesData } from "../data/generateLastYearSalesData";
import { createProduct, editProduct, deleteProduct } from "@api/productsApi";
import type { SaleRecord } from "../data/generateSalesData";
import type { LastYearData } from "../data/generateLastYearSalesData";
import type { CreateProductInput, Product } from "@api/productsApi";

export interface SalesStore {
  salesData: SaleRecord[];
  products: Product[];
  lastYearData: LastYearData | null;
  loading: boolean;
  filters: {
    dateRange: "7d" | "30d" | "90d";
  };

  setSalesData: (data: SaleRecord[]) => void;
  addSalesData: (data: SaleRecord[]) => void;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  updateFilters: (filters: Partial<SalesStore["filters"]>) => void;
  clearAllData: () => void;
  loadSalesData: (count: number) => Promise<void>;
  loadLastYearData: () => Promise<void>;
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
  createProduct: (product: CreateProductInput) => Promise<Product>;
  editProduct: (id: number, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
}

const sortSalesByDate = (sales: SaleRecord[]): SaleRecord[] => {
  return [...sales].sort((a, b) => {
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);

    return dateA.getTime() - dateB.getTime();
  });
};

const useSalesStore = create<SalesStore>()(
  persist(
    (set, get) => ({
      salesData: [],
      products: [],
      lastYearData: null,
      loading: false,
      filters: {
        dateRange: "30d",
      },
      setSalesData: (data) => set({ salesData: sortSalesByDate(data) }),

      addSalesData: (data) =>
        set((state) => ({
          salesData: sortSalesByDate([...state.salesData, ...data]),
        })),
      setProducts: (products) => set({ products }),
      setLoading: (loading) => set({ loading }),
      updateFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      clearAllData: () =>
        set({
          salesData: [],
          products: [],
          lastYearData: null,
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

      loadSalesData: async (count) => {
        const { products, addSalesData, fetchProducts, loadLastYearData } =
          get();

        if (products.length === 0) {
          await fetchProducts();
        }

        try {
          const currentProducts = get().products;
          const newSales = generateSalesData(count, currentProducts);
          addSalesData(newSales);

          await loadLastYearData();
        } catch (error) {
          console.error("Error generating sales data", error);
        }
      },

      loadLastYearData: async () => {
        const { products, fetchProducts } = get();

        if (products.length === 0) {
          await fetchProducts();
        }

        const currentProducts = get().products;
        const lastYearData = generateLastYearSalesData(currentProducts);
        set({ lastYearData });
      },

      getTotalSales: () => {
        const { salesData } = get();

        return salesData.reduce((sum, sale) => {
          return sale.status === "completed" ? sum + (sale.total || 0) : sum;
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
          return sale.channel === "physical" && sale.status === "completed"
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
          if (!sale.date) return false;

          const daysDiff = Math.floor(
            (Date.now() - new Date(sale.date).getTime()) / (1000 * 60 * 60 * 24)
          );
          const dateLimit = parseInt(filters.dateRange.replace("d", ""));
          if (daysDiff > dateLimit) return false;

          return true;
        });
      },

      createProduct: async (product) => {
        const { setLoading, products } = get();

        try {
          setLoading(true);
          //generate new ID
          const localId = products.map((p) => p.id);
          const maxLocalId =
            localId.length > 0 ? Math.max(...localId, 195) : 194;
          const uniqueId = maxLocalId + 1;
          //get image
          const imageUrl = [`https://picsum.photos/id/${uniqueId}/200/300`];

          const newProduct = await createProduct(product);
          const productWithUniqueId = {
            ...newProduct,
            id: uniqueId,
            images: imageUrl,
          };

          set((state) => ({
            products: [...state.products, productWithUniqueId], // not done
          }));
          return productWithUniqueId;
        } catch (error) {
          console.error("Error creating product:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      editProduct: async (id, updates) => {
        const { setLoading, products } = get();

        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));

        try {
          setLoading(true);
          // Find the product to check if it's local and pass original data
          const product = products.find((p) => p.id === id);

          if (!product) {
            throw new Error(`Product with id ${id} not found in store`);
          }

          const isLocal = product.isLocal ?? false;

          // Pass the original product so local updates can merge properly
          const updatedProduct = await editProduct(
            id,
            updates,
            isLocal,
            product
          );

          return updatedProduct;
        } catch (error) {
          console.error("Error updating product:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      deleteProduct: async (id) => {
        const { setLoading, products } = get();

        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));

        try {
          setLoading(true);
          const product = products.find((p) => p.id === id);

          if (!product) {
            throw new Error(`Product with id ${id} not found in store`);
          }
          const isLocal = product.isLocal ?? false;

          await deleteProduct(id, isLocal);
        } catch (error) {
          console.error("Error deleting product:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },
    }),

    {
      name: "sales-store",
      partialize: (state) => ({
        salesData: state.salesData,
        products: state.products,
        lastYearData: state.lastYearData,
        filters: state.filters,
      }),
    }
  )
);

export default useSalesStore;
