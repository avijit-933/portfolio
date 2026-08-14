import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device supports touch or is a mobile screen
    const checkDevice = () => {
      const mobile = 
        window.innerWidth < 1024 || 
        ('ontouchstart' in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      
      if (!mobile) {
        document.documentElement.classList.add('custom-cursor-enabled');
      } else {
        document.documentElement.classList.remove('custom-cursor-enabled');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      // Trailing outer ring effect (smooth interpolation)
      setTimeout(() => {
        setTrail({ x: e.clientX, y: e.clientY });
      }, 80);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Event delegation to check for hover status on links and buttons
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.clickable') ||
        target.getAttribute('role') === 'button';
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [isMobile]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Small sharp inner dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovered ? 'var(--accent)' : 'var(--primary)',
          boxShadow: isHovered 
            ? '0 0 10px var(--accent), 0 0 20px var(--accent)'
            : '0 0 8px var(--primary)',
        }}
      />
      {/* Larger soft outer ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border transition-all duration-300 ease-out transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          borderColor: isHovered ? 'var(--accent)' : 'var(--secondary)',
          backgroundColor: isHovered ? 'rgba(0, 255, 179, 0.05)' : 'transparent',
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.7 : 1})`,
          boxShadow: isHovered 
            ? '0 0 15px rgba(0, 255, 179, 0.2)' 
            : 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;
