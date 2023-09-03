export interface IBranch {
  name: string;
  short_address: string;
}

export interface IBranches {
  branch_id: number;
  branch: IBranch[];
}
