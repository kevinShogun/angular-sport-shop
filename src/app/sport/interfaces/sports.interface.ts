// Generated by https://quicktype.io

export interface ISport {
  id: string;
  name: string;
  price: number;
  description: string;
  size?: string[];
  category: Category;
  colors?: string[];
  alt_img?: string;
}

export type Category = 'Accessories' | 'Shoes' | 'Socks' | 'T-shirts' | 'Pants';