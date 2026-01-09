import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense, useState, useEffect } from 'react'
import { useLoaderData } from '@tanstack/react-router'
import GhostCursor from '../components/motion/GhostCursor'
import HorizontalScroll from '../components/motion/HorizontalScroll'
import LaserFlow from '../components/motion/LaserFlow'
import ImageTrail from '../components/motion/ImageTrail'
import LightningBackground from '../components/motion/LightningBackground'
import ElectricBorder from '../components/motion/ElectricBorder'
import { getProjectStats } from '../utils/greet'

// React Bits Components
import SplitText from '../components/ui/SplitText'
import ShinyText from '../components/ui/ShinyText'
import BlurText from '../components/ui/BlurText'
import SpotlightCard from '../components/ui/SpotlightCard'
import CardStack from '../components/ui/CardStack'
import StickerPeel from '../components/ui/StickerPeel'
import GradualBlur from '../components/ui/GradualBlur'
import Ballpit from '../components/ui/Ballpit'
import LetterGlitch from '../components/ui/LetterGlitch'
import Magnet from '../components/ui/Magnet'

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
      <section className="hero" aria-label="Introduction" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {isMobile === false && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
        
        <div className="hero-content" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          <div className="muted" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
            <ShinyText text={`[ SYSTEM: ${stats.status} // UNIT: ${stats.engineer} ]`} speed={3} />
          </div>
          <h1 className="editorial-title" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, lineHeight: 0.9 }}>
            <SplitText text="Precision" /><br />
            <span className="accent"><SplitText text="Engineering" delay={0.2} /></span><br />
            <SplitText text="Digital Art" delay={0.4} />
          </h1>
          <div style={{ marginTop: '3rem', maxWidth: '500px', margin: '3rem auto 0' }}>
            <BlurText text="A cinematic experience built with TanStack Start, GSAP, and Three.js. Focused on technical excellence and editorial aesthetics." delay={0.6} className="muted" />
          </div>
        </div>
        
        <div className="scroll-hint muted" style={{ position: 'absolute', bottom: '2rem', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
          <Magnet>[ SCROLL TO EXPLORE ]</Magnet>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about" aria-label="About Me" style={{ padding: '10rem var(--container-padding)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="about-content" style={{ maxWidth: '800px' }}>
          <h2 className="muted" style={{ marginBottom: '2rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <LetterGlitch text="// About" />
          </h2>
          <div style={{ fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 500, lineHeight: 1.1 }}>
            <GradualBlur>
              Designing interfaces that feel intentional. 
              I bridge the gap between creative code and performance-first architecture. 
              Every pixel serves a purpose; every motion tells a story.
            </GradualBlur>
          </div>
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
      <section id="projects" className="projects" style={{ minHeight: 'auto', padding: '10rem var(--container-padding)' }} aria-label="Selected Projects">
        <h2 className="muted" style={{ marginBottom: '5rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          <LetterGlitch text="// Selected Work" />
        </h2>
        <div className="projects-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
          gap: '4rem' 
        }}>
          <SpotlightCard>
            <ImageTrail src={project1} alt="Editorial Design Project 1" />
            <h3 style={{ marginTop: '1.5rem', fontSize: '1.5rem' }}>Ethereal Motion</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Complex GSAP choreography and editorial layouts.</p>
          </SpotlightCard>
          <SpotlightCard>
            <ImageTrail src={project2} alt="Interactive Web Project 2" />
            <h3 style={{ marginTop: '1.5rem', fontSize: '1.5rem' }}>Neural Interface</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>AI-driven interactivity with React Three Fiber.</p>
          </SpotlightCard>
        </div>
      </section>

      {/* PLAYGROUND SECTION */}
      <section id="playground" className="playground" style={{ position: 'relative', overflow: 'hidden', padding: '10rem var(--container-padding)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.3 }}>
          <Ballpit />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="muted" style={{ marginBottom: '2rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            <LetterGlitch text="// Playground" />
          </h2>
          <div className="stack-wrapper" style={{ display: 'flex', justifyContent: 'space-between', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '400px' }}>
              <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Raw <span className="accent">Experiments</span></h1>
              <BlurText text="Checking the boundaries of what is possible with WebGL and React. Ambient aesthetics meet raw performance." className="muted" />
              <div style={{ marginTop: '3rem' }}>
                <StickerPeel overlay="SECRET">
                  <div style={{ border: '1px solid var(--accent)', padding: '1rem 2rem', letterSpacing: '0.1em' }}>REVEAL CORE CODE</div>
                </StickerPeel>
              </div>
            </div>
            <CardStack items={[
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 className="accent" style={{ marginBottom: '1rem' }}>ARCHITECTURE</h4>
                <p className="muted">Scalable, high-performance systems built for the modern web.</p>
              </div>,
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 className="accent" style={{ marginBottom: '1rem' }}>MOTION</h4>
                <p className="muted">Fluid, cinematic transitions that prioritize user intent.</p>
              </div>,
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h4 className="accent" style={{ marginBottom: '1rem' }}>WEBGL</h4>
                <p className="muted">Immersive 3D environments rendered in real-time.</p>
              </div>
            ]} />
          </div>
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
