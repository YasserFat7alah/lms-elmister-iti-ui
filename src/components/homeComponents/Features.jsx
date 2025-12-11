import { FaChartLine, FaChalkboardTeacher, FaShieldAlt } from "react-icons/fa";

const features = [
  { icon: FaChartLine, title: "Track Your Child's Progress", subTitle: "Monitor grades, attendance, and learning milestones in real-time with our parent dashboard." },
  { icon: FaChalkboardTeacher, title: "Expert Teachers", subTitle: "Qualified mentors providing high-quality education and personalized guidance for your child." },
  { icon: FaShieldAlt, title: "Safe Learning Environment", subTitle: "A secure, ad-free platform designed specifically for students to focus on learning." },
];

export default function Features() {
  return (
    <section className="mt-2 py-8 px-4 sm:px-6 lg:px-8 bg-[#08131E] text-white">

      <div className="text-center mb-12">
        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-xs mb-4 transition">
          For Parents
        </button>
        <h2 className="text-3xl font-bold">
          Why Parents Trust DreamsLMS
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mt-2 text-sm">
          We partner with you to ensure your child receives the best education in a supportive environment.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center flex flex-col items-center gap-3 px-3">

              {/* Circle + Icon */}
              <div
                className={`rounded-full p-5 text-4xl transition-transform hover:scale-110 text-white ${idx === 1 ? "bg-[#FF5974]" : "bg-white/10"
                  }`}
              >
                <feature.icon />
              </div>

              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.subTitle}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}