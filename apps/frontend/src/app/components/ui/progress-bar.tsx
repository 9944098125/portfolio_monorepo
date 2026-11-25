import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from 'utils/shadcn';

type LabelItem = {
  label: string;
  value?: number;
};

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  labels?: LabelItem[];
  activeColor?: string;
  inactiveColor?: string;
  value?: number;
  onValueChange?: (value: number, activeLabel?: string) => void;
  showProgressIndicator?: boolean;
};

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  labels = [],
  activeColor = '#FE4D01',
  inactiveColor = '#AEAEAE1F',
  onValueChange,
  showProgressIndicator = true,
  ...props
}, ref) => {
  const { processedLabels } = React.useMemo(() => {
    if (labels.length === 0) return { processedLabels: [], segmentWidth: 0 };
    
    if (labels.some(label => label.value !== undefined)) {
      return {
        processedLabels: labels.map(label => ({
          label: label.label,
          value: label.value ?? 0
        })),
        segmentWidth: 0
      };
    }
    
    const segmentCount = labels.length - 1;
    const segmentWidth = 100 / segmentCount;
    
    return {
      processedLabels: labels.map((label, index) => ({
        label: label.label,
        value: Math.round(segmentWidth * index)
      })),
      segmentWidth
    };
  }, [labels]);

  const getActiveLabel = (val: number) => {
    const segmentCount = processedLabels.length - 1;
    const segmentWidth = segmentCount > 0 ? 100 / segmentCount : 0;
    const activeIndex = Math.round(val / segmentWidth);
    return processedLabels[Math.min(activeIndex, processedLabels.length - 1)]?.label;
  };

  const handleClick = (newValue: number) => {
    if (onValueChange) {
      onValueChange(newValue, getActiveLabel(newValue));
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onValueChange || processedLabels.length === 0) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    
    const closest = processedLabels.reduce((prev, curr) => {
      return (Math.abs(curr.value - percentage) < Math.abs(prev.value - percentage)) 
        ? curr 
        : prev;
    });
    
    onValueChange(closest.value, closest.label);
  };

  return (
    <div className="w-full space-y-4">
      <div 
        className="relative w-full cursor-pointer"
        onClick={handleProgressClick}
      >
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            'relative h-2 w-full overflow-hidden rounded-full',
            className
          )}
          style={{ backgroundColor: inactiveColor }}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="h-full transition-all"
            style={{ 
              width: `${value}%`,
              backgroundColor: activeColor,
            }}
          />
        </ProgressPrimitive.Root>

        {showProgressIndicator && processedLabels.length > 0 && (
          <div className="absolute inset-0 flex items-center">
            {processedLabels.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === processedLabels.length - 1;

              return (
                <div
                  key={`indicator-${item.value}`}
                  className={`absolute transition-all flex-shrink-0 ${value === item.value ? 'h-6 w-6 rounded-full bg-white border-[6px] border-[#FE4D01]' : ''}`}
                  style={{
                    left: `${item.value}%`,
                    transform: isFirst 
                      ? 'translateX(0)' 
                      : isLast 
                        ? 'translateX(-100%)' 
                        : 'translateX(-50%)',
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {processedLabels.length > 0 && (
        <div className="relative flex justify-between">
          {processedLabels.map((item, index) => (
            <div 
              key={`label-container-${item.value}`}
              className="flex flex-col items-center"
              style={{
                position: 'absolute',
                ...(index === 0 ? { left: '0' } :
                    index === processedLabels.length - 1 ? { right: '0' } :
                    { left: `${item.value}%`, transform: 'translateX(-50%)' })
              }}
            >
              <button
                type="button"
                className={`text-sm leading-normal transition-colors whitespace-nowrap ${value === item.value ? 'font-semibold' : 'font-medium'}`}
                style={{
                  color: value === item.value ? activeColor : '#667085',
                }}
                onClick={() => handleClick(item.value)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { ProgressBar };
