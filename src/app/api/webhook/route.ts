import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Webhook diterima dari Xendit:", body);

    const {
      id: invoice_id,
      external_id,
      status,
      amount,
      paid_amount,
      payer_email,
      description,
    } = body;

    // Simpan transaksi ke tabel "payments"
    const { error } = await supabase.from("payments").insert([
      {
        invoice_id,
        external_id,
        status,
        amount,
        paid_amount,
        payer_email,
        description,
      },
    ]);

    if (error) {
      console.error("❌ Gagal menyimpan ke Supabase:", error);
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }

    // Kalau status PAID, kamu bisa update tiket atau stok event
    if (status === "PAID") {
      // contoh: update kolom sold_tickets di tabel events
      const eventId = external_id?.split("-")[1]; // event-{id}-{timestamp}
      if (eventId) {
        await supabase.rpc("increment_ticket_sales", { event_id: eventId });
      }
    }

    // ✅ Xendit butuh 200 response supaya tidak retry webhook
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Error parsing webhook:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
