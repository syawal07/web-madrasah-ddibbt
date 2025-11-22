import { client } from '@/lib/sanity.client'
import groq from 'groq'
import { SiteSettings } from '@/types/Sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { MapPin, Target, History, Network } from 'lucide-react'

export const revalidate = 60

async function getSettings(): Promise<SiteSettings> {
  return client.fetch(groq`
    *[_type == "siteSettings"][0] {
      ...,
      aboutImage { asset->{url} },
      visionImage { asset->{url} },
      historyImage { asset->{url} },
      structureImage { asset->{url} }
    }
  `)
}

export default async function AboutPage() {
  const data = await getSettings()

  if (!data) return null

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* HEADER HERO */}
      <div className="bg-[#006400] pt-24 pb-16 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Profil Pondok</h1>
        <p className="text-green-100 max-w-2xl mx-auto text-lg">
          Mengenal lebih dalam identitas, visi, misi, dan sejarah perjalanan 
          Pondok Pesantren dalam mencerdaskan kehidupan bangsa.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION (Sticky) */}
          <div className="hidden lg:block w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 text-lg border-b pb-2">Daftar Isi</h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                <li><a href="#identitas" className="flex items-center hover:text-[#006400] transition-colors"><MapPin className="w-4 h-4 mr-2"/> Identitas Sekolah</a></li>
                <li><a href="#visimisi" className="flex items-center hover:text-[#006400] transition-colors"><Target className="w-4 h-4 mr-2"/> Visi & Misi</a></li>
                <li><a href="#sejarah" className="flex items-center hover:text-[#006400] transition-colors"><History className="w-4 h-4 mr-2"/> Sejarah Singkat</a></li>
                <li><a href="#struktur" className="flex items-center hover:text-[#006400] transition-colors"><Network className="w-4 h-4 mr-2"/> Struktur Organisasi</a></li>
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="w-full lg:w-3/4 space-y-12">
            
            {/* 1. IDENTITAS SEKOLAH */}
            <section id="identitas" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-lg text-[#006400] mr-4">
                   <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Identitas Sekolah</h2>
              </div>
              
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50"><td className="p-4 font-semibold text-gray-700 w-1/3">Nama Sekolah</td><td className="p-4 text-gray-800 font-bold">{data.schoolName || '-'}</td></tr>
                    <tr className="bg-white"><td className="p-4 font-semibold text-gray-700">NSM</td><td className="p-4 text-gray-800">{data.nsm || '-'}</td></tr>
                    <tr className="bg-gray-50"><td className="p-4 font-semibold text-gray-700">NPSN</td><td className="p-4 text-gray-800">{data.npsn || '-'}</td></tr>
                    <tr className="bg-white"><td className="p-4 font-semibold text-gray-700">Alamat</td><td className="p-4 text-gray-800">{data.addressStreet || '-'}</td></tr>
                    <tr className="bg-gray-50"><td className="p-4 font-semibold text-gray-700">Kecamatan</td><td className="p-4 text-gray-800">{data.addressDistrict || '-'}</td></tr>
                    <tr className="bg-white"><td className="p-4 font-semibold text-gray-700">Kabupaten/Kota</td><td className="p-4 text-gray-800">{data.addressRegency || '-'}</td></tr>
                    <tr className="bg-gray-50"><td className="p-4 font-semibold text-gray-700">Provinsi</td><td className="p-4 text-gray-800">{data.addressProvince || '-'}</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. VISI & MISI */}
            <section id="visimisi" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
               <div className="flex items-center mb-8">
                <div className="p-3 bg-yellow-100 rounded-lg text-yellow-700 mr-4">
                   <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Visi & Misi</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                 {data.visionImage?.asset?.url && (
                    <div className="w-full md:w-1/3 relative h-64 rounded-xl overflow-hidden shadow-md">
                        <Image src={data.visionImage.asset.url} alt="Visi Misi" fill className="object-cover" />
                    </div>
                 )}
                 <div className="w-full md:w-2/3">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-[#006400] mb-3">Visi</h3>
                        {/* PERBAIKAN DISINI: Menggunakan &ldquo; dan &rdquo; pengganti " */}
                        <p className="text-gray-700 text-lg italic bg-green-50 p-4 rounded-lg border-l-4 border-[#006400]">
                            &ldquo;{data.vision}&rdquo;
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#006400] mb-3">Misi</h3>
                        <div className="prose prose-green text-gray-700">
                             {data.mission && <PortableText value={data.mission} />}
                        </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* 3. SEJARAH SINGKAT */}
            <section id="sejarah" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
               <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-700 mr-4">
                   <History className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Sejarah Singkat</h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700">
                {data.historyImage?.asset?.url && (
                    <div className="float-none md:float-right ml-0 md:ml-6 mb-6 w-full md:w-1/2 h-64 relative rounded-xl overflow-hidden shadow-lg">
                         <Image src={data.historyImage.asset.url} alt="Sejarah" fill className="object-cover" />
                    </div>
                )}
                {data.historyText && <PortableText value={data.historyText} />}
              </div>
            </section>

             {/* 4. STRUKTUR ORGANISASI */}
             <section id="struktur" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
               <div className="flex items-center mb-6">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-700 mr-4">
                   <Network className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Struktur Organisasi</h2>
              </div>

              {data.structureImage?.asset?.url ? (
                  <div className="relative w-full h-[500px] md:h-[700px] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                       <Image 
                          src={data.structureImage.asset.url} 
                          alt="Struktur Organisasi" 
                          fill 
                          className="object-contain p-4" 
                       />
                  </div>
              ) : (
                  <p className="text-gray-500 italic text-center py-10">Gambar struktur organisasi belum diupload.</p>
              )}
              {data.structureText && (
                  <p className="mt-4 text-center text-gray-600">{data.structureText}</p>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}