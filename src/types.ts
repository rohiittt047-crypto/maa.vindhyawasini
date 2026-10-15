export type Language = 'en' | 'hi';

export interface ProductItem {
  id: string;
  nameEn: string;
  nameHi: string;
  categoryEn: string;
  categoryHi: string;
  subEn: string;
  subHi: string;
  descEn: string;
  descHi: string;
  image: string;
  fallbackImage: string;
  badge: string;
  badgeHi: string;
  accentColor: string;
  whatsappMessage: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  iconName: string;
  accentColor: string;
  queryParam: string;
}

export interface GalleryItem {
  id: number;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  category: 'steel' | 'aggregates' | 'cement';
  image: string;
  fallbackImage: string;
  query: string;
}
