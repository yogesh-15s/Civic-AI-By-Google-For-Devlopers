import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

function getBackendUrl() {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

  if (!configured) {
    return 'http://localhost:5000';
  }

  if (configured.startsWith('http://') || configured.startsWith('https://')) {
    return configured;
  }

  return `https://${configured}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const res = await fetch(`${getBackendUrl()}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || '',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy Chat Error:", error);
    return NextResponse.json({ message: "Failed to connect to AI backend" }, { status: 502 });
  }
}
