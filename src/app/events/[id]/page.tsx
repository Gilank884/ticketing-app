"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ⬅️ tambahin useRouter
import Image from "next/image";
import { supabase } from "../../../lib/supabaseClient";

type Event = {
  id: number;
  title1: string;
  date: string;
  time: string;
  location: string;
  price1: string;
  image: string;
  description: string;
  instagram: string;
};

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter(); // ⬅️ router instance
  const id = params?.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error);
      } else if (data) {
        setEvent({
          ...data,
          image: `${supabaseUrl}/storage/v1/object/public${data.image}`,
        });
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id, supabaseUrl]);

  if (loading) return <p className="text-center text-gray-500">Loading event...</p>;
  if (!event) return <p className="text-center text-red-500">Event not found.</p>;

  return (
    <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left: Banner + Deskripsi */}
      <div className="lg:col-span-2">
        <Image
          src={event.image}
          alt={event.title1}
          width={1000}
          height={500}
          className="rounded-xl w-full h-[400px] object-cover"
        />

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Deskripsi</h2>
          <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
        </div>
      </div>

      {/* Right: Detail Info */}
      <div className="border rounded-xl p-6 shadow space-y-4">
        <h1 className="text-2xl font-bold">{event.title1}</h1>

        <div className="text-gray-600 space-y-1">
          <p>📅 {event.date}</p>
          <p>⏰ {event.time} WIB</p>
          <p>📍 {event.location}</p>
        </div>

        <p className="text-lg font-semibold text-red-950">
          Mulai Dari {event.price1}
        </p>

        {/* Tombol beli sekarang dengan router.push */}
        <button
          onClick={() => router.push(`/events/${id}/tickets`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Beli Sekarang
        </button>

        {event.instagram && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Media Sosial</h3>
            <a
              href={event.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border rounded-lg py-2 hover:bg-pink-100"
            >
              📸 Instagram
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
