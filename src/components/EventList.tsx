"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  price: string;
  image: string; // URL gambar (misalnya dari bucket Supabase)
};

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (events.length === 0) {
    return <p className="text-center text-gray-500">No events available.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {events.map((event) => (
        <div
          key={event.id}
          className="border rounded-xl overflow-hidden shadow hover:shadow-lg"
        >
          <Image
            src={event.image}
            alt={event.title}
            width={400}
            height={250}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-red-950 text-lg">{event.title}</h3>
            <p className="text-sm text-red-600">{event.date}</p>
            <p className="text-sm text-red-600">{event.location}</p>
            <p className="mt-2 text-red-950 font-semibold">{event.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
