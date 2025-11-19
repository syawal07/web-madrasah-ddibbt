'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GalleryItem } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { LayoutGrid, Building2, Users } from 'lucide-react'

type Props = {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: Props) {
  const [filter, setFilter] = useState<'all' | 'kegiatan' | 'sarana'>('all')

  // Logika Filter
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true
    return item.galleryType === filter
  })

  return (
    <div>
      {/* --- TAB FILTER BUTTONS --- */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 font-bold shadow-sm
            ${filter === 'all' 
              ? 'bg-[#006400] text-white ring-4 ring-green-100' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <LayoutGrid className="w-4 h-4 mr-2" />
          Semua
        </button>

        <button
          onClick={() => setFilter('kegiatan')}
          className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 font-bold shadow-sm
            ${filter === 'kegiatan' 
              ? 'bg-[#006400] text-white ring-4 ring-green-100' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Users className="w-4 h-4 mr-2" />
          Kegiatan
        </button>

        <button
          onClick={() => setFilter('sarana')}
          className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 font-bold shadow-sm
            ${filter === 'sarana' 
              ? 'bg-[#006400] text-white ring-4 ring-green-100' 
              : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          Sarana
        </button>
      </div>

      {/* --- MASONRY GRID LAYOUT --- */}
      {/* columns-1 (HP), columns-2 (Tablet), columns-3 (Laptop) -> Efek Pinterest */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mx-auto">
        {filteredItems.map((item) => (
          <div 
            key={item._id} 
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg bg-gray-200"
          >
            {/* Gambar */}
            {item.image && (
               <Image
                 src={urlForImage(item.image).width(800).url()} // Optimize width
                 alt={item.caption}
                 width={800}
                 height={600}
                 className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
               />
            )}

            {/* Overlay Caption (Muncul saat Hover) */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2 py-1 bg-[#FFD700] text-black text-xs font-bold rounded mb-2 uppercase tracking-wider">
                  {item.galleryType}
                </span>
                <p className="text-white font-medium text-lg leading-snug">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
           <p className="text-gray-500 text-lg">Tidak ada foto ditemukan untuk kategori ini.</p>
        </div>
      )}
    </div>
  )
}