export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-24 flex justify-center">
      <div className="relative bg-white backdrop-blur-xl rounded-2xl p-8 border border-gray-800 max-w-2xl w-full text-center">
        {/* Corner Borders */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-red-500 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-red-400 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-500 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500 rounded-br-2xl"></div>

        {/* Content */}
        <div className="relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-sm text-white">
            Pembayaran Berhasil
          </div>

          <h2 className="text-3xl font-bold mb-2 text-white">
            Tiket Kamu Aman 
          </h2>
          <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-t from-pink-500 via-red-400 to-yellow-500">
            Cek Email untuk Detail Tiket
          </h3>
          <p className="text-lg text-black mb-8">
            Terima kasih sudah melakukan pembelian.  
            Kami tunggu kehadiranmu di acara nanti 
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-t from-red-500 via-red-400 to-yellow-500 hover:opacity-90 transition-opacity text-white"
            >
               Kembali ke Beranda
            </a>

            <a
              href="/my-tickets"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-700 hover:border-red-500 transition-colors text-black"
            >
               Lihat Tiket
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
