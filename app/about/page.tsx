import { client } from '@/lib/sanity.client'
import { SiteSettings } from '@/types/Sanity'
import { groq } from 'next-sanity'
import Image from 'next/image'

export const revalidate = 60 // Revalidasi data setiap 60 detik

async function getAboutData(): Promise<SiteSettings | null> {
  // Query ini mengambil data "Tentang Kami" dari Pengaturan Website
  const query = groq`
    *[_type == "siteSettings"][0] {
      aboutTitle,
      aboutSummary,
      aboutImage { asset->{url} }
    }
  `
  return client.fetch(query)
}

export default async function AboutPage() {
  const data = await getAboutData()

  if (!data) {
    return <div>Data tidak ditemukan.</div>
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Bagian Gambar */}
          <div className="lg:w-1/2 w-full">
            {data.aboutImage?.asset?.url && (
              <div className="relative w-full h-96 min-h-[400px] rounded-lg shadow-2xl overflow-hidden">
                <Image
                  src={data.aboutImage.asset.url}
                  alt={data.aboutTitle || 'Tentang Kami'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          {/* Bagian Teks */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold text-ddi-green sm:text-5xl leading-tight">
              {data.aboutTitle || 'Tentang Kami'}
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {data.aboutSummary || 'Konten belum diisi.'}
            </p>
            {/* Anda bisa menambahkan lebih banyak teks statis di sini jika perlu */}
          </div>
        </div>
      </div>
    </div>
  )
}