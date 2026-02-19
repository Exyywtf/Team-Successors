import React from "react";

export const LiquidFilters = () => (
  <svg style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="liquid-distortion">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.005"
          numOctaves="2"
          result="turbulence"
        >
          <animate
            attributeName="baseFrequency"
            dur="60s"
            values="0.005;0.002;0.005"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);
