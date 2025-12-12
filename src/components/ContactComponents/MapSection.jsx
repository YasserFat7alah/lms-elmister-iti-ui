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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.1568532385777!2d30.99935917621241!3d30.82627077453931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9006c953031%3A0x657b1b2e39db545b!2sITI%20Tanta!5e0!3m2!1sen!2sus!4v1765516832148!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
