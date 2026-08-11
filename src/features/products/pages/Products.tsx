import ProductList from "../components/ProductList";
import { AddProductButton } from "../components/AddProductButton";
import { ProductsSearchInput } from "../components/ProductsSearchInput";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ProductForm } from "../components/ProductForm";
import useSalesStore from "@/store/useSalesStore";
import useProductDialogStore from "@/store/useProductDialogStore";
import type { Product } from "@api/productsApi";

export default function ProductsPage() {
  const { setSearchQuery } = useSalesStore();
  const { isCreateDialogOpen, setCreateDialogOpen } = useProductDialogStore();

  const handleProductSearch = (product: Product | null) => {
    if (product) {
      setSearchQuery(product.title);
    } else {
      setSearchQuery("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full rounded-lg bg-white">
      <div className="sticky top-9 lg:top-0 z-30 hidden lg:flex justify-end items-center gap-1 px-4 py-2 bg-white shadow-sm">
        <AddProductButton onClick={() => setCreateDialogOpen(true)} />
        <ProductsSearchInput
          placeholder={"search..."}
          onSelectProduct={handleProductSearch}
          onClear={handleClearSearch}
        />
      </div>

      {/* card list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pt-2 pb-4">
        <ProductList />
      </div>

      {/* Create product form */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={setCreateDialogOpen}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 transition-opacity duration-150 ease-out data-closed:opacity-0"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex justify-end items-center">
          <DialogPanel
            transition
            aria-hidden="true"
            className="w-full max-w-md h-full rounded-sm bg-white transition duration-500 ease-in-out shadow-2xl data-closed:translate-x-full data-closed:opacity-0 data-open:translate-x-0"
          >
            <ProductForm
              mode="create"
              onSuccess={() => setCreateDialogOpen(false)}
              onCancel={() => setCreateDialogOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
