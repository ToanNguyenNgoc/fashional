export interface ICategories {
  created_at: string;
  deleted: boolean;
  id: number;
  name: string;
  name_slugify: string;
  status: boolean;
  tag_id: number;
  updated_at: string;
}

export interface ICategoryProduct {
  id: number;
  name: string;
  name_slugify: string;
}
