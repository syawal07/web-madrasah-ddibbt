import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types/Post'
import { ArrowRight, Calendar } from 'lucide-react'

type Props = {
  title: string;
  subtitle?: string;
  posts: Post[];
  archiveUrl: string;
  archiveText: string;
  basePath: string; // contoh: '/berita' atau '/achievements'
}

export default function PostsSection({ 
  title, 
  subtitle,
  posts, 
  archiveUrl, 
  archiveText, 
  basePath 
}: Props) {
  return (
    <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        )}
        <div className="w-24 h-1 bg-[#006400] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(posts || []).map((post) => (
          <Link 
            href={`${basePath}/${post.slug.current}`} 
            key={post._id}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden">
              {post.featuredImage?.asset?.url ? (
                <Image
                  src={post.featuredImage.asset.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* Overlay Gradient (Agar teks putih terbaca jika ada di atas gambar, opsional) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-grow p-6">
              
              {/* Meta Data (Date) */}
              <div className="flex items-center text-sm text-[#006400] font-medium mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <time>
                  {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric'
                  })}
                </time>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#006400] transition-colors">
                {post.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                {post.summary}
              </p>

              {/* Read More Link */}
              <div className="flex items-center text-[#006400] font-semibold text-sm group-hover:underline underline-offset-4">
                Baca Selengkapnya
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="text-center mt-16">
        <Link 
          href={archiveUrl} 
          className="inline-flex items-center px-8 py-3 bg-white text-[#006400] border-2 border-[#006400] font-bold rounded-full hover:bg-[#006400] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {archiveText}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}