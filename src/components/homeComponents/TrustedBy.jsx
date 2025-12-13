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
    <section className="py-3 bg-[#0F1121]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-12 gap-y-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="hover:scale-110 transition-transform duration-300"
            >
              <img
                src={partner.src}
                alt={partner.name}
                width={100}
                height={40}
                className="h-6 md:h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}