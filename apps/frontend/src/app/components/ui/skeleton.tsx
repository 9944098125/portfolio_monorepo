import { cn } from 'utils/shadcn';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-[#e9e9e9]', className)}
      {...props}
    />
  );
}

export { Skeleton };
