import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSalesData } from "../data/generateSalesData";
import { getProducts } from "@api/productsApi";
import { generateLastYearSalesData } from "../data/generateLastYearSalesData";
import { createProduct, apiEditProduct, deleteProduct } from "@api/productsApi";
import type { SaleRecord } from "../data/generateSalesData";
import type { LastYearData } from "../data/generateLastYearSalesData";
import type {
  CreateProductInput,
  Product,
  ProductUpdateInput,
} from "@api/productsApi";

export interface SalesStore {
  salesData: SaleRecord[];
  products: Product[];
  lastYearData: LastYearData | null;
  productsLoading: boolean;
  createProductsLoading: boolean;
  editingProductsLoading: boolean;
  salesDataLoading: boolean;
  searchQuery: string;
  filters: {
    dateRange: "7d" | "30d" | "90d";
  };

  setSalesData: (data: SaleRecord[]) => void;
  addSalesData: (data: SaleRecord[]) => void;
  setProducts: (products: Product[]) => void;
  setProductsLoading: (loading: boolean) => void;
  setCreateProductsLoading: (loading: boolean) => void;
  setEditingProductsLoading: (loading: boolean) => void;
  setSalesDataLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
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
  getFilteredProducts: () => Product[];
  createProduct: (product: CreateProductInput) => Promise<Product>;
  editProduct: (id: number, updates: ProductUpdateInput) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
}

export const sortSalesByDate = (sales: SaleRecord[]): SaleRecord[] => {
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
      searchQuery: "",
      productsLoading: false,
      createProductsLoading: false,
      editingProductsLoading: false,
      deleteProductLoading: false,
      salesDataLoading: false,
      filters: {
        dateRange: "30d",
      },
      setSalesData: (data) => set({ salesData: sortSalesByDate(data) }),

      addSalesData: (data) =>
        set((state) => ({
          salesData: sortSalesByDate([...state.salesData, ...data]),
        })),
      setProducts: (products) => set({ products }),
      setProductsLoading: (loading) => set({ productsLoading: loading }),
      setCreateProductsLoading: (loading) =>
        set({ createProductsLoading: loading }),
      setEditingProductsLoading: (loading) =>
        set({ editingProductsLoading: loading }),
      setSalesDataLoading: (loading) => set({ salesDataLoading: loading }),
      updateFilters: (newFilters) =>
        set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      clearAllData: () =>
        set({
          salesData: [],
          lastYearData: null,
          filters: { dateRange: "30d" },
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      getFilteredProducts: () => {
        const { products, searchQuery } = get();

        if (!searchQuery || searchQuery.trim() === "") {
          return products;
        }

        return products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      },

      fetchProducts: async () => {
        const { setProducts } = get();

        try {
          const products = await getProducts();
          setProducts(products);
          console.log("Products from store", products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },

      loadSalesData: async (count) => {
        const {
          products,
          addSalesData,
          fetchProducts,
          loadLastYearData,
          setSalesDataLoading,
        } = get();

        try {
          setSalesDataLoading(true);

          if (products.length === 0) {
            await fetchProducts();
          }

          const currentProducts = get().products;
          const newSales = generateSalesData(count, currentProducts);
          addSalesData(newSales);

          await loadLastYearData();
        } catch (error) {
          console.error(error);
          throw new Error("Failed to salesData");
        } finally {
          setSalesDataLoading(false);
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
          (sale) => sale.channel === "physical" && sale.status === "completed",
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
          (sale) => sale.channel === "online" && sale.status === "completed",
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
            (Date.now() - new Date(sale.date).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          const dateLimit = parseInt(filters.dateRange.replace("d", ""));
          if (daysDiff > dateLimit) return false;

          return true;
        });
      },

      createProduct: async (product) => {
        const { products, setCreateProductsLoading } = get();

        try {
          setCreateProductsLoading(true);
          //find the ID at 195 and above, ignore 1-20
          const localId = products.map((p) => p.id).filter((id) => id >= 195);
          const maxLocalId = localId.length > 0 ? Math.max(...localId) : 194;
          const uniqueId = maxLocalId + 1;
          //get image
          const imageUrl = `https://picsum.photos/id/${uniqueId}/200/300`;

          const newProduct = await createProduct(product);
          const productWithUniqueId = {
            ...newProduct,
            id: uniqueId,
            images: [imageUrl], //add as array because image return from dummy api is array.
            isLocal: true,
          };

          set((state) => ({
            products: [...state.products, productWithUniqueId],
          }));
          return productWithUniqueId;
        } catch (error) {
          console.error(error);
          throw new Error("Failed to creating product");
        } finally {
          setCreateProductsLoading(false);
        }
      },

      editProduct: async (id, updates) => {
        const { setEditingProductsLoading, products } = get();

        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product,
          ),
        }));

        try {
          setEditingProductsLoading(true);
          // Find the product to check if it's local and pass original data
          const existed = products.find((p) => p.id === id);

          if (!existed) {
            throw new Error(`Product with id ${id} not found in store`);
          }

          const isLocal = existed.isLocal ?? false;

          // Pass the original product so local updates can merge properly
          const updatedProduct = await apiEditProduct(
            id,
            updates,
            isLocal,
            existed,
          );

          return updatedProduct;
        } catch (error) {
          console.error(error);
          throw new Error("Failed to updating product");
        } finally {
          setEditingProductsLoading(false);
        }
      },

      deleteProduct: async (id) => {
        const { products } = get();

        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));

        try {
          const existed = products.find((p) => p.id === id);

          if (!existed) {
            throw new Error(`Product with id ${id} not found in store`);
          }
          const isLocal = existed.isLocal ?? false;

          await deleteProduct(id, isLocal);
        } catch (error) {
          console.error(error);
          throw new Error("Failed to delete product");
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
    },
  ),
);

export default useSalesStore;
