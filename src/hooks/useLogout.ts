import { useProfileStore } from "@/store/zustand";
import { IProfileState } from "@/store/zustand/type";
import { useRouter } from "next/router";

export function useLogout() {
  const router = useRouter();
  const [logoutProfile] = useProfileStore((state: IProfileState) => [
    state.logoutProfile,
  ]);
  const onLogout = async () => {
    await logoutProfile();
    router.push("/");
  };
  return onLogout;
}
