import { User } from "@/interfaces/user";

export type IProfileState = {
  profile: User | null;
  isLoading: boolean;
  getProfile: () => Promise<void>;
  // logoutProfile: () => Promise<void>;
  // putProfile: (newProfile: User) => void;
};
