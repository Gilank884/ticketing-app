"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="w-full shadow">
      {/* Top bar */}
      

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-red-700">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="text-2xl font-bold text-white">HaiTicket</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 mx-6 max-w-xl">
          <input
            type="text"
            placeholder="Cari berdasarkan artis, atau nama tempat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-700"
          />
          <button className="bg-red-600 text-white px-4 rounded-r-md flex items-center justify-center">
            <FiSearch size={20} />
          </button>
        </div>

        {/* Language + Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-1 border rounded px-2 py-1">
            <span role="img" aria-label="flag">🇮🇩</span>
            <span className="text-sm">ID</span>
          </div>

          {/* Auth Buttons */}
          <button className="px-4 py-1 rounded bg-red-100 text-red-700 font-medium">
            Masuk
          </button>
          <button className="px-4 py-1 rounded bg-red-700 text-white font-semibold">
            Daftar
          </button>
        </div>
      </div>
    </header>
  );
}
