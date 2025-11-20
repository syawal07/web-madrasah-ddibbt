'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Fungsi untuk menutup menu saat link diklik
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="bg-[#006400] text-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* LOGO AREA */}
          <Link href="/" className="flex items-center space-x-3 z-50" onClick={closeMenu}>
            <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
              <Image
                src="/logoddi.png" // Pastikan file ini ada di folder public
                alt="Logo Pondok DDI"
                fill
                className="rounded-full object-cover bg-white"
              />
            </div>
            <div className="flex flex-col">
              {/* Judul Utama */}
              <span className="font-bold text-sm md:text-xl leading-tight max-w-[200px] md:max-w-none">
                Pondok Pesantren DDI
              </span>
              
              {/* PERBAIKAN DISINI: 
                  Saya menghapus 'hidden sm:block' dan menggantinya menjadi 'block'.
                  Sekarang teks ini akan MUNCUL di HP, Tablet, dan Laptop. 
              */}
              <span className="text-[10px] md:text-sm text-green-100 block leading-tight">
                Ashshirathal Mustaqim Baru-Baru Tanga
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU (Hidden di HP) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {[
              { name: 'Beranda', path: '/' },
              { name: 'Tentang Kami', path: '/about' },
              { name: 'Guru', path: '/teachers' },
              { name: 'Berita', path: '/berita' },
              { name: 'Prestasi', path: '/achievements' },
              { name: 'Galeri', path: '/gallery' },
              { name: 'Kontak', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-[#FFD700] transition-colors relative group"
              >
                {link.name}
                {/* Garis bawah animasi saat hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none p-2 hover:bg-green-800 rounded-md transition-colors z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU (Muncul saat isOpen = true) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#005000] border-t border-green-600 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {[
            { name: 'Beranda', path: '/' },
            { name: 'Tentang Kami', path: '/about' },
            { name: 'Guru', path: '/teachers' },
            { name: 'Berita', path: '/berita' },
            { name: 'Prestasi', path: '/achievements' },
            { name: 'Galeri', path: '/gallery' },
            { name: 'Kontak', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={closeMenu} // Menu nutup pas diklik
              className="block px-4 py-2 hover:bg-[#006400] hover:text-[#FFD700] rounded-lg transition-colors text-base font-medium border-b border-green-700/30 last:border-0"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}