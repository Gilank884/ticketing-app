"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient"; // pastikan sudah ada file supabaseClient.ts

type Banner = {
  id: number;
  image: string; // URL gambar dari bucket Supabase
  link: string;
};

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  // Fetch data dari tabel Supabase
  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase.from("banners").select("*");
      if (error) {
        console.error("Error fetching banners:", error);
      } else {
        setBanners(data || []);
      }
    };

    fetchBanners();
  }, []);

  // Auto slide tiap 4 detik
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (banners.length === 0) {
    return <p className="text-center text-gray-500">Loading banners...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 relative">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 absolute"
          }`}
        >
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <Image
              src={banner.image}
              alt={`Banner ${banner.id}`}
              width={600}
              height={300}
              className="rounded-xl w-full object-cover"
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
