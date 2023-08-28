import { ICategories } from "@/interfaces/categories.type";
import { IPage } from "@/interfaces/page.type";

export interface IQrtag extends IPage {
  includes?: string;
  status?: boolean;
  type?: string;
}
export interface ITag {
  categories: ICategories[];
  id: number;
  name: string;
  name_slugify: string;
  type: string;
  status: boolean;
  deleted: boolean;
  updated_at: string;
  created_at: string;
}
