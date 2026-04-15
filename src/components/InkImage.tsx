import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Image as ImageIcon, X, RefreshCw, Download, CheckCircle2 } from 'lucide-react';

interface InkImageProps {
  alt: string;
  className?: string;
  imageUrl?: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export const InkImage: React.FC<InkImageProps> = ({ alt, className, imageUrl, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `assassin-${alt.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`relative overflow-hidden bg-stone-100/50 border border-stone-200 rounded-3xl ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!imageUrl ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm border border-stone-100">
              <ImageIcon className="w-10 h-10 text-stone-200" />
            </div>
            <h4 className="text-lg font-serif mb-2 text-stone-800">上传剧照或意境图</h4>
            <p className="text-xs text-stone-400 mb-8 max-w-[240px] leading-relaxed">
              为此章节上传一张你认为契合意境的图片，它将被自动保存。
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3 px-8 py-3 bg-stone-900 text-white text-sm font-serif rounded-full hover:bg-ink-red transition-all shadow-lg shadow-stone-200"
            >
              <Upload className="w-4 h-4" />
              选择图片
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full relative"
          >
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Overlay controls */}
            <div className="absolute top-6 right-6 flex gap-2">
              <button
                onClick={downloadImage}
                className="p-3 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full hover:bg-white transition-all shadow-md text-stone-600 hover:text-ink-red"
                title="下载图片"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full hover:bg-white transition-all shadow-md text-stone-600 hover:text-ink-red"
                title="更换图片"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={clearImage}
                className="p-3 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full hover:bg-white transition-all shadow-md text-stone-600 hover:text-ink-red"
                title="移除图片"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full text-[10px] uppercase tracking-widest text-stone-600 font-bold shadow-sm">
              <CheckCircle2 className="w-3 h-3 text-green-600" />
              已自动保存
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
