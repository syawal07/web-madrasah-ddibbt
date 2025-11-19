import { client } from '@/lib/sanity.client'
import { postBySlugQuery, Post } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Trophy } from 'lucide-react'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug })
  
  if (!post) return { title: 'Prestasi Tidak Ditemukan' }

  return {
    title: `${post.title} | Prestasi Ponpes DDI`,
    description: post.summary,
    openGraph: {
      images: post.featuredImage ? [urlForImage(post.featuredImage).url()] : [],
    },
  }
}

// Komponen styling sama, hanya warna blockquote diganti kuning biar beda dikit
const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => (
      <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || 'Gambar ilustrasi'}
          fill
          className="object-contain bg-gray-50"
        />
      </div>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-l-4 border-yellow-500 pl-4">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="mb-4 text-gray-700 leading-relaxed text-lg">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-6 italic bg-yellow-50 text-gray-700 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => <ul className="mt-2 mb-6 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: { children?: React.ReactNode }) => <ol className="mt-2 mb-6 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href || '#'} className="text-yellow-600 font-bold hover:underline decoration-2 underline-offset-2">
        {children}
      </a>
    ),
  },
}

export default async function AchievementDetailPage({ params }: Props) {
  const { slug } = await params
  const post: Post = await client.fetch(postBySlugQuery, { slug })

  if (!post) notFound()

  return (
    <article className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0 bg-black/60 z-10" /> 
        {post.featuredImage ? (
           <Image
             src={urlForImage(post.featuredImage).url()}
             alt={post.title}
             fill
             className="object-cover"
             priority
           />
        ) : (
           <div className="w-full h-full bg-yellow-900" />
        )}
        
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12 md:pb-20">
            <Link 
                href="/achievements" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Daftar Prestasi
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4 text-sm md:text-base font-medium">
                <span className="bg-[#FFD700] px-3 py-1 rounded-full text-black font-bold flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Prestasi
                </span>
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl font-heading drop-shadow-lg">
                {post.title}
            </h1>
        </div>
      </div>

      {/* Konten */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
            {post.summary && (
                <p className="text-xl md:text-2xl text-gray-600 font-medium mb-10 leading-relaxed border-b border-yellow-200 pb-10">
                    {post.summary}
                </p>
            )}

            <div className="prose prose-lg prose-yellow max-w-none">
                {post.content && <PortableText value={post.content} components={myPortableTextComponents} />}
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200">
                <Link 
                    href="/achievements"
                    className="inline-flex items-center justify-center px-6 py-3 bg-yellow-100 text-yellow-800 font-bold rounded-full hover:bg-yellow-200 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Lihat Prestasi Lainnya
                </Link>
            </div>
        </div>
      </div>
    </article>
  )
}