import React from 'react';
import { PlotPoint } from '../constants';
import { InkImage } from './InkImage';

interface PlotCardProps {
  point: PlotPoint;
  imageUrl?: string;
  onImageChange: (dataUrl: string | null) => void;
}

export const PlotCard: React.FC<PlotCardProps> = ({ point, imageUrl, onImageChange }) => {
  return (
    <div className="w-full h-full">
      <InkImage 
        alt={point.title} 
        className="w-full h-full"
        imageUrl={imageUrl}
        onImageChange={onImageChange}
      />
    </div>
  );
};
