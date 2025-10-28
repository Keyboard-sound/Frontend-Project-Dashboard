import { useState } from "react";
import { Dialog, Button, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import SearchInput from "@components/SearchInput";
import CreateProductForm from "./CreatProductForm";

export default function ProductToolBar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-row justify-between gap-2">
      <Button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        className="flex flex-row gap-1 justify-center items-center p-2 border border-gray-200 rounded-lg bg-white cursor-pointer hover:shadow-sm active:bg-gray-100"
      >
        <PlusIcon className="w-5 h-5 text-slate-400" />
        <span className="text-slate-400">Add Product</span>
      </Button>
      <div>
        <SearchInput placeholder="search..." />
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
