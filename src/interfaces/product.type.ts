import {
  IBranches,
  ICategoryProduct,
  IPage,
  ITagProductDetail,
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
  tag: ITagProductDetail;
  category: ICategoryProduct;
}

export interface IQrProductById {
  includes?: "created_by" | "category" | "sizes" | string;
}

export interface IMedia {
  media: {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    disk: string;
    created_at: string;
    updated_at: string;
    original_url: string;
  };
}

export interface IAccountProduct {
  id: number;
  fullname: string;
}

export interface IProductDetail extends IProduct {
  media: IMedia[];
  account: IAccountProduct;
}

export interface IProductSize {
  id: number,
  product_id: number,
  name: string,
  status: boolean,
  updated_at: string,
  created_at: string
}