import { create } from "zustand";

interface ProductStore {
  isCreateDialogOpen: boolean;
  setCreateDialogOpen: (open: boolean) => void;
}

const useProductDialogStore = create<ProductStore>()((set) => ({
  isCreateDialogOpen: false,
  setCreateDialogOpen: (open) => set({ isCreateDialogOpen: open }),
}));

export default useProductDialogStore;
