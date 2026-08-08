import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import CreateProductForm from "./CreateProductForm";
import type { FC } from "react";

export const AddProductButton: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        className="flex flex-row justify-between items-center h-6 lg:h-8 p-1 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
      >
        <PlusIcon className="size-3 lg:size-4 text-slate-400" />
        <span className="text-xs lg:text-sm font-normal text-slate-400">
          Add Product
        </span>
      </button>

      {/* Create product form */}
      <Dialog
        open={isDialogOpen}
        onClose={setIsDialogOpen}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition duration-150 ease-out data-closed:opacity-0"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex justify-end items-center">
          <DialogPanel
            transition
            className="w-full max-w-md h-full rounded-sm bg-white transition duration-500 ease-in-out shadow-2xl data-closed:translate-x-full data-closed:opacity-0 data-open:translate-x-0"
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
