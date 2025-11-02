import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import CreateProductForm from "./CreatProductForm";
import type { FC } from "react";

export const AddProductButton: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        className="flex flex-row justify-between items-center gap-1 min-w-20 h-full p-1 md:p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
      >
        <PlusIcon className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        <span className="text-2xs md:text-base font-normal text-slate-400">
          Add Product
        </span>
      </button>

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
            className="w-full md:w-96 h-full bg-white transition duration-500 ease-in-out shadow-2xl data-closed:translate-x-full data-closed:opacity-0 data-open:translate-x-0"
          >
            <CreateProductForm
              onSuccess={() => setIsDialogOpen(false)}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
