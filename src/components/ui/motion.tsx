
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AnimationVariant = 
  | 'fade-in'
  | 'fade-up'
  | 'fade-down'
  | 'slide-in-right'
  | 'slide-in-left'
  | 'scale-in';

interface MotionProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const Motion: React.FC<MotionProps> = ({
  children,
  className,
  variant = 'fade-in',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const animationClass = isVisible ? `animate-${variant}` : 'opacity-0';
  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};
  const durationStyle = duration ? { animationDuration: `${duration}ms` } : {};

  return (
    <div
      ref={domRef}
      className={cn(animationClass, className)}
      style={{ ...delayStyle, ...durationStyle }}
    >
      {children}
    </div>
  );
};

export const MotionStagger: React.FC<{
  children: ReactNode[];
  className?: string;
  variant?: AnimationVariant;
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  threshold?: number;
}> = ({
  children,
  className,
  variant = 'fade-up',
  staggerDelay = 100,
  baseDelay = 0,
  duration = 500,
  threshold = 0.1,
}) => {
  return (
    <>
      {React.Children.map(children, (child, index) => (
        <Motion
          className={className}
          variant={variant}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          threshold={threshold}
        >
          {child}
        </Motion>
      ))}
    </>
  );
};
