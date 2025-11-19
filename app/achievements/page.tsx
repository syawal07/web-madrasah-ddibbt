import { client } from '@/lib/sanity.client'
import { Post, achievementsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { Calendar, ArrowRight, Trophy, Medal } from 'lucide-react'

export const revalidate = 60

export default async function AchievementsPage() {
  // PERUBAHAN: Menggunakan 'achievementsQuery' untuk mengambil data khusus prestasi
  const posts: Post[] = await client.fetch(achievementsQuery)

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section - Nuansa Emas/Kuning sedikit */}
      <div className="bg-yellow-50/50 border-b border-yellow-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <span className="inline-flex items-center py-1 px-3 rounded-full bg-yellow-100 text-yellow-800 text-sm font-bold mb-4 border border-yellow-200">
            <Trophy className="w-4 h-4 mr-2" />
            Hall of Fame
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Prestasi Santri & Guru
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Dokumentasi jejak langkah keberhasilan keluarga besar Pondok Pesantren 
            dalam berbagai kompetisi akademik maupun non-akademik.
          </p>
        </div>
      </div>

      {/* Grid Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/achievements/${post.slug.current}`} 
              key={post._id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                {post.featuredImage ? (
                  <Image
                    src={urlForImage(post.featuredImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Trophy className="w-16 h-16 opacity-20" />
                  </div>
                )}
                {/* Gradient Overlay Kuning Tipis saat Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-6 relative">
                {/* Ikon Medali Melayang */}
                <div className="absolute -top-6 right-6 bg-[#FFD700] p-2 rounded-full shadow-md">
                    <Medal className="w-6 h-6 text-white" />
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#d97706] transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.summary}
                </p>

                <div className="flex items-center text-[#d97706] font-bold text-sm group-hover:underline underline-offset-4">
                  Lihat Detail Prestasi
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-yellow-50 p-6 rounded-full shadow-sm mb-4">
                <Trophy className="w-12 h-12 text-yellow-400" />
             </div>
             <h3 className="text-xl font-semibold text-gray-900">Belum ada data prestasi</h3>
             <p className="text-gray-500 mt-2 max-w-sm">
               Data prestasi belum ditambahkan. Silakan tambahkan melalui halaman admin.
             </p>
           </div>
        )}
      </div>
    </div>
  )
}