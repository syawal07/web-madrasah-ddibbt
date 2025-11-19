import { Statistic } from '@/types/Sanity'
import React from 'react'
import { 
  Users, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  Building2, 
  Star, 
  Smile,
  LibraryBig
} from 'lucide-react'

type Props = {
  stats: Statistic[]
}

const iconMap: Record<string, React.ElementType> = {
  "Users": Users,
  "BookOpen": BookOpen,
  "Trophy": Trophy,
  "GraduationCap": GraduationCap,
  "Building": Building2,
  "Star": Star,
  "Smile": Smile,
  "Library": LibraryBig
}

export default function Statistics({ stats }: Props) {
  if (!stats || stats.length === 0) return null

  return (
    // UBAH 1: Background jadi Putih, border bawah tipis agar rapi
    <section className="relative bg-white py-16 border-b border-gray-200 overflow-hidden">
      
      {/* Dekorasi Background Halus (Abu-abu sangat muda) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-yellow-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* UBAH 2: Ganti Grid jadi Flex agar item selalu di tengah (Balance) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.iconName || 'Star'] || Star

            return (
              <div 
                key={stat._id} 
                // Set min-width agar tidak terlalu gepeng di HP
                className="group flex flex-col items-center p-4 w-40 md:w-56 transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Lingkaran Ikon: Sekarang background hijau muda, ikon hijau tua */}
                <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#006400] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-[#006400] group-hover:text-white transition-colors" />
                </div>

                {/* Angka Statistik: Hitam/Abu gelap agar jelas */}
                <h3 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight text-gray-900">
                  {stat.value}
                </h3>

                {/* Judul Statistik: Abu-abu */}
                <p className="text-gray-500 text-sm md:text-base font-medium uppercase tracking-wider">
                  {stat.title}
                </p>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}