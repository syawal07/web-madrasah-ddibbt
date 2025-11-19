export type SiteSettings = {
  _id: string;
  siteTitle: string;
  logo?: { asset: { url: string } };
  
  // Jumbotron
  jumbotronTitle?: string;
  jumbotronSubtitle?: string;
  jumbotronImage?: { asset: { url: string } };
  
  // About
  aboutTitle?: string;
  aboutSummary?: string;
  aboutImage?: { asset: { url: string } };
  
  // Footer & Kontak
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