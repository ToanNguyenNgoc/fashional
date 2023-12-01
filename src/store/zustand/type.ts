import { IUser } from "@/interfaces/user.type";

export type IProfileState = {
  profile: IUser | null;
  isLoading: boolean;
  getProfile: () => Promise<void>;
  logoutProfile: () => Promise<void>;
  // putProfile: (newProfile: User) => void;
};