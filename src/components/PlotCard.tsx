import React from 'react';
import { PlotPoint } from '../constants';
import { InkImage } from './InkImage';

interface PlotCardProps {
  point: PlotPoint;
  imageUrl?: string;
  staticImage?: string;
  onImageChange: (dataUrl: string | null) => void;
}

export const PlotCard: React.FC<PlotCardProps> = ({ point, imageUrl, staticImage, onImageChange }) => {
  return (
    <div className="w-full h-full">
      <InkImage 
        alt={point.title} 
        className="w-full h-full"
        imageUrl={imageUrl}
        staticImage={staticImage}
        onImageChange={onImageChange}
      />
    </div>
  );
};
