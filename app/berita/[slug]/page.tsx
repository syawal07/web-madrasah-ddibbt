import { client } from '@/lib/sanity.client'
import { postBySlugQuery, Post } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'

// PERUBAHAN 1: params sekarang adalah Promise
type Props = {
  params: Promise<{
    slug: string
  }>
}

// 1. Konfigurasi Metadata Dinamis (SEO)
export async function generateMetadata({ params }: Props) {
  // PERUBAHAN 2: await params sebelum digunakan
  const { slug } = await params
  
  const post: Post = await client.fetch(postBySlugQuery, { slug })
  
  if (!post) {
    return {
      title: 'Berita Tidak Ditemukan',
    }
  }

  return {
    title: `${post.title} | Ponpes Ashshirathal Mustaqim`,
    description: post.summary,
    openGraph: {
      images: post.featuredImage ? [urlForImage(post.featuredImage).url()] : [],
    },
  }
}

// Custom Styling untuk Isi Konten (Rich Text)
const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).url()}
            alt={value.alt || 'Gambar ilustrasi'}
            fill
            className="object-contain bg-gray-50"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-l-4 border-[#006400] pl-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-gray-700 leading-relaxed text-lg">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#006400] pl-4 py-2 my-6 italic bg-green-50 text-gray-700 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="mt-2 mb-6 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="mt-2 mb-6 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => {
      const href = value?.href || '#'
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={href} rel={rel} className="text-[#006400] font-bold hover:underline decoration-2 underline-offset-2">
          {children}
        </a>
      )
    },
  },
}

// 3. Halaman Utama
export default async function PostPage({ params }: Props) {
  // PERUBAHAN 3: await params sebelum digunakan di fetch
  const { slug } = await params

  const post: Post = await client.fetch(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Header dengan Featured Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-black/50 z-10" /> 
        {post.featuredImage ? (
           <Image
             src={urlForImage(post.featuredImage).url()}
             alt={post.title}
             fill
             className="object-cover"
             priority
           />
        ) : (
           <div className="w-full h-full bg-gray-800" />
        )}
        
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12 md:pb-20">
            <Link 
                href="/berita" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Berita
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4 text-sm md:text-base font-medium">
                <span className="bg-[#006400] px-3 py-1 rounded-full text-white">
                    {post.postType === 'berita' ? 'Berita' : 'Prestasi'}
                </span>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </div>
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Admin Pesantren
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl font-heading">
                {post.title}
            </h1>
        </div>
      </div>

      {/* Konten Artikel */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
            {/* Summary Lead */}
            {post.summary && (
                <p className="text-xl md:text-2xl text-gray-600 font-medium mb-10 leading-relaxed border-b pb-10">
                    {post.summary}
                </p>
            )}

            {/* Isi Portable Text */}
            <div className="prose prose-lg prose-green max-w-none">
                {post.content && <PortableText value={post.content} components={myPortableTextComponents} />}
            </div>

            {/* Share / Footer Artikel */}
            <div className="mt-16 pt-8 border-t border-gray-200">
                <Link 
                    href="/berita"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Lihat Berita Lainnya
                </Link>
            </div>
        </div>
      </div>
    </article>
  )
}