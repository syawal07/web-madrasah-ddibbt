import { client } from '@/lib/sanity.client'
import groq from 'groq'
import { Teacher } from '@/types/Teacher'
import Image from 'next/image'
import { UserCircle, GraduationCap, Sparkles } from 'lucide-react'

export const revalidate = 60

async function getTeachers(): Promise<Teacher[]> {
  const query = groq`
    *[_type == "teacher"] | order(sortOrder asc, name asc) {
      _id,
      name,
      subject,
      photo { asset->{url} }
    }
  `
  return client.fetch(query)
}

export default async function TeachersPage() {
  const teachers = await getTeachers()

  // SAYA HAPUS VARIABEL 'limeColor' DISINI AGAR TIDAK ERROR
  
  return (
    <div className="bg-white min-h-screen">
      
      {/* --- HEADER SECTION (PUTIH BERSIH) --- */}
      <div className="container mx-auto px-4 pt-20 pb-12 text-center">
        {/* Badge kecil pemanis */}
        <span className="inline-block py-1 px-3 rounded-full bg-green-50 text-[#006400] text-sm font-bold mb-4 border border-green-100">
          TIM PENGAJAR
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight text-[#006400]">
          Guru & Tenaga Pendidik
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
          Mengenal lebih dekat para asatidz dan asatidzah yang berdedikasi membimbing santri 
          menuju keunggulan akhlak dan intelektual.
        </p>
        
        {/* Garis dekorasi kecil di bawah teks */}
        <div className="w-24 h-1.5 bg-[#a3e635] mx-auto mt-8 rounded-full"></div>
      </div>

      {/* --- GRID TEACHERS --- */}
      <div className="container mx-auto px-4 pb-24">
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="group relative bg-white rounded-2xl flex flex-col items-center p-6 transition-all duration-300 hover:-translate-y-2 border border-gray-100 shadow-lg hover:shadow-2xl"
              >
                {/* Dekorasi Garis Atas (Kuning Kehijauan) */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#006400] to-[#a3e635] rounded-t-2xl"></div>

                {/* 1. Photo Container */}
                <div className="relative mt-6 mb-6">
                    {/* Circle Border Effect */}
                    <div className="w-36 h-36 rounded-full p-1.5 bg-white border-2 border-gray-100 shadow-md group-hover:border-[#a3e635] transition-colors duration-300">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-50">
                            {teacher.photo?.asset?.url ? (
                                <Image
                                src={teacher.photo.asset.url}
                                alt={teacher.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <UserCircle className="w-20 h-20" />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Badge Ikon Bintang */}
                    <div className="absolute bottom-1 right-1 bg-[#a3e635] p-1.5 rounded-full border-2 border-white shadow-sm text-[#006400]">
                        <Sparkles className="w-4 h-4" />
                    </div>
                </div>

                {/* 2. Content (Nama & Jabatan) */}
                <div className="text-center w-full">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#006400] transition-colors mb-2">
                    {teacher.name}
                  </h3>
                  
                  <div className="flex justify-center">
                     {/* Pill Jabatan */}
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#f7fee7] text-[#4d7c0f] text-sm font-bold tracking-wide border border-[#a3e635]/30">
                        {teacher.subject}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 max-w-xl mx-auto">
            <GraduationCap className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              Belum Ada Data Guru
            </h3>
            <p className="text-gray-500 mt-2">
              Admin dapat menambahkan data melalui panel Sanity.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}