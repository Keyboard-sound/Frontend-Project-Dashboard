import { useState } from "react";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import SearchInput from "@components/SearchInput";
import CreateProductForm from "./CreatProductForm";
import useSalesStore from "@/store/useSalesStore";
import type { Product } from "@/api/productsApi";
import { AddProductButton } from "./AddProductButton";

export default function ProductToolBar() {
  const { products, setSearchQuery } = useSalesStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectProduct = (product: Product | null) => {
    if (product) {
      setSearchQuery(product.title);
    } else {
      setSearchQuery("");
    }
  };

  return (
    <div className="flex flex-row justify-between gap-2">
      {/* Add product button */}
      <AddProductButton onClick={() => setIsDialogOpen(true)} />
      <div>
        <SearchInput
          placeholder="search..."
          products={products}
          onSelectProduct={handleSelectProduct}
        />
      </div>

      {/* Create product form */}
      <Dialog
        open={isDialogOpen}
        onClose={setIsDialogOpen}
        className="relative z-50"
      >
        {/* Backdrop */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 transition duration-150 ease-out data-closed:opacity-0"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-end">
          <DialogPanel
            transition
            className="w-96 h-full bg-white transition duration-500 ease-in-out shadow-2xl data-closed:translate-x-full data-closed:opacity-0 data-open:translate-x-0"
          >
            <CreateProductForm
              onSuccess={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
