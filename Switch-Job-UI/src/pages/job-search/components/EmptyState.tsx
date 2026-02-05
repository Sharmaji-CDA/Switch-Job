import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon name="Search" size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2 text-center">
        No Jobs Found
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 text-center max-w-md">
        We couldn't find any jobs matching your current filters. Try adjusting your search criteria or clearing filters to see more results.
      </p>
      <Button
        variant="outline"
        iconName="RotateCcw"
        iconPosition="left"
        onClick={onClearFilters}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default EmptyState;