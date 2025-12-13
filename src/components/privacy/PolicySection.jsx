const PolicySection = ({ id, title, icon: Icon, children }) => {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <div className="flex items-start gap-4 mb-4">
        {Icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-policy-highlight flex items-center justify-center">
            <Icon className="h-5 w-5 text-[#FF0055]" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-policy-heading">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-14">
        <div className="text-policy-text leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PolicySection;