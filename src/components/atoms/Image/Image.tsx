import { getValidImageUrl } from "@app-utils/stringUtils";
import React, { ImgHTMLAttributes, useEffect, useState } from 'react';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError' | 'onLoad'> {
  src: string;
  alt?: string;
  fallbackSrc?: string;
  onImageError?: (error: Event) => void;
  onImageLoad?: (event: Event) => void;
  hideOnError?: boolean;
  size?: 'fixed' | 'small' | 'medium' | 'large' | 'responsive';
  noImageIcon?: boolean; // Optional prop to indicate no image should be displayed
  className?: string;
  showLoading?: boolean; // Add loading effect
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallbackSrc,
  onImageError,
  onImageLoad,
  className = '',
  size = 'small',
  noImageIcon = false,
  hideOnError = false,
  showLoading = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(getValidImageUrl(src));
  const [hasError, setHasError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset image state when src changes
    setImageSrc(getValidImageUrl(src));
    setHasError(false);
    setIsHidden(false);
    setIsLoading(true);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (onImageError) {
      onImageError(e.nativeEvent);
    }

    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsLoading(true);
      return;
    }

    if (hideOnError) {
      setIsHidden(true);
      return;
    }

    setHasError(true);
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setTimeout(() => setIsLoading(false), 1000);
    if (onImageLoad) {
      onImageLoad(e.nativeEvent);
    }
  }

  if (isHidden) return null;

  // Define size styles based on size prop
  const getSizeStyles = () => {
    switch (size) {
    case 'small':
      return { width: '3rem', height: '3rem' };
    case 'medium':
      return { width: '6rem', height: '6rem' };
    case 'large':
      return { width: '12rem', height: '12rem' };
    case 'responsive':
      return { width: '100%', height: 'auto', aspectRatio: '1/1' };
    case 'fixed':
    default:
      return { width: '6rem', height: '6rem' };
    }
  };

  const sizeStyles = getSizeStyles();

  // If there's an error and we should show the error state
  if (hasError && !hideOnError) {
    return (
      noImageIcon ?
        <div
          className={`inline-flex items-center justify-center bg-gray-100 rounded ${className}`}
          style={{
            ...(props.width && props.height ? {} : { aspectRatio: size === 'responsive' ? '1/1' : undefined }),
          }}
        >
          <img
            src={imageSrc}
            alt={alt}
            onError={handleError}
            loading="lazy"
            className='absolute inset-0 object-cover hidden'
            {...props}
          />
          <div className="flex flex-col items-center text-gray-400">
            <svg
              className={`mb-1 ${size === 'small' ? 'w-3 h-3' : size === 'large' ? 'w-12 h-12' : size === 'medium' ? 'w-8 h-8' : 'w-4 h-4'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className={`${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : size === 'medium' ? 'text-md' : 'text-xs'}`}>
              No image
            </span>
          </div>
        </div>
        : <img
          src={imageSrc}
          alt={alt}
          className={className}
          onError={handleError}
          loading="lazy"
          style={sizeStyles}
          {...props}
        />
    );
  }

  // If there's an error but we should hide it, return null
  if (hasError && hideOnError) {
    return null;
  }

  // Normal state - return just the img element
  return (
    showLoading ? (
      <div className={className}>
        {isLoading && <div className={`inline-flex items-center justify-center ${className} bg-shimmer`}>
        </div>}
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
          {...props}
        />
      </div>
    ) : (
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    )
  );
};