import { ITagState } from "@/store/zustand/type";
import { create } from "zustand";

const useStore = create<ITagState>()((set) => ({
    tag: null,
    isLoading: true,
    getTag: async () => {
        // const res = await 
    },
}));
