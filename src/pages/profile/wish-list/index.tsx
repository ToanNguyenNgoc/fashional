import { NextPageWithLayout } from "@/common";
import { Card, Seo } from "@/components";
import { IProfileState } from "@/store/zustand/type";
import { useProfileStore } from "@/store/zustand/useProfileStore";
import style from "./style.module.css";
import { ProfileLayout } from "@/layouts";

const WishList: NextPageWithLayout = () => {
  const [isLoading] = useProfileStore((state: IProfileState) => [
    state.isLoading,
  ]);

  return (
    <>
      <Seo title="Danh sách yêu thích" description="" url="" />
      {!isLoading && (
        <Card title={"Danh sách yêu thích"}>
          <div className={style.edit_profile_body}>a</div>
        </Card>
      )}
    </>
  );
};
export default WishList;
WishList.Layout = ProfileLayout;
