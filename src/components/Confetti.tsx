import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean;
  type?: "hearts" | "full" | "sparkles";
}

export default function Confetti({ active, type = "full" }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      scaleY: number;
      shape: "heart" | "circle" | "star";
    }

    const particles: Particle[] = [];
    const colors = [
      "#FF6B6B", "#FF8E8E", "#FFB5B5", "#FFD1D1", 
      "#FF4A79", "#FF92AC", "#FE347E", "#F05625"
    ];

    const createParticle = (x: number, y: number, isInitial = false): Particle => {
      const size = Math.random() * 12 + 8;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;

      let shape: "heart" | "circle" = "heart";
      if (type === "full") {
        shape = Math.random() > 0.4 ? "heart" : "circle";
      } else if (type === "hearts") {
        shape = "heart";
      }

      return {
        x,
        y: isInitial ? y - Math.random() * height : y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        speedY: isInitial 
          ? Math.random() * 3 + 1 
          : -Math.abs(Math.sin(angle) * speed) - 2 - Math.random() * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        opacity: 1,
        scaleY: Math.random() * 0.4 + 0.8,
        shape,
      };
    };

    // Populate initial batch
    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(Math.random() * width, height + 50, true));
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      rotation: number,
      opacity: number,
      scaleY: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((rotation * Math.PI) / 180);
      context.scale(1, scaleY);
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.beginPath();
      
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      
      // Top left curve
      context.bezierCurveTo(
        -size / 2, -size / 2,
        -size, -size / 2,
        -size, 0
      );
      
      // Bottom left curve
      context.bezierCurveTo(
        -size, size / 3,
        -size / 4, size / 1.3,
        0, size
      );
      
      // Bottom right curve
      context.bezierCurveTo(
        size / 4, size / 1.3,
        size, size / 3,
        size, 0
      );
      
      // Top right curve
      context.bezierCurveTo(
        size, -size / 2,
        size / 2, -size / 2,
        0, topCurveHeight
      );
      
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawCircle = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      context.save();
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.beginPath();
      context.arc(x, y, size / 2, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add a couple new particles from the bottom or sides
      if (particles.length < 150 && Math.random() < 0.3) {
        particles.push(createParticle(Math.random() * width, height + 10));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Apply physics
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.speedY += 0.05; // gravity gravity
        p.speedX *= 0.99; // air resistance

        // Slowly fade if they are falling off
        if (p.y > height - 100) {
          p.opacity -= 0.015;
        }

        // Draw based on shape
        if (p.shape === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.rotation, p.opacity, p.scaleY);
        } else {
          drawCircle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }

        // Remove if dead or out of bonds
        if (p.opacity <= 0 || p.y > height + 50 || p.x < -50 || p.x > width + 50) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active, type]);

  if (!active) return null;

  return (
    <canvas
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: "multiply" }}
      ref={canvasRef}
    />
  );
}
