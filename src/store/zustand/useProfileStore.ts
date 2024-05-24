import { authApi, profileApi } from "@/services";
import { IProfileState } from "@/store/zustand/type";
import { create } from "zustand";
import Cookies from "js-cookie";

export const useProfileStore = create<IProfileState>()((set) => ({
  profile: null,
  isLoading: true,
  getProfile: async () => {
    if (Cookies.get('token_expired_at')) {
      try {
        const res = await profileApi.getProfile();
        set((state) => ({ profile: res.context, isLoading: false }));
      } catch (error) {
        set((state) => ({ isLoading: false }));
      }
    } else {
      set((state) => ({ isLoading: false }))
    }
  },
  logoutProfile: async () => {
    await authApi.logout();
    Cookies.remove("accessToken");
    Cookies.remove("refresh_token");
    Cookies.remove("token_expired_at");
    set(() => ({ profile: null }));
  },
  // putProfile: (payload) => {
  //   set((state) => ({ profile: { ...state.profile, ...payload } }));
  // },
}));
