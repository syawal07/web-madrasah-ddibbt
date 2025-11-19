'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

type Props = {
  adminPhone?: string
}

export default function ContactForm({ adminPhone }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Fungsi Kirim ke WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // 1. Validasi Nomor Admin
    // Jika admin belum set nomor di Sanity, pakai nomor default/dummy
    const targetPhone = adminPhone ? adminPhone.replace(/[^0-9]/g, '') : '6281234567890'

    // 2. Format Pesan WhatsApp
    // %0A adalah kode untuk Enter (Baris baru) di URL
    const text = `Halo Admin Pondok Pesantren DDI, %0A` +
      `Saya ingin bertanya melalui Website.%0A%0A` +
      `Nama: ${formData.name}%0A` +
      `No. HP: ${formData.phone}%0A` +
      `Pesan: ${formData.message}`

    // 3. Buka WhatsApp
    const url = `https://wa.me/${targetPhone}?text=${text}`
    
    // Jeda sedikit agar user melihat efek loading (UX)
    setTimeout(() => {
      window.open(url, '_blank')
      setIsLoading(false)
      // Opsional: Reset form setelah kirim
      setFormData({ name: '', phone: '', message: '' })
    }, 1000)
  }

  return (
    <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h3>
      <p className="text-gray-600 mb-8">
        Silakan isi formulir di bawah, pesan akan otomatis terkirim ke WhatsApp Admin.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" 
            placeholder="Nama Bapak/Ibu/Santri" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp Pengirim</label>
          <input 
            type="tel" 
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" 
            placeholder="Contoh: 0812..." 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pesan / Pertanyaan</label>
          <textarea 
            name="message"
            required
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006400] focus:border-transparent outline-none transition-all" 
            placeholder="Tulis pertanyaan Anda di sini..."
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-4 bg-[#006400] text-white font-bold rounded-lg shadow-lg hover:bg-green-800 transition-all flex justify-center items-center group disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Membuka WhatsApp...
            </>
          ) : (
            <>
              Kirim Pesan Sekarang
              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}