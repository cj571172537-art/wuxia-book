import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { PLOT_POINTS } from './constants';
import { PlotCard } from './components/PlotCard';
import { BookOpen } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-cinematic-bg text-white font-serif selection:bg-cinematic-accent selection:text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cinematic-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 p-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl tracking-[0.2em] font-medium">刺客聂隐娘</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">The Assassin Cinematic Experience</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.3em] uppercase opacity-60">
          <span>侯孝贤作品</span>
          <div className="w-px h-4 bg-white/20" />
          <span>沉浸式体验</span>
        </div>
      </header>

      {/* Cinematic Sections */}
      <main className="snap-y snap-mandatory h-screen overflow-y-auto no-scrollbar">
        {/* Intro Section */}
        <section className="h-screen flex flex-col items-center justify-center snap-start relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="text-center z-10"
          >
            <h1 className="text-8xl md:text-[12rem] font-serif tracking-[0.5em] mb-8 opacity-80">
              聂隐娘
            </h1>
            <p className="text-sm md:text-xl tracking-[1em] uppercase opacity-40">
              The Assassin
            </p>
          </motion.div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
            <span className="text-[10px] uppercase tracking-[0.5em]">向下滚动</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-12 bg-white"
            />
          </div>
        </section>

        {PLOT_POINTS.map((point) => (
          <PlotCard key={point.id} point={point} />
        ))}

        {/* Outro Section */}
        <section className="h-screen flex flex-col items-center justify-center snap-start bg-black">
          <h2 className="text-4xl font-serif tracking-[1em] opacity-20 mb-12">
            终
          </h2>
          <div className="text-center space-y-4 opacity-40">
            <p className="text-xs tracking-[0.3em]">侯孝贤 导演作品</p>
            <p className="text-xs tracking-[0.3em]">舒淇 张震 周韵 主演</p>
          </div>
        </section>
      </main>

      {/* Side Navigation Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {PLOT_POINTS.map((_, i) => (
          <div key={i} className="w-1 h-1 bg-white/20 rounded-full" />
        ))}
      </nav>
    </div>
  );
}
