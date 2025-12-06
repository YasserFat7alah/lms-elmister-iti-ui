"use client";

export default function Goals() {
  const metrics = [
    { label: "253,085", subtext: "Students Enrolled all over World" },
    { label: "1,205", subtext: "Total Courses on our Platform" },
    { label: "56", subtext: "Countries of Students" },
    { label: "968", subtext: "Expert Tutors From Various Fields" },
  ];

  return (
<section className=" mt-2 py-5 px-4 bg-[#08131E] text-white rounded-2xl max-w-7xl mx-auto">
      
      {/* TITLE + SUBTEXT */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">
          Acheive your Goals with DreamsLMS
        </h2>
        <p className="text-white/70 max-w-md mx-auto mt-2">
          96% of eLearning for Business customers see improved results within six months.
        </p>
      </div>

      {/* METRICS GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              
              {/* number */}
              <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                {metric.label}
              </p>

              {/* description */}
              <p className="text-sm text-white/60">
                {metric.subtext}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}