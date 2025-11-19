import Image from 'next/image'
import Link from 'next/link'
import { SiteSettings } from '@/types/Sanity'
import { ArrowRight } from 'lucide-react' // Opsional: Tambah ikon biar cantik

type Props = {
  settings: SiteSettings | null
}

export default function AboutSection({ settings }: Props) {
  if (!settings?.aboutTitle) return null

  return (
    <div className="bg-white py-16 px-4 md:py-24"> 
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* --- BAGIAN GAMBAR --- */}
          {/* PERBAIKAN: Tambahkan 'w-full' agar di HP lebarnya 100% */}
          {/* Tambahkan 'mb-8 lg:mb-0' agar di HP ada jarak ke bawah */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0"> 
            {settings.aboutImage?.asset?.url && (
              <div className="relative w-full max-w-lg h-64 md:h-80 lg:h-96 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500"> 
                <Image
                  src={settings.aboutImage.asset.url}
                  alt="Tentang Pondok Pesantren DDI"
                  fill
                  className="object-cover"
                />
                {/* Efek border tipis agar gambar lebih tegas di background putih */}
                <div className="absolute inset-0 border border-black/5 rounded-2xl"></div>
              </div>
            )}
          </div>

          {/* --- BAGIAN TEKS --- */}
          <div className="w-full lg:w-1/2 text-gray-800"> 
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#006400] text-sm font-bold mb-4">
              PROFIL SINGKAT
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#006400] leading-tight font-heading"> 
              {settings.aboutTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600"> 
              {settings.aboutSummary}
            </p>
            
            <div className="mt-8">
              <Link 
                href="/about" 
                className="inline-flex items-center px-8 py-4 bg-[#FFD700] text-green-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 hover:shadow-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1"
              > 
                Baca Lebih Lanjut
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}