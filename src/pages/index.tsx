import { Seo } from "@/components";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";

export default function Home() {
  const profile = useProfileStore((state: IProfileState) => state.profile);
  console.log(profile);
  return (
    <>
      <Seo />
      <main>Home page</main>
      <p>{profile?.fullname}</p>
    </>
  );
}
