import { client } from '@/lib/sanity.client'
import { Post, newsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'

export const revalidate = 60

export default async function BeritaArchivePage() {
  const posts: Post[] = await client.fetch(newsQuery)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#006400] text-sm font-semibold mb-4">
            Informasi Terkini
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Arsip Berita
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Jelajahi kumpulan berita, pengumuman resmi, dan liputan kegiatan terbaru 
            dari Pondok Pesantren Ashshirathal Mustaqim.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/berita/${post.slug.current}`} 
              key={post._id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={urlForImage(post.featuredImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    <Newspaper className="w-12 h-12 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center text-sm text-[#006400] font-medium mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#006400] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.summary}
                </p>

                <div className="flex items-center text-[#006400] font-semibold text-sm group-hover:underline underline-offset-4">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                <Newspaper className="w-12 h-12 text-gray-300" />
             </div>
             <h3 className="text-xl font-semibold text-gray-900">Belum ada berita</h3>
             <p className="text-gray-500 mt-2 max-w-sm">
               Saat ini belum ada berita yang dipublikasikan. Silakan cek kembali nanti.
             </p>
           </div>
        )}
      </div>
    </div>
  )
}