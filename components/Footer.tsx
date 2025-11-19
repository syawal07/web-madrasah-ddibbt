export default function Footer() {
  return (
    <footer className="bg-[#006400] text-white p-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Pondok Pesantren Ashshirathal Mustaqim DDI. All rights reserved.</p>
        <p className="mt-2 text-sm">Jalan Raya Baru-Baru Tanga, Kab. Pangkep, Sulawesi Selatan</p>
      </div>
    </footer>
  );
}