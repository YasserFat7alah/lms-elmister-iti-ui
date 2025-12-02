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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789012!2d-74.00534!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a271d270d9d%3A0x2c2b2d2e2f2g2h2i!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
