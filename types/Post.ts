import { type PortableTextBlock } from 'next-sanity'

export type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  postType: 'berita' | 'prestasi';
  featuredImage: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  publishedAt: string;
  summary?: string; // Pastikan ini ada
  content: PortableTextBlock[];
}