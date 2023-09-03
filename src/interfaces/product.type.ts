import {
  IBranches,
  ICategory,
  IPage,
  ITagLittle,
} from "@/interfaces/index.type";

export interface IQrProduct extends IPage {
  search?: string;
  branch_ids?: string | number;
  tag_id?: string | number;
  category_ids?: string | number;
  min_price?: string | number;
  max_price?: string | number;
  min_price_original?: string | number;
  max_price_original?: string | number;
  includes?: string;
  sort?: string;
  status?: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  name_slugify: string;
  thumbnail_url: string;
  price_original: number;
  price: number;
  price_special: number;
  short_content: string;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
  created_by_id: number;
  tag_id: number;
  category_id: number;
  branches: IBranches[];
  tag: ITagLittle;
  category: ICategory;
}
