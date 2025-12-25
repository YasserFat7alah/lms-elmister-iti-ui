"use client";

import PropTypes from "prop-types";

export default function LogoLoader({
  variant = "pulse",
  background = "bg-white/80",
  logoSrc = "https://res.cloudinary.com/dcrps0oeu/image/upload/v1765069001/logo_j0nj4m.png",
  className = "",
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${background} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        {variant === "pulse" ? (
          <div className="loader-pulse-wrapper">
            <div className="loader-pulse">
              <img src={logoSrc} alt="logo" width={220} height={60} />
            </div>
          </div>
        ) : (
          <div className="loader-reveal-wrapper">
            <div className="loader-reveal">
              <img src={logoSrc} alt="logo" width={220} height={60} />
            </div>
            <div className="loader-reveal-overlay" aria-hidden="true" />
          </div>
        )}
      </div>
    </div>
  );
}

LogoLoader.propTypes = {
  variant: PropTypes.oneOf(["pulse", "reveal"]),
  background: PropTypes.string,
  logoSrc: PropTypes.string,
  className: PropTypes.string,
};
