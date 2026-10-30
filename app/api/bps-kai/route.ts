import { NextResponse } from "next/server";

export async function GET() {
  const apiKey =
    process.env.BPS_API_KEY ||
    "557ff0af4088aa2b6e0829a74787e3ee0fb8474f466d5f5b56a319f682baca2b";

  try {
    // Panggil BPS WebAPI untuk daftar tabel resmi transportasi kereta api
    const url = `https://webapi.bps.go.id/v1/api/list/model/statictable/domain/0000/keyword/kereta/key/${apiKey}/`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache selama 1 jam
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

    // Masking API Key untuk keamanan tampilan
    const maskedKey = apiKey
      ? `${apiKey.slice(0, 8)}...${apiKey.slice(-6)}`
      : "Not set";

    const tables = data.data?.[1] || [];

    return NextResponse.json({
      status: "connected",
      message: "Berhasil terhubung ke WebAPI Badan Pusat Statistik (BPS)",
      provider: "Badan Pusat Statistik (BPS)",
      dataOrigin: "PT Kereta Api (Persero)",
      apiKeyMasked: maskedKey,
      totalTables: data.data?.[0]?.total || tables.length,
      tables: tables.map((t: { table_id: number; title: string; updt_date: string; size: string }) => ({
        id: t.table_id,
        title: t.title,
        updatedAt: t.updt_date,
        size: t.size,
      })),
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

