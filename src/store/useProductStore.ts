import { create } from "zustand";

interface ProductStore {
  isFormDialogOpen: boolean;
  setFormDialogOpen: (open: boolean) => void;
}

const useProductStore = create<ProductStore>()((set) => ({
  isFormDialogOpen: false,
  setFormDialogOpen: (open) => set({ isFormDialogOpen: open }),
}));

export default useProductStore;
