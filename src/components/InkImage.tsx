import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

interface InkImageProps {
  prompt: string;
  alt: string;
  className?: string;
}

export const InkImage: React.FC<InkImageProps> = ({ prompt, alt, className }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRequested = useRef(false);

  const generateImage = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setIsQuotaExceeded(false);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt + ", cinematic lighting, moody, deep shadows, high contrast, traditional Chinese aesthetic, ink wash style" }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: "1K"
          },
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
      if (part?.inlineData) {
        const base64EncodeString = part.inlineData.data;
        setImageUrl(`data:image/png;base64,${base64EncodeString}`);
      } else {
        throw new Error("No image data in response");
      }
    } catch (err: any) {
      console.error("Image generation failed:", err);
      
      const isQuotaError = err?.message?.includes("429") || err?.status === "RESOURCE_EXHAUSTED";
      
      if (isQuotaError) {
        setIsQuotaExceeded(true);
        setError("画师暂歇（API 配额已满）");
      } else {
        setError("意境难成，请稍后再试");
      }
      
      // Fallback to a thematic placeholder
      setImageUrl(`https://picsum.photos/seed/${encodeURIComponent(prompt)}/1200/675?grayscale&blur=2`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRequested.current) {
          hasRequested.current = true;
          generateImage();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [prompt]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-black/40 ${className}`}>
      <AnimatePresence mode="wait">
        {!hasRequested.current || loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/20"
          >
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-serif italic tracking-[0.3em]">
              {!hasRequested.current ? "等待入画..." : "正在构图..."}
            </span>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-4 z-20"
          >
            <div className="flex items-center gap-2 text-cinematic-accent">
              <AlertCircle className="w-4 h-4" />
              <p className="text-xs font-serif">{error}</p>
            </div>
            <button
              onClick={generateImage}
              className="flex items-center gap-2 px-4 py-2 text-[10px] border border-white/10 hover:bg-white/10 transition-colors font-serif text-white/60"
            >
              <RefreshCw className="w-3 h-3" />
              再次尝试
            </button>
            {imageUrl && (
              <p className="text-[10px] text-white/20 font-serif italic">已加载备用意境图</p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {imageUrl && (
        <motion.div
          key="image"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: error ? 0.3 : 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover opacity-60 mix-blend-lighten"
            referrerPolicy="no-referrer"
          />
          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-cinematic-bg/80 via-transparent to-cinematic-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-cinematic-bg via-transparent to-cinematic-bg/40" />
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        </motion.div>
      )}
    </div>
  );
};
