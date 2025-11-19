import { client } from '@/lib/sanity.client'
import groq from 'groq'
import { SiteSettings } from '@/types/Sanity'
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react'
import ContactForm from '@/components/ContactForm' // Import komponen baru

export const revalidate = 60

async function getContactSettings(): Promise<SiteSettings> {
  return client.fetch(groq`
    *[_type == "siteSettings"][0] {
      footerAddress,
      footerPhone,
      footerEmail,
      googleMapsUrl,
      instagram,
      facebook,
      youtube
    }
  `)
}

export default async function ContactPage() {
  const settings = await getContactSettings()

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header Section */}
      <div className="bg-[#006400] py-20 text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
          Hubungi Kami
        </h1>
        <p className="max-w-2xl mx-auto text-green-100 text-lg">
          Kami siap melayani pertanyaan Anda seputar pendaftaran santri baru, 
          program pendidikan, atau informasi lainnya.
        </p>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-16">
        
        {/* Kartu Kontak Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Kartu Alamat */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 text-[#006400] rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Alamat</h3>
            <p className="text-gray-600 leading-relaxed">
              {settings.footerAddress || 'Alamat belum diatur di admin.'}
            </p>
          </div>

          {/* Kartu Telepon */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 text-[#006400] rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Telepon / WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              {settings.footerPhone || '-'}
            </p>
            {settings.footerPhone && (
              <a 
                href={`https://wa.me/${settings.footerPhone.replace(/[^0-9]/g, '')}`} 
                target="_blank"
                className="inline-block px-6 py-2 bg-[#006400] text-white rounded-full text-sm font-bold hover:bg-green-800 transition-colors"
              >
                Chat WhatsApp
              </a>
            )}
          </div>

          {/* Kartu Email & Sosmed */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 text-[#006400] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Email & Sosial Media</h3>
            <p className="text-gray-600 mb-6">
              {settings.footerEmail || '-'}
            </p>
            <div className="flex justify-center space-x-4">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" className="text-gray-400 hover:text-pink-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" className="text-gray-400 hover:text-red-600 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Section Peta & Form */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Peta Google Maps */}
          <div className="w-full lg:w-1/2 min-h-[400px] bg-gray-200 relative">
            {settings.googleMapsUrl ? (
              <iframe 
                src={settings.googleMapsUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 p-10 text-center">
                <p>Peta belum diatur. Masukkan link embed Google Maps di Sanity Admin.</p>
              </div>
            )}
          </div>

          {/* Formulir Kontak (Yang sudah berfungsi) */}
          {/* Kita oper nomor HP dari database ke komponen form */}
          <ContactForm adminPhone={settings.footerPhone} />

        </div>
      </div>
    </div>
  )
}