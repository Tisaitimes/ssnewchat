
import { cn } from '@/lib/utils';
import { Motion } from './motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        'feature-card group relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-soft',
        className
      )}
    >
      <div className="relative z-10">
        <div className={cn(
          'mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110',
          iconClassName
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 transform rounded-full bg-blue-50 dark:bg-blue-900/20 opacity-50 transition-all duration-300 group-hover:scale-110" />
    </div>
  );
};

export default FeatureCard;
