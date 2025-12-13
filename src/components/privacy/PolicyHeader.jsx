import { FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';

const PolicyHeader = ({ title, lastUpdated, description }) => {
  return (
    <header className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div> */}
      
      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaShieldAlt className="h-10 w-10 text-black-foreground" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black-foreground text-center mb-4">
          {title}
        </h1>
        
        {description && (
          <p className="text-black-foreground/80 text-lg md:text-xl text-center max-w-2xl mx-auto mb-6">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-center gap-2 text-black-foreground/70">
          <FaCalendarAlt className="h-4 w-4" />
          <span className="text-sm font-medium">Last Updated: {lastUpdated}</span>
        </div>
      </div>
    </header>
  );
};

export default PolicyHeader;