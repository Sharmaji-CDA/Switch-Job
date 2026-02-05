const FreelancerCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 border border-border animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted" />
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="flex gap-3">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-4 bg-muted rounded w-24" />
          </div>
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-20" />
            <div className="h-6 bg-muted rounded w-20" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded w-16" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 bg-muted rounded flex-1" />
            <div className="h-10 bg-muted rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCardSkeleton;