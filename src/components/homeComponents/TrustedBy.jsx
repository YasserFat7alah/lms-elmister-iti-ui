import Image from "next/image";

const partners = [
  { name: "Onblue", src: "/Vector.png" },
  { name: "Miro", src: "/Vector-1.png" },
  { name: "Feedly", src: "/Group.png" },
  { name: "HubSpot", src: "/Shape.png" },
  { name: "MailerLite", src: "/Layer 2.png" },
  { name: "Finsweet", src: "/Vector-2.png" },
];

export default function TrustedBy() {
  return (
    <section className="py-6 bg-[#0F1121]">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-center text-gray-600 text-[10px] md:text-xs font-medium mb-4">
          Trusted by the world&apos;s leading companies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
            >
              <img
                src={partner.src}
                alt={partner.name}
                width={100}
                height={40}
                className="h-5 md:h-6 w-auto object-contain"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}