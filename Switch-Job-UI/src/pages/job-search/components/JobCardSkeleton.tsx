import React from 'react';

const JobCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 border border-border animate-pulse">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-muted" />
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>

          <div className="flex gap-3">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-4 bg-muted rounded w-20" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>

          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-24" />
            <div className="h-6 bg-muted rounded w-20" />
          </div>

          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-16" />
            <div className="h-6 bg-muted rounded w-16" />
          </div>

          <div className="flex gap-2">
            <div className="h-9 bg-muted rounded flex-1" />
            <div className="h-9 bg-muted rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;