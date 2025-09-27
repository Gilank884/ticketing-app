import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid or missing JSON body" },
        { status: 400 }
      );
    }

    const { items, total, eventId } = body;

    const res = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(process.env.XENDIT_SECRET_KEY + ":").toString("base64"),
      },
      body: JSON.stringify({
        external_id: `event-${eventId}-${Date.now()}`,
        amount: total,
        payer_email: "customer@email.com", // TODO: ambil dari login form
        description: `Pembelian tiket untuk event ${eventId}`,
        success_redirect_url: "https://hai-ticket.netlify.app", // ganti domain prod
        failure_redirect_url: "https://hai-ticket.netlify.app",
      }),
    });

    const invoice = await res.json();
    return NextResponse.json(invoice);
  } catch (err) {
    console.error("Xendit error:", err);
    return NextResponse.json(
      { error: "Gagal membuat invoice" },
      { status: 500 }
    );
  }
}
