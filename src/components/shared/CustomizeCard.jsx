"use client";

import Rating from "../shared/Rating";

export default function CustomizeCard({ 
  icon: Icon, 
  image, 
  title, 
  subTitle, 
  rating //  optional 
}) {
  return (
    <div className="min-w-[220px] sm:min-w-[240px] bg-white shadow-lg p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      
      {/* image أو Icon */}
      {image ? (
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden ring-4 ring-purple-100 shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : Icon ? (
        <Icon className="w-12 h-12 text-[#392C7D] mb-4" />
      ) : null}

      <div className="w-12 h-1 rounded-full bg-[#392C7D]/10 mb-4"></div>
      
      {/*  rating */}
      {rating !== undefined && rating !== null && (
        <Rating 
          defaultRating={rating} 
          readOnly 
          size="md" 
          className="mb-3"
        />
      )}

      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {subTitle && <p className="text-gray-500 text-sm mt-1">{subTitle}</p>}
    </div>
  );
}