import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Signup from '../components/Signup';
import Login from '../components/Login';

// Global styles for the animation
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @keyframes float{
    0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  33% {
    transform: translateY(-100px) translateX(100px) rotate(120deg);
  }
  66% {
    transform: translateY(100px) translateX(-100px) rotate(240deg);
  }
  100% {
    transform: translateY(0) translateX(0) rotate(360deg);
  }
  }
`;

// Styled components
const BackgroundContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #161626 0%, #060115 100%);
  color: white;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const GlowEffect = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  ${props => props.style}
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CreateUser = () => {
  const [newUser,setNewUser] = useState(true)
  const particlesContainerRef = useRef(null);

  useEffect(() => {
    const container = particlesContainerRef.current;
    if (!container) return;

    // Clean up previous particles
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Generate random particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      
      // Styling the particle
      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.3';
      
      // Random size between 3px and 8px
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random color from purple/blue palette
      const colors = ['#625fca', '#6c5ce7', '#6a07c7', '#a50ae2', '#0891ec'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      
      
      // Random animation
      particle.style.animation = ` float ${Math.random() * 10 + 10}s infinite linear`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      
      container.appendChild(particle);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        {/* Particles container */}
        <ParticlesContainer ref={particlesContainerRef} />
        
        {/* Glow effects */}
        <GlowEffect style={{ top: '20%', left: '70%', width: '300px', height: '300px', backgroundColor: 'rgba(106, 90, 205, 0.15)' }} />
        <GlowEffect style={{ top: '60%', left: '20%', width: '400px', height: '400px', backgroundColor: 'rgba(138, 43, 226, 0.1)' }} />
         
         <Main>
        {newUser ? <Signup setNewUser={setNewUser}/> : <Login setNewUser={setNewUser} />}          
         </Main>

        
      </BackgroundContainer>
    </>
  );
};

export default CreateUser;