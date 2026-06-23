'use client';

import React from 'react';

interface CrownIconProps {
  fill: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CrownIcon({ fill, width = 34, height = 25, className }: CrownIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {fill.startsWith('url') && (
        <defs>
          <linearGradient id="crown-gradient-modal" x1="4.07382" y1="12.3753" x2="29.4186" y2="12.3753" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD85A" />
            <stop offset="1" stopColor="#FFB800" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M33.1198 7.41853L24.191 11.0541C23.9175 11.1662 23.6056 11.0595 23.4552 10.8051L17.478 0.292432C17.2455 -0.104222 16.6655 -0.0960149 16.4467 0.308846L10.1796 10.8325C10.0346 11.1006 9.70631 11.2155 9.42455 11.0951L0.826733 7.41853C0.36169 7.21883 -0.122501 7.65925 0.027954 8.14071L5.1106 24.3269C5.18719 24.5731 5.41698 24.7427 5.67685 24.7427L27.4354 24.7482C27.6843 24.7482 27.9059 24.5923 27.9934 24.3598L33.9022 8.1708C34.0773 7.68661 33.5986 7.2243 33.1226 7.41853H33.1198ZM20.602 15.2668L16.351 22.7896C16.2908 22.8962 16.1321 22.8552 16.1266 22.7348L15.9543 18.1802H14.4689V18.1637C14.4306 18.1692 14.3923 18.1802 14.3513 18.1802H11.2683C11.178 18.1802 11.1206 18.0817 11.1616 18.0023L15.7437 9.51395C15.9051 9.23493 16.2005 9.06532 16.5206 9.06532H19.6035C19.6938 9.06532 19.7512 9.1638 19.7102 9.24313L16.5534 15.089H20.4953C20.5883 15.089 20.6458 15.1875 20.5993 15.2695L20.602 15.2668Z"
        fill={fill}
      />
    </svg>
  );
}
