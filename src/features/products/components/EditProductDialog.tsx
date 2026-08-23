import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ProductForm } from "./ProductForm";
import type { FC } from "react";
import useSalesStore from "@/store/useSalesStore";

interface EditProductFormProps {
  selectedId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProductDialog: FC<EditProductFormProps> = ({
  selectedId,
  isOpen,
  onClose,
}) => {
  const products = useSalesStore((state) => state.products);
  const selectedProductData = products.find((p) => p.id === selectedId);

  return (
    <Dialog className="relative z-50" open={isOpen} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition-opacity duration-150 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex justify-center items-center">
        <DialogPanel className="w-full md:max-w-lg h-full md:h-[70%] rounded-md bg-white">
          <ProductForm
            mode="edit"
            initialData={selectedProductData}
            onSuccess={() => onClose()}
            onCancel={() => onClose()}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
