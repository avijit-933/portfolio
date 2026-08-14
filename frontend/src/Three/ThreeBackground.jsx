import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ isLight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- Color Theme Adaptation ---
    // Dark theme colors: Primary (cyan), Secondary (purple), Accent (mint)
    // Light theme colors: Primary (deep blue), Secondary (indigo), Accent (teal)
    let particleColor = isLight ? 0x4f46e5 : 0x00E5FF;
    let nodeColor = isLight ? 0x7c3aed : 0x7B61FF;
    let lineColor = isLight ? 0x9333ea : 0x7B61FF;

    // --- 1. Background Dust/Stars ---
    const starCount = 800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const color1 = new THREE.Color(particleColor);
    const color2 = new THREE.Color(nodeColor);

    for (let i = 0; i < starCount; i++) {
      // Spread stars in a sphere
      const r = 25 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      // Color interpolation
      const mixedColor = color1.clone().lerp(color2, Math.random());
      starColors[i * 3] = mixedColor.r;
      starColors[i * 3 + 1] = mixedColor.g;
      starColors[i * 3 + 2] = mixedColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Simple circle texture using HTML5 Canvas
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const starMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: createCircleTexture(),
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // --- 2. Interactive Neural Network ---
    const nodeCount = 45;
    const nodes = [];
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];

    // Initialize node positions and velocities
    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      nodes.push(new THREE.Vector3(x, y, z));
      
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.01
        )
      );
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.35,
      color: nodeColor,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Dynamic Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create a lines helper geometry
    const lineGeometry = new THREE.BufferGeometry();
    // Maximum possible connections
    const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // --- Interactive Mouse & Scroll Variables ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const scroll = { y: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 3;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 3;
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY * 0.005;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // --- Animation Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse and scroll interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.y += (scroll.targetY - scroll.y) * 0.05;

      // Parallax camera effects
      camera.position.x = mouse.x;
      camera.position.y = mouse.y - scroll.y;
      camera.lookAt(0, -scroll.y * 0.2, 0);

      // Rotate background stars slowly
      starPoints.rotation.y = time * 0.02;
      starPoints.rotation.x = time * 0.01;

      // Update Node positions & bounce inside box boundaries
      const positions = nodeGeometry.attributes.position.array;
      let lineIndex = 0;
      const linePositionsArray = lineGeometry.attributes.position.array;

      for (let i = 0; i < nodeCount; i++) {
        const vel = nodeVelocities[i];
        
        nodes[i].x += vel.x;
        nodes[i].y += vel.y;
        nodes[i].z += vel.z;

        // Boundaries check and bounce
        if (Math.abs(nodes[i].x) > 12) vel.x *= -1;
        if (Math.abs(nodes[i].y) > 9) vel.y *= -1;
        if (Math.abs(nodes[i].z) > 8) vel.z *= -1;

        positions[i * 3] = nodes[i].x;
        positions[i * 3 + 1] = nodes[i].y;
        positions[i * 3 + 2] = nodes[i].z;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Calculate connections dynamically (distance-based line segments)
      const maxDistance = 4.2;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].distanceTo(nodes[j]);
          if (dist < maxDistance) {
            // Add connection segment (point A to point B)
            linePositionsArray[lineIndex * 6] = nodes[i].x;
            linePositionsArray[lineIndex * 6 + 1] = nodes[i].y;
            linePositionsArray[lineIndex * 6 + 2] = nodes[i].z;

            linePositionsArray[lineIndex * 6 + 3] = nodes[j].x;
            linePositionsArray[lineIndex * 6 + 4] = nodes[j].y;
            linePositionsArray[lineIndex * 6 + 5] = nodes[j].z;

            lineIndex++;
          }
        }
      }
      
      // Clear out the remaining buffer array
      const activeVerticesCount = lineIndex * 2;
      lineGeometry.setDrawRange(0, activeVerticesCount);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      starGeometry.dispose();
      starMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-all duration-700"
    />
  );
};

export default ThreeBackground;
