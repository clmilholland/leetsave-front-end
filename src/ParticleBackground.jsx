import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: { enable: true, zIndex: -1 },
    background: {
      color: {
        value: "#000000",
      },
    },
    particles: {
      color: {
        value: "#535353ff",
      },
      number: {
        value: 100,
        density: {
          enable: true,
          area: 800,
        },
      },
      size: {
        value: 2,
        random: true,
      },
      move: {
        enable: true,
        speed: 0.5,
      },
      opacity: {
        value: 0.7,
      },
      links: {
        enable: true,
        color: "#ffffff",
        distance: 120,
        opacity: 0.2,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // 👈 Particles are pushed away from cursor
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
  }}
/>
  );
};

export default ParticleBackground;
