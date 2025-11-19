import Image from 'next/image'
import { SiteSettings } from '@/types/Sanity'
import { ArrowRight } from 'lucide-react' // Opsional: Tambah ikon biar manis

type Props = {
  settings: SiteSettings | null
}

export default function Jumbotron({ settings }: Props) {
  if (!settings) return null

  return (
    <div className="relative w-full h-[80vh] md:h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE */}
      {settings.jumbotronImage?.asset?.url ? (
        <Image
          src={settings.jumbotronImage.asset.url}
          alt="Jumbotron Pondok Pesantren"
          fill
          // PERUBAHAN PENTING DISINI:
          // object-[center_35%] -> Mengatur fokus gambar agar agak ke atas sedikit (tidak turun)
          className="z-0 object-cover object-[center_85%]"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-700 z-0"></div>
      )}

      {/* 2. ELEGANT OVERLAY (Pengganti brightness-50) */}
      {/* Membuat efek gelap di atas dan bawah, tapi agak terang di tengah agar wajah santri (jika ada) tetap terlihat samar */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* 3. TEXT CONTENT */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Badge Kecil (Opsional - Menambah estetika) */}
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium tracking-wider mb-2">
            BERILMU • BERAMAL • BERTAKWA
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
            {settings.jumbotronTitle || 'Selamat Datang'}
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            {settings.jumbotronSubtitle || 'Website Resmi Pondok Pesantren DDI'}
          </p>

          <div className="pt-8">
            <a
              href="/about"
              className="group relative inline-flex items-center px-8 py-4 bg-[#FFD700] text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 hover:shadow-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Selengkapnya Tentang Kami</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}