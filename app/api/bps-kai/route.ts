import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.BPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        status: "disabled",
        message: "Kunci BPS_API_KEY tidak dikonfigurasi di lingkungan server.",
      },
      { status: 400 }
    );
  }

  try {
    // Panggil BPS WebAPIi secara aman di sisi server tanpa mengekspos API Key ke client
    const url = `https://webapi.bps.go.id/v1/api/list/model/statictable/domain/0000/keyword/kereta/key/${encodeURIComponent(
      apiKey
    )}/`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache server selama 1 jam untuk hemat kuota dan performa
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          status: "error",
          message: `Server BPS merespons dengan status: ${res.status}`,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    const tables = data.data?.[1] || [];

    // Response publik ke client tanpa mengekspos kunci API apa pun
    return NextResponse.json({
      status: "connected",
      message: "Server terhubung resmi ke WebAPI Badan Pusat Statistik (BPS)",
      provider: "Badan Pusat Statistik (BPS)",
      dataOrigin: "PT Kereta Api (Persero)",
      connectionType: "Server-to-Server (Encrypted HTTPS)",
      totalTables: data.data?.[0]?.total || tables.length,
      tables: tables.map(
        (t: {
          table_id: number;
          title: string;
          updt_date: string;
          size: string;
        }) => ({
          id: t.table_id,
          title: t.title,
          updatedAt: t.updt_date,
          size: t.size,
        })
      ),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Gagal menghubungi server WebAPI BPS",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
