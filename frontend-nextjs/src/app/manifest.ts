export default function manifest() {
  return {
    name: "Atlas Digitalize",
    short_name: "Atlas",
    description: "IT Consulting & Custom Software Solutions",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
