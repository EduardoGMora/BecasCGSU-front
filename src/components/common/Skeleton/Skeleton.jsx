export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 rounded',
    card: 'h-48 rounded-lg',
    circle: 'rounded-full',
  };

  return (
    <div 
      className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`}
    />
  );
};

// src/components/features/scholarships/ScholarshipCardSkeleton.jsx
export const ScholarshipCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-1/2 mb-2" />
    <Skeleton className="h-4 w-2/3 mb-4" />
    <Skeleton className="h-20 mb-4" />
    <div className="flex justify-between">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);