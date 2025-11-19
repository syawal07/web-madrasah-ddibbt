import { client } from '@/lib/sanity.client'
import { galleryQuery, GalleryItem } from '@/lib/sanity.queries'
import GalleryGrid from '@/components/GalleryGrid'

export const revalidate = 60 // Revalidate tiap 1 menit

export default async function GalleryPage() {
  const items: GalleryItem[] = await client.fetch(galleryQuery)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
          Galeri Pondok
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Potret kegiatan harian santri, acara besar, serta fasilitas sarana dan prasarana 
          di lingkungan Pondok Pesantren Ashshirathal Mustaqim.
        </p>
      </div>

      {/* Konten Grid */}
      <div className="container mx-auto px-4 py-12">
        <GalleryGrid items={items} />
      </div>
    </div>
  )
}