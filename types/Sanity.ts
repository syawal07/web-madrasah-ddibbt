import { PortableTextBlock } from "next-sanity";

export type SiteSettings = {
  _id: string;
  siteTitle: string;
  logo?: { asset: { url: string } };
  
  // Jumbotron
  jumbotronTitle?: string;
  jumbotronSubtitle?: string;
  jumbotronImage?: { asset: { url: string } };
  
  // About Home
  aboutTitle?: string;
  aboutSummary?: string;
  aboutImage?: { asset: { url: string } };
  
  // --- IDENTITAS SEKOLAH (BARU) ---
  schoolName?: string;
  nsm?: string;
  npsn?: string;
  addressStreet?: string;
  addressDistrict?: string;
  addressRegency?: string;
  addressProvince?: string;

  // --- VISI MISI (BARU) ---
  vision?: string;
  mission?: PortableTextBlock[]; // Karena pakai Rich Text
  visionImage?: { asset: { url: string } };

  // --- SEJARAH (BARU) ---
  historyText?: PortableTextBlock[];
  historyImage?: { asset: { url: string } };

  // --- STRUKTUR (BARU) ---
  structureImage?: { asset: { url: string } };
  structureText?: string;

  // Footer & Contact
  footerText?: string;
  footerAddress?: string;
  footerPhone?: string;
  footerEmail?: string;
  googleMapsUrl?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export type Statistic = {
  _id: string;
  title: string;
  value: string;
  iconName?: string;
}