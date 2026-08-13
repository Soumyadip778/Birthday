import React, { useEffect, useRef } from 'react';

function RomanticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    /* =========================
       BALLOON COLORS
    ========================= */

    const balloonColors = [
      { base: '#ff1744', light: '#ff8a9b', dark: '#b00020' },
      { base: '#00bcd4', light: '#8ff3ff', dark: '#006978' },
      { base: '#ffd600', light: '#fff59d', dark: '#b79b00' },
      { base: '#9c27b0', light: '#d98be5', dark: '#5c0870' },
      { base: '#00c853', light: '#8cffb3', dark: '#00752f' },
      { base: '#ff6d00', light: '#ffb36b', dark: '#b33c00' },
      { base: '#2979ff', light: '#91b8ff', dark: '#0645b5' },
      { base: '#ff4081', light: '#ff9fc2', dark: '#c50045' },
    ];

    /* =========================
       HEARTS
    ========================= */

    const hearts = [];
    const heartsCount = 35;

    for (let i = 0; i < heartsCount; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height + height,
        size: Math.random() * 15 + 8,
        speed: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
      });
    }

    const drawHeart = (x, y, size, opacity) => {
      ctx.save();

      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#ff477e';
      ctx.shadowColor = '#ff758f';
      ctx.shadowBlur = 8;

      ctx.translate(x, y);

      ctx.beginPath();

      ctx.moveTo(0, size * 0.3);

      ctx.bezierCurveTo(
        -size * 0.8,
        -size * 0.3,
        -size,
        size * 0.5,
        0,
        size
      );

      ctx.bezierCurveTo(
        size,
        size * 0.5,
        size * 0.8,
        -size * 0.3,
        0,
        size * 0.3
      );

      ctx.fill();

      ctx.restore();
    };

    /* =========================
       POP PARTICLES
    ========================= */

    const particles = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.size = Math.random() * 4 + 1;

        this.speedX =
          (Math.random() - 0.5) * 10;

        this.speedY =
          (Math.random() - 0.5) * 10;

        this.gravity = 0.15;

        this.opacity = 1;

        this.life =
          Math.random() * 30 + 30;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.speedY += this.gravity;

        this.speedX *= 0.98;

        this.opacity -= 0.025;

        this.life--;
      }

      draw() {
        ctx.save();

        ctx.globalAlpha =
          Math.max(0, this.opacity);

        ctx.fillStyle = this.color;

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
      }
    }

    /* =========================
       BALLOONS
    ========================= */

    const balloons = [];
    const balloonCount = 20;

    class Balloon {
      constructor(firstLoad = true) {
        this.init(firstLoad);
      }

      init(firstLoad) {
        this.r = Math.random() * 15 + 30;

        this.x =
          Math.random() * width;

        this.y = firstLoad
          ? Math.random() * height
          : height + this.r + 100;

        this.colorSet =
          balloonColors[
            Math.floor(
              Math.random() *
                balloonColors.length
            )
          ];

        this.speed =
          Math.random() * 0.8 + 0.5;

        this.angle =
          Math.random() * Math.PI * 2;

        this.wobbleSpeed =
          Math.random() * 0.02 + 0.01;

        this.popped = false;

        this.tailMidY =
          this.r + 40;

        this.tailEndY =
          this.r + 120;

        this.tailVelMid = 0;
        this.tailVelEnd = 0;

        this.prevX = this.x;
      }

      drawBalloonPath(r) {
        ctx.beginPath();

        ctx.moveTo(0, r);

        ctx.bezierCurveTo(
          -r * 1.2,
          r * 0.8,
          -r * 1.3,
          -r * 1.2,
          0,
          -r * 1.2
        );

        ctx.bezierCurveTo(
          r * 1.3,
          -r * 1.2,
          r * 1.2,
          r * 0.8,
          0,
          r
        );

        ctx.closePath();
      }

      drawString() {
        const dx =
          this.x - this.prevX;

        this.prevX = this.x;

        const stiffness = 0.08;
        const damping = 0.85;

        const midTarget =
          this.r +
          40 +
          Math.abs(dx) * 8;

        this.tailVelMid +=
          (midTarget -
            this.tailMidY) *
          stiffness;

        this.tailVelMid *= damping;

        this.tailMidY +=
          this.tailVelMid;

        const endTarget =
          this.r +
          120 +
          Math.abs(dx) * 14;

        this.tailVelEnd +=
          (endTarget -
            this.tailEndY) *
          stiffness;

        this.tailVelEnd *= damping;

        this.tailEndY +=
          this.tailVelEnd;

        const sway =
          Math.sin(
            this.angle * 1.8
          ) *
            6 +
          dx * 4;

        ctx.beginPath();

        ctx.moveTo(
          0,
          this.r + 5
        );

        ctx.bezierCurveTo(
          sway,
          this.tailMidY * 0.5,
          -sway,
          this.tailMidY,
          sway * 0.6,
          this.tailEndY
        );

        ctx.strokeStyle =
          'rgba(255,255,255,0.4)';

        ctx.lineWidth = 1.3;

        ctx.stroke();
      }

      /* POP */

      pop() {
        if (this.popped) return;

        this.popped = true;

        /* Create explosion particles */

        for (let i = 0; i < 35; i++) {
          particles.push(
            new Particle(
              this.x,
              this.y,
              this.colorSet.base
            )
          );
        }

        /* Small white flash */

        ctx.save();

        ctx.globalAlpha = 0.8;

        ctx.fillStyle = '#ffffff';

        ctx.shadowColor =
          this.colorSet.light;

        ctx.shadowBlur = 25;

        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.r * 0.7,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        /* Respawn after pop */

        setTimeout(() => {
          this.init(false);
        }, 600 + Math.random() * 800);
      }

      update() {
        if (this.popped) return;

        /* Float upward */

        this.y -= this.speed;

        /* Gentle horizontal movement */

        this.angle +=
          this.wobbleSpeed;

        this.x +=
          Math.sin(
            this.angle * 0.6
          ) * 0.8;

        /*
          POP AT TOP

          Wait until the entire
          balloon reaches the top.
        */

        if (
          this.y <
          -this.r - 10
        ) {
          this.pop();
          return;
        }

        this.draw();
      }

      draw() {
        ctx.save();

        ctx.translate(
          this.x,
          this.y
        );

        ctx.rotate(
          Math.sin(
            this.angle
          ) * 0.06
        );

        /* String */

        this.drawString();

        /* Balloon */

        this.drawBalloonPath(
          this.r
        );

        const gradient =
          ctx.createRadialGradient(
            -this.r * 0.3,
            -this.r * 0.5,
            this.r * 0.1,
            0,
            0,
            this.r * 1.5
          );

        gradient.addColorStop(
          0,
          this.colorSet.light
        );

        gradient.addColorStop(
          0.4,
          this.colorSet.base
        );

        gradient.addColorStop(
          1,
          this.colorSet.dark
        );

        ctx.fillStyle =
          gradient;

        ctx.globalAlpha = 0.92;

        ctx.fill();

        ctx.restore();
      }
    }

    /* Create balloons */

    for (
      let i = 0;
      i < balloonCount;
      i++
    ) {
      balloons.push(
        new Balloon(true)
      );
    }

    /* =========================
       RESIZE
    ========================= */

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr =
        window.devicePixelRatio || 1;

      canvas.width =
        width * dpr;

      canvas.height =
        height * dpr;

      canvas.style.width =
        `${width}px`;

      canvas.style.height =
        `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    /* =========================
       ANIMATION LOOP
    ========================= */

    const render = () => {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /* Pink background */

      const background =
        ctx.createLinearGradient(
          0,
          0,
          0,
          height
        );

      background.addColorStop(
        0,
        '#ffe5ec'
      );

      background.addColorStop(
        0.5,
        '#ffb3c6'
      );

      background.addColorStop(
        1,
        '#ff8fa3'
      );

      ctx.fillStyle =
        background;

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /* Hearts */

      hearts.forEach(
        (heart) => {
          heart.y -=
            heart.speed;

          heart.angle +=
            heart.spin;

          if (
            heart.y < -50
          ) {
            heart.y =
              height + 50;

            heart.x =
              Math.random() *
              width;
          }

          drawHeart(
            heart.x +
              Math.sin(
                heart.angle
              ) * 15,
            heart.y,
            heart.size,
            heart.opacity
          );
        }
      );

      /* Balloons */

      balloons.forEach(
        (balloon) => {
          balloon.update();
        }
      );

      /* Pop particles */

      for (
        let i =
          particles.length - 1;
        i >= 0;
        i--
      ) {
        const particle =
          particles[i];

        particle.update();
        particle.draw();

        if (
          particle.opacity <= 0 ||
          particle.life <= 0
        ) {
          particles.splice(
            i,
            1
          );
        }
      }

      animationFrameId =
        requestAnimationFrame(
          render
        );
    };

    resize();

    window.addEventListener(
      'resize',
      resize
    );

    render();

    return () => {
      window.removeEventListener(
        'resize',
        resize
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default RomanticBackground;