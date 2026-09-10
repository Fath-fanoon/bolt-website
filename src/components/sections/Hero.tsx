import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';
import { company } from '@/data/content';
import { scrollToSection } from '@/hooks/useScrollSetup';
import type { GsapContext } from '@/hooks/useGsap';

export function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    mount.appendChild(renderer.domElement);

    // Particle network
    const particleCount = isMobile ? 400 : 900;
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];
    const baseY: number[] = [];

    const spread = 60;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      velocities.push((Math.random() - 0.5) * 0.02);
      baseY.push(positions[i * 3 + 1]);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x2EA4F5,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Lines between nearby particles
    const lineMaxConnections = isMobile ? 80 : 200;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineMaxConnections * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0090F0,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let frameId = 0;
    let time = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += prefersReduced ? 0 : 0.005;

      const pos = geometry.attributes.position.array as Float32Array;

      if (!prefersReduced) {
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] =
            baseY[i] + Math.sin(time + i * 0.5) * 1.5 + velocities[i] * time * 10;
          pos[i * 3] += Math.sin(time * 0.5 + i) * 0.003;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      // Update lines
      const linePos = lineGeometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const maxDist = isMobile ? 5 : 7;
      const maxDistSq = maxDist * maxDist;

      for (let i = 0; i < particleCount && lineIdx < lineMaxConnections; i++) {
        for (let j = i + 1; j < particleCount && lineIdx < lineMaxConnections; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistSq) {
            linePos[lineIdx * 6] = pos[i * 3];
            linePos[lineIdx * 6 + 1] = pos[i * 3 + 1];
            linePos[lineIdx * 6 + 2] = pos[i * 3 + 2];
            linePos[lineIdx * 6 + 3] = pos[j * 3];
            linePos[lineIdx * 6 + 4] = pos[j * 3 + 1];
            linePos[lineIdx * 6 + 5] = pos[j * 3 + 2];
            lineIdx++;
          }
        }
      }

      // Clear remaining
      for (let k = lineIdx * 6; k < linePositions.length; k++) {
        linePositions[k] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      // Camera parallax
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
      camera.position.z = 30 - scrollProgress * 15;
      camera.rotation.z = scrollProgress * 0.1;
      camera.lookAt(0, 0, 0);

      // Fade on scroll
      material.opacity = 0.6 * (1 - scrollProgress * 0.7);
      lineMaterial.opacity = 0.15 * (1 - scrollProgress * 0.7);

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // GSAP text animations
  useEffect(() => {
    let ctx: GsapContext | null = null;

    (async () => {
      const { gsap } = await import('@/hooks/useGsap');
      if (!heroRef.current) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.hero-title-line', {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          }, '-=0.4')
          .from('.hero-tagline', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
          .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
          .from('.hero-scroll-hint', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2');

        // Scroll parallax
        gsap.to('.hero-content', {
          y: -100,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }, heroRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen min-h-[600px] w-full overflow-hidden bg-base-950">
      <div ref={mountRef} className="absolute inset-0" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,6,8,0.7) 80%, rgba(5,6,8,1) 100%)',
      }} />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/10 blur-[120px] pointer-events-none" />

      <div className="hero-content relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-eyebrow flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-accent-500/50" />
          <span className="text-xs font-mono text-accent-300 tracking-ultra uppercase">
            Infonet Technologies
          </span>
          <div className="h-px w-12 bg-accent-500/50" />
        </div>

        <h1 className="font-display font-bold text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tightest max-w-5xl">
          <span className="hero-title-line block overflow-hidden">INFONET</span>
          <span className="hero-title-line block overflow-hidden gradient-text">TECHNOLOGIES</span>
        </h1>

        <p className="hero-tagline mt-8 text-lg sm:text-xl lg:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
          {company.tagline}
        </p>

        <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollToSection('solutions')}
            className="group flex items-center gap-2 px-7 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent-500/30 text-sm"
          >
            Explore Solutions
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollToSection('products')}
            className="px-7 py-3.5 border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 text-sm"
          >
            View Products
          </button>
        </div>
      </div>

      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-[10px] font-mono tracking-ultra uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-500/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
}
