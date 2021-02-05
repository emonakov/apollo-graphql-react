export interface ItemInterface {
  id: number;
  title: string;
  createdAt: string;
}
export interface StateInterface {
  items?: ItemInterface[];
  loggedIn?: boolean;
}
