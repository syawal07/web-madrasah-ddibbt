import { client } from '@/lib/sanity.client'
import groq from 'groq'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Post } from '@/types/Post'
import { SiteSettings, Statistic } from '@/types/Sanity'

import Jumbotron from '@/components/Jumbotron'
import Statistics from '@/components/Statistics'
import AboutSection from '@/components/AboutSection'
import PostsSection from '@/components/PostsSection'

export const revalidate = 60

// Definisi Tipe Data Khusus untuk Gallery di Homepage
type GalleryItemSimple = {
  _id: string;
  caption: string;
  image: {
    asset: {
      url: string;
    };
  };
}

type HomepageData = {
  siteSettings: SiteSettings | null;
  latestNews: Post[];
  latestAchievements: Post[];
  statistics: Statistic[];
  latestGallery: GalleryItemSimple[]; // Tambahan baru
}

async function getHomepageData(): Promise<HomepageData> {
  const query = groq`
    {
      "siteSettings": *[_type == "siteSettings"][0] {
        ...,
        logo { asset->{url} },
        jumbotronImage { asset->{url} },
        aboutImage { asset->{url} }
      },
      "latestNews": *[_type == "post" && postType == "berita"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        summary,
        featuredImage { asset->{url} }
      },
      "latestAchievements": *[_type == "post" && postType == "prestasi"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        summary,
        featuredImage { asset->{url} }
      },
      "statistics": *[_type == "statistic"],
      "latestGallery": *[_type == "galleryItem"] | order(_createdAt desc) [0...5] {
        _id,
        caption,
        image { asset->{url} }
      }
    }
  `
  return client.fetch(query)
}

export default async function HomePage() {
  const { siteSettings, latestNews, latestAchievements, statistics, latestGallery } =
    await getHomepageData()

  return (
    <main>
      <Jumbotron settings={siteSettings} />

      <Statistics stats={statistics || []} />

      <AboutSection settings={siteSettings} />

      {/* Bagian Berita */}
      <section className="bg-gray-50">
        <PostsSection
          title="Berita Terbaru"
          subtitle="Informasi terkini seputar kegiatan pondok pesantren"
          posts={latestNews || []}
          archiveUrl="/berita"
          archiveText="Lihat Semua Berita"
          basePath="/berita"
        />
      </section>

      {/* Bagian Prestasi */}
      <section className="bg-white border-b border-gray-100">
        <PostsSection
          title="Prestasi Santri"
          subtitle="Jejak langkah keberhasilan santri kami di berbagai bidang"
          posts={latestAchievements || []}
          archiveUrl="/achievements"
          archiveText="Lihat Semua Prestasi"
          basePath="/achievements"
        />
      </section>

      {/* --- BAGIAN BARU: GALERI PONDOK --- */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto">
          {/* Header Galeri */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
              Galeri Kegiatan
            </h2>
            <p className="text-gray-600 text-lg">
              Potret aktivitas harian, sarana, dan momen kebersamaan di Pondok Pesantren.
            </p>
            <div className="w-24 h-1 bg-[#006400] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Grid Galeri */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {(latestGallery || []).map((item) => (
              <div 
                key={item._id} 
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-md"
              >
                {item.image?.asset?.url ? (
                  <Image
                    src={item.image.asset.url}
                    alt={item.caption || 'Galeri Pondok'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                
                {/* Overlay Caption saat Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium text-sm md:text-base line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Semua */}
          <div className="text-center mt-12">
            <Link 
              href="/gallery" 
              className="inline-flex items-center px-8 py-3 bg-white text-[#006400] border-2 border-[#006400] font-bold rounded-full hover:bg-[#006400] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Lihat Semua Galeri
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}