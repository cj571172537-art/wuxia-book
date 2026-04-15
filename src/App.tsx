import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PLOT_POINTS } from './constants';
import { PlotCard } from './components/PlotCard';
import { BookOpen, X, Save, AlertTriangle } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getAllImages, saveImage, deleteImage } from './lib/db';

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [images, setImages] = useState<Record<number, string>>({});
  const [quotaError, setQuotaError] = useState(false);

  // Load images from IndexedDB on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        // First, check if there's anything in localStorage to migrate
        const savedInLocalStorage = localStorage.getItem('assassin_scrapbook_images');
        if (savedInLocalStorage) {
          const legacyImages = JSON.parse(savedInLocalStorage);
          for (const [id, dataUrl] of Object.entries(legacyImages)) {
            await saveImage(Number(id), dataUrl as string);
          }
          // Clear legacy storage after migration
          localStorage.removeItem('assassin_scrapbook_images');
        }

        const dbImages = await getAllImages();
        setImages(dbImages);
      } catch (e) {
        console.error("Failed to load images from DB", e);
      }
    };
    loadImages();
  }, []);

  // Save images to IndexedDB when they change
  const handleImageChange = async (id: number, dataUrl: string | null) => {
    try {
      if (dataUrl) {
        await saveImage(id, dataUrl);
        setImages(prev => ({ ...prev, [id]: dataUrl }));
      } else {
        await deleteImage(id);
        setImages(prev => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
      setQuotaError(false);
    } catch (e) {
      console.error("Failed to save to IndexedDB", e);
      setQuotaError(true);
    }
  };

  const selectedPoint = PLOT_POINTS.find(p => p.id === selectedId);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-cinematic-bg text-stone-800 font-sans selection:bg-ink-red selection:text-white p-6 md:p-12 relative overflow-hidden">
        {/* Quota Error Toast */}
        <AnimatePresence>
          {quotaError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-red-50 border border-red-100 px-6 py-3 rounded-full shadow-lg flex items-center gap-3"
            >
              <AlertTriangle className="w-4 h-4 text-ink-red" />
              <span className="text-xs font-serif text-stone-700">存储系统异常，图片可能无法保存。请尝试清理浏览器缓存。</span>
              <button onClick={() => setQuotaError(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0" />

      {/* Header */}
      <header className="mb-12 flex justify-between items-end relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 border border-stone-300 flex items-center justify-center rounded-lg bg-white/50">
              <BookOpen className="w-4 h-4 text-ink-red" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400">Interactive Scrapbook</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900">刺客聂隐娘</h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-1">Directed by Hou Hsiao-Hsien</p>
          <p className="text-xs font-serif italic text-ink-red">Lovart AI Edition</p>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px] relative z-10">
        {PLOT_POINTS.map((point, index) => {
          const spans = [
            "md:col-span-2 md:row-span-2", // 1
            "md:col-span-2 md:row-span-1", // 2
            "md:col-span-1 md:row-span-2", // 3
            "md:col-span-1 md:row-span-1", // 4
            "md:col-span-2 md:row-span-1", // 5
            "md:col-span-2 md:row-span-1", // 6
          ];
          
          return (
            <motion.div
              key={point.id}
              layoutId={`card-${point.id}`}
              onClick={() => setSelectedId(point.id)}
              className={`relative cursor-pointer group overflow-hidden rounded-2xl border border-stone-200 bg-white/40 hover:bg-white/80 transition-all hover:shadow-xl hover:shadow-stone-200/50 ${spans[index] || ""}`}
            >
              {/* Card Cover Image */}
              <AnimatePresence>
                {images[point.id] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-0"
                  >
                    <img 
                      src={images[point.id]} 
                      alt={point.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-serif italic font-bold ${images[point.id] ? 'text-white' : 'text-ink-red'}`}>
                    {point.id.toString().padStart(2, '0')}
                  </span>
                  <div className="px-2 py-1 rounded border border-stone-200 text-[8px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-white/50">
                    OPEN
                  </div>
                </div>
                <div>
                  <h3 className={`text-2xl font-serif mb-1 transition-colors ${images[point.id] ? 'text-white group-hover:text-white' : 'text-stone-900 group-hover:text-ink-red'}`}>
                    {point.title}
                  </h3>
                  <p className={`text-[10px] uppercase tracking-widest font-medium ${images[point.id] ? 'text-stone-300' : 'text-stone-400'}`}>
                    {point.subtitle}
                  </p>
                </div>
              </div>
              
              {/* Decorative background elements - only show if no image */}
              {!images[point.id] && (
                <div className="absolute -bottom-6 -right-6 text-[12rem] font-serif opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none text-ink-red">
                  隐
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedPoint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[850px] border border-stone-200"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 z-30 p-3 bg-stone-100 text-stone-400 rounded-full hover:bg-stone-200 hover:text-stone-900 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image/Upload */}
              <div className="w-full md:w-3/5 h-[350px] md:h-auto relative bg-stone-50">
                <PlotCard 
                  point={selectedPoint} 
                  imageUrl={images[selectedPoint.id]} 
                  onImageChange={(dataUrl) => handleImageChange(selectedPoint.id, dataUrl)}
                />
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-2/5 p-10 md:p-16 overflow-y-auto flex flex-col bg-white relative">
                {/* Subtle paper texture for modal content */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                
                <div className="mb-12 relative z-10">
                  <span className="text-ink-red font-serif italic text-3xl mb-4 block font-bold">
                    {selectedPoint.id.toString().padStart(2, '0')}
                  </span>
                  <h2 className="text-5xl font-serif mb-4 text-stone-900 leading-tight">{selectedPoint.title}</h2>
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-stone-100" />
                    <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">{selectedPoint.subtitle}</p>
                  </div>
                </div>

                <div className="flex-1 relative z-10">
                  <p className="text-xl font-serif leading-relaxed text-stone-700 indent-10 mb-8">
                    {selectedPoint.description}
                  </p>
                </div>

                <div className="pt-10 border-t border-stone-100 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-ink-red flex items-center justify-center bg-ink-red/5">
                      <span className="text-ink-red text-xs font-serif font-bold">隐</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 block font-bold">The Assassin</span>
                      <span className="text-[8px] uppercase tracking-widest text-stone-300">Hou Hsiao-Hsien</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="px-6 py-2 rounded-full border border-stone-200 text-[10px] font-serif tracking-widest text-stone-400 hover:bg-stone-50 hover:text-stone-900 transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 pt-16 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 relative z-10">
        <div className="text-[10px] tracking-[0.6em] uppercase font-bold text-stone-500">A Hou Hsiao-Hsien Film</div>
        <div className="flex gap-12 text-[10px] tracking-[0.4em] uppercase font-bold text-stone-500">
          <span className="hover:text-ink-red transition-colors cursor-default">Scrapbook</span>
          <span className="hover:text-ink-red transition-colors cursor-default">Lovart AI</span>
          <span className="hover:text-ink-red transition-colors cursor-default">Interactive</span>
        </div>
      </footer>
    </div>
    </ErrorBoundary>
  );
}
