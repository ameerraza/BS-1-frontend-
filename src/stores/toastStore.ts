// src/store/toastStore.ts
import { create } from "zustand";
import { toast } from "react-toastify";

interface ToastStore {
  showToast: (
    message: string,
    type?: "info" | "success" | "warning" | "error"
  ) => void;
}

const useToastStore = create<ToastStore>(() => ({
  showToast: (message: any, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast.info(message);
    }
  },
}));

export default useToastStore;
