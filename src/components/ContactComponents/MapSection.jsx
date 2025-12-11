"use client"

export default function MapSection() {
  return (
    <div className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <iframe
          title="location-map"
          width="100%"
          height="400"
          frameBorder="0"
          src="https://maps.google.com/maps?q=Information+Technology+Institute+ITI+Smart+Village&t=&z=15&ie=UTF8&iwloc=&output=embed"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
