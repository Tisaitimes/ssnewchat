
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loadingClassName?: string;
  placeholderSrc?: string;
}

const LoadingImage = ({
  src,
  alt,
  className,
  containerClassName,
  loadingClassName = 'animate-pulse bg-gray-200 dark:bg-gray-800',
  placeholderSrc = '/placeholder.svg',
  ...props
}: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-all duration-500',
          isLoading ? 'image-blur-loading' : 'image-blur-loaded',
          className
        )}
        {...props}
      />
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            loadingClassName
          )}
        />
      )}
    </div>
  );
};

export default LoadingImage;
