import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Query untuk mengambil SEMUA Berita (Arsip)
export const newsQuery = groq`
  *[_type == "post" && postType == "berita"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage,
    summary,
    postType
  }
`

// Query untuk mengambil SEMUA Prestasi (Arsip)
export const achievementsQuery = groq`
  *[_type == "post" && postType == "prestasi"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage,
    summary,
    postType
  }
`

// Query untuk mengambil SATU Postingan (Detail Berita/Prestasi)
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage,
    summary,
    content,
    postType
  }
`

// Query untuk mengambil Berita Terbaru (misal untuk Widget/Sidebar)
export const recentNewsQuery = groq`
  *[_type == "post" && postType == "berita"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage
  }
`

// Definisi Tipe Data (TypeScript)
export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  featuredImage: SanityImageSource
  summary?: string
  content?: PortableTextBlock[]
  postType: 'berita' | 'prestasi'
}

export const galleryQuery = groq`
  *[_type == "galleryItem"] | order(_createdAt desc) {
    _id,
    caption,
    galleryType,
    image
  }
`

// Interface TypeScript untuk Galeri
export interface GalleryItem {
  _id: string
  caption: string
  galleryType: 'kegiatan' | 'sarana'
  image: SanityImageSource
}