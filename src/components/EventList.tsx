"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ supaya card bisa diklik
import { supabase } from "../lib/supabaseClient";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  price1: string;
  image: string; // path dari DB, contoh: "/events/rhapsodie.jpg"
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else if (data) {
        const mapped = data.map((event: Event) => {
          return {
            ...event,
            image: `${supabaseUrl}/storage/v1/object/public${event.image}`,
          };
        });
        setEvents(mapped);
      }

      setLoading(false);
    };

    fetchEvents();
  }, [supabaseUrl]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer h-full flex flex-col">
            {/* Kotakan untuk gambar */}
            <div className="w-full aspect-[4/3] p-2 bg-white flex items-center justify-center">
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Konten */}
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-red-950 text-lg">{event.title}</h3>
              <p className="text-sm text-red-600">{event.date}</p>
              <p className="text-sm text-red-600">{event.location}</p>
              <p className="mt-auto text-red-950 font-semibold">{event.price1}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventList;
