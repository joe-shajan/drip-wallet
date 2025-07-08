export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-700/50 ${className || ''}`.trim()}
      style={{ minHeight: 16 }}
    />
  );
}

export default Skeleton;
