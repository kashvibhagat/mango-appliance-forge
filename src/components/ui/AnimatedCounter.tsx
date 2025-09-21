import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: boolean;
}

export const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  className = '',
  trigger = true 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!trigger) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);
      
      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, trigger]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};