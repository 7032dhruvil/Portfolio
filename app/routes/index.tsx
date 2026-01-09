import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState, useEffect } from 'react'
import { useLoaderData } from '@tanstack/react-router'
import GhostCursor from '../components/motion/GhostCursor'
import TextReveal from '../components/motion/TextReveal'
import HorizontalScroll from '../components/motion/HorizontalScroll'
import LaserFlow from '../components/motion/LaserFlow'
import ImageTrail from '../components/motion/ImageTrail'
import LightningBackground from '../components/motion/LightningBackground'
import ElectricBorder from '../components/motion/ElectricBorder'
import { getProjectStats } from '../utils/greet'

import project1 from '../assets/project1.png'
import project2 from '../assets/project2.png'

const HeroScene = lazy(() => import('../components/three/HeroScene'))

export const Route = createFileRoute('/')({
  loader: async () => await getProjectStats(),
  component: PortfolioPage,
})

function PortfolioPage() {
  const stats = useLoaderData({ from: '/' })
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const skills = [
    "Creative Frontend",
    "System Architecture",
    "WebGL / Shaders",
    "Motion Direction",
    "Performance Optimization"
  ];

  return (
    <div className="portfolio">
      <GhostCursor />
      
      {/* HERO SECTION */}
      <section className="hero" aria-label="Introduction">
        {isMobile === false && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          <div className="muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            [ SYSTEM: {stats.status} // UNIT: {stats.engineer} ]
          </div>
          <h1 className="editorial-title">
            Precision <br />
            <span className="accent">Engineering</span> <br />
            Digital Art
          </h1>
          <p className="muted" style={{ marginTop: '2rem', maxWidth: '400px', fontSize: '1rem' }}>
            A cinematic experience built with TanStack Start, GSAP, and Three.js. 
            Focused on technical excellence and editorial aesthetics.
          </p>
        </div>
        
        <div className="scroll-hint muted" style={{ position: 'absolute', bottom: '2rem', left: 'var(--container-padding)', fontSize: '0.8rem' }}>
          [ SCROLL TO EXPLORE ]
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about" aria-label="About Me">
        <div className="about-content" style={{ maxWidth: '800px' }}>
          <h2 className="muted" style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>// About</h2>
          <TextReveal>
            Designing interfaces that feel intentional. 
            I bridge the gap between creative code and performance-first architecture. 
            Every pixel serves a purpose; every motion tells a story.
          </TextReveal>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="skills" style={{ padding: 0, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10rem', left: 'var(--container-padding)', zIndex: 10 }}>
          <h2 className="muted" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>// Capabilities</h2>
        </div>
        <LaserFlow />
        <HorizontalScroll items={skills} />
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects" style={{ minHeight: 'auto' }} aria-label="Selected Projects">
        <h2 className="muted" style={{ marginBottom: '4rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>// Selected Work</h2>
        <div className="projects-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '2rem' 
        }}>
          <ImageTrail src={project1} alt="Editorial Design Project 1" />
          <ImageTrail src={project2} alt="Interactive Web Project 2" />
          <ImageTrail src={project1} alt="Editorial Design Project 3" />
          <ImageTrail src={project2} alt="Interactive Web Project 4" />
        </div>
      </section>

      {/* PLAYGROUND SECTION */}
      <section id="playground" className="playground" style={{ position: 'relative' }}>
        <LightningBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="muted" style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>// Playground</h2>
          <h1 style={{ opacity: 0.1, fontSize: '15vw' }}>EXPERIMENT</h1>
          <p className="muted" style={{ maxWidth: '400px' }}>
            Checking the boundaries of what is possible with WebGL and React. 
            Ambient aesthetics meet raw performance.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact">
        <div className="contact-cta" style={{ textAlign: 'center' }}>
          <h2 className="muted" style={{ marginBottom: '2rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>// Connect</h2>
          <h1 style={{ marginBottom: '4rem' }}>Start a <span className="accent">Project</span></h1>
          <ElectricBorder>
            <a href="mailto:hello@antigravity.dev" style={{ fontWeight: 500, letterSpacing: '0.1em' }}>GET IN TOUCH</a>
          </ElectricBorder>
        </div>
      </section>
      
      <footer style={{ padding: '4rem var(--container-padding)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }} className="muted">
        <div>© 2026 ANTIGRAVITY // {stats.build}</div>
        <div>BUILT WITH TANSTACK START</div>
      </footer>
    </div>
  )
}
