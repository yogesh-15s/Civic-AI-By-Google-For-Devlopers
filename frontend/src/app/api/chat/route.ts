import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

/**
 * Secure proxy for the Gemini AI chat backend.
 * - Validates the user session (NextAuth) before forwarding.
 * - Attaches the INTERNAL_API_KEY server-side so it's never exposed to the client.
 * - Forwards the request to the Express backend which uses Google Gemini API.
 */
function getBackendUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
  if (!configured) return 'http://localhost:5000';
  if (configured.startsWith('http://') || configured.startsWith('https://')) {
    return configured.replace(/\/$/, '');
  }
  return `https://${configured}`;
}

export async function POST(request: Request) {
  // Authentication gate — only signed-in users can use the AI
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Please sign in to use the AI chat." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON in request body." }, { status: 400 });
  }

  try {
    const res = await fetch(`${getBackendUrl()}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Internal API key is never exposed to the browser
        'x-api-key': process.env.INTERNAL_API_KEY || '',
      },
      body: JSON.stringify(body),
      // Prevent hanging requests
      signal: AbortSignal.timeout(30_000),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (error: unknown) {
    const isTimeout = error instanceof Error && error.name === 'TimeoutError';
    console.error("Chat proxy error:", isTimeout ? 'Request timed out' : error);
    return NextResponse.json(
      { message: isTimeout ? "The AI took too long to respond. Please try again." : "Failed to connect to AI backend." },
      { status: isTimeout ? 504 : 502 }
    );
  }
}
