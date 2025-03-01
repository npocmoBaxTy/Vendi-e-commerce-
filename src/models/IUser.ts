export type IUser = {
  id?: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  cart: number[] | null;
  liked_products: number[] | null;
};
