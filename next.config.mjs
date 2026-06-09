/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/dlya-doma", destination: "/home-heating", permanent: true },
      { source: "/dlya-biznesa", destination: "/business-heating", permanent: true },
      {
        source: "/sravnenie-s-gazom",
        destination: "/gas-heating-comparison",
        permanent: true,
      },
      {
        source: "/sravnenie-s-elektrichestvom",
        destination: "/electric-heating-comparison",
        permanent: true,
      },
      { source: "/kalkulyator", destination: "/calculator", permanent: true },
      { source: "/gpu-otoplenie", destination: "/gpu", permanent: true },
      { source: "/gpu-heat-recovery", destination: "/gpu", permanent: true },
      { source: "/gibridnoe-otoplenie", destination: "/engineering", permanent: true },
      { source: "/kontakty", destination: "/contacts", permanent: true },
      { source: "/podshipniki", destination: "/bearings", permanent: true },
    ];
  },
};

export default nextConfig;
