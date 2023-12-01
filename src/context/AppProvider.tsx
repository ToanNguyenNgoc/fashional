import { IUser } from "@/interfaces/user.type";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand";
import { ReactNode, createContext, useEffect } from "react";

export type AppContextType = {
  user: IUser | null;
};
export const AppContext = createContext<AppContextType | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [getProfile, profile] = useProfileStore((state: IProfileState) => [
    state.getProfile,
    state.profile,
  ]);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const value = {
    user: null,
  };
  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
}
