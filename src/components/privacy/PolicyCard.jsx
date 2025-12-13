const PolicyCard = ({ icon: Icon, title, children }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="w-12 h-12 rounded-xl bg-policy-highlight flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#FF0055] " />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <div className="text-muted-foreground text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default PolicyCard;