"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../../../lib/supabaseClient";

type Event = {
  id: number;
  title: string;
  image: string;
  title1?: string;
  price1?: number;
  title2?: string;
  price2?: number;
  title3?: string;
  price3?: number;
  title4?: string;
  price4?: number;
  title5?: string;
  price5?: number;
};

export default function TicketPage() {
  const params = useParams();
  const id = params?.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [tickets, setTickets] = useState<
    { title: string; price: number; qty: number }[]
  >([]);

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
        return;
      }

      if (data) {
        const imgUrl = `${supabaseUrl}/storage/v1/object/public${data.image}`;
        setEvent({ ...data, image: imgUrl });

        const categories = [];
        for (let i = 1; i <= 5; i++) {
          const title = data[`title${i}`];
          const price = data[`price${i}`];
          if (title && price) {
            categories.push({ title, price, qty: 0 });
          }
        }
        setTickets(categories);
      }
    };

    fetchEvent();
  }, [id, supabaseUrl]);

  const handleAdd = (i: number) => {
    const newTickets = [...tickets];
    newTickets[i].qty += 1;
    setTickets(newTickets);
  };

  const handleRemove = (i: number) => {
    const newTickets = [...tickets];
    if (newTickets[i].qty > 0) {
      newTickets[i].qty -= 1;
      setTickets(newTickets);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event?.id,
          items: tickets.filter((t) => t.qty > 0),
          total: totalPrice,
        }),
      });

      const data = await res.json();
      if (data?.invoice_url) {
        window.location.href = data.invoice_url; // redirect ke Xendit
      } else {
        alert("Gagal membuat invoice.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Terjadi kesalahan saat checkout.");
    }
  };

  const totalQty = tickets.reduce((sum, t) => sum + t.qty, 0);
  const totalPrice = tickets.reduce((sum, t) => sum + t.qty * t.price, 0);

  if (!event) return <p className="text-center">Loading...</p>;

  return (
    <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Kiri: daftar tiket */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-red-950 mb-4">{event.title}</h1>
        {tickets.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center border rounded-lg p-4 shadow"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-red-600">Rp {t.price.toLocaleString()}</p>
            </div>

            {/* Tombol + Jumlah - */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRemove(i)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="min-w-[24px] text-center">{t.qty}</span>
              <button
                onClick={() => handleAdd(i)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Kanan: ringkasan */}
      <div className="border rounded-lg shadow p-4 space-y-4">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-red-950">Ringkasan</p>
          <p>Total Tiket: {totalQty}</p>
          <p>Total Harga: Rp {totalPrice.toLocaleString()}</p>
        </div>

        <button
          disabled={totalQty === 0}
          onClick={handleCheckout}
          className={`w-full py-2 px-4 rounded-lg text-white ${
            totalQty === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
