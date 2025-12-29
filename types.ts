
export enum CategoryId {
  DESK = 'desk',
  LIGHT = 'light',
  TERMINAL = 'terminal',
  ACCESSORIES = 'accessories',
  WEARABLES = 'wearables',
  COBRANDED = 'cobranded'
}

export type Language = 'en' | 'zh';

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface Product {
  id: string;
  name: LocalizedString;
  price: number;
  description: LocalizedString;
  categoryId: CategoryId;
  badge?: LocalizedString;
}

export interface CategoryData {
  id: CategoryId;
  title: LocalizedString;
  items: Product[];
  multiSelect: boolean;
}

export interface ConfigState {
  desk: string;
  light: string;
  terminal: string;
  accessories: string[];
  wearables: string[];
  cobranded: string[];
}
