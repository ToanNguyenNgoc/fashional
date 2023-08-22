import { profileApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { create } from "zustand";

export const useProfileStore = create<IProfileState>()((set) => ({
  profile: null,
  isLoading: true,
  getProfile: async () => {
    try {
      const res = await profileApi.getProfile();
      set((state) => ({ profile: res.data, isLoading: false }));
    } catch (error) {
      set((state) => ({ isLoading: false }));
    }
  },
}));
