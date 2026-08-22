const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dceeff"/><stop offset="1" stop-color="#6eb7ed"/></linearGradient></defs><rect width="64" height="64" rx="20" fill="#080a0e"/><circle cx="32" cy="32" r="21" fill="url(#bg)"/><path d="M22 39V25h5l5 7 5-7h5v14h-5v-7l-5 7-5-7v7z" fill="#0b3150"/></svg>`;

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(favicon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
    },
  });
}
