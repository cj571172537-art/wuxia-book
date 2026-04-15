import React from 'react';
import { motion } from 'motion/react';
import { PlotPoint } from '../constants';
import { InkImage } from './InkImage';

interface PlotCardProps {
  point: PlotPoint;
}

export const PlotCard: React.FC<PlotCardProps> = ({ point }) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden snap-start">
      {/* Background Image */}
      <InkImage 
        prompt={point.imagePrompt} 
        alt={point.title} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-8 md:px-24 flex flex-col md:flex-row items-center gap-12">
        {/* Vertical Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden md:block"
        >
          <h2 className="writing-vertical-rl text-6xl font-serif tracking-[0.8em] text-white/80 leading-none">
            {point.title}
          </h2>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-cinematic-accent font-serif text-4xl italic">
              {point.id.toString().padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <h3 className="text-2xl font-serif text-white mb-2 md:hidden">
            {point.title}
          </h3>
          <p className="text-cinematic-accent font-serif italic tracking-[0.2em] mb-6">
            {point.subtitle}
          </p>
          
          <p className="text-lg font-serif leading-relaxed text-white/60 indent-8 mb-12">
            {point.description}
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-cinematic-accent" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">
              The Assassin
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Stamp */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-64 h-64 border-4 border-cinematic-accent flex items-center justify-center rotate-12">
          <span className="text-cinematic-accent font-serif text-9xl">隐</span>
        </div>
      </div>
    </section>
  );
};
