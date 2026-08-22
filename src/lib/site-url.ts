export function getGangUrl(subdomain: string) {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname.endsWith(".localhost")) {
      return `http://${subdomain}.localhost:${window.location.port || "3000"}`;
    }
  }

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "lastname.site";
  return `https://${subdomain}.${rootDomain}`;
}
