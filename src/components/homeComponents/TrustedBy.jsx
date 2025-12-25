"use client";

import Image from "next/image";

const partners = [
  { name: "Onblue", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623476/Vector_tisp0p.png" },
  { name: "Miro", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/Vector-1_ofzjwr.png" },
  { name: "Feedly", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623472/Group_m2zvyv.png" },
  { name: "HubSpot", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/Shape_wcgg8f.png" },
  { name: "MailerLite", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623476/Layer_2_zncgr4.png" },
  { name: "Finsweet", src: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/Vector-2_zpsnlw.png" },
];

export default function TrustedBy() {
  return (
    <section className="py-4 bg-[#0F1121] overflow-hidden">
      <div className="container mx-auto px-4 relative">

        {/* Gradient Masks for fade effect */}


        <div className="marquee-container hover:[animation-play-state:paused] flex w-max">
          {/* First set of logos */}
          <div className="flex items-center gap-16 px-8">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center h-12 w-32 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-6 md:h-8 w-auto object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Second set of logos (Duplicate for seamless loop) */}
          <div className="flex items-center gap-16 px-8">
            {partners.map((partner) => (
              <div key={`${partner.name}-duplicate`} className="flex items-center justify-center h-12 w-32 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-6 md:h-8 w-auto object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>
          {/* Third set of logos (Extra Buffer for wide screens) */}
          <div className="flex items-center gap-16 px-8">
            {partners.map((partner) => (
              <div key={`${partner.name}-duplicate-2`} className="flex items-center justify-center h-12 w-32 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-6 md:h-8 w-auto object-contain cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .marquee-container {
            animation: scroll 30s linear infinite;
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%); /* Move by 1/3 since we have 3 sets */
            }
          }
        `}</style>
      </div>
    </section>
  );
}