import React from 'react';
import Select from '../../../components/ui/Select';

interface SortControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Most Recent' },
    { value: 'salary-high', label: 'Highest Salary' },
    { value: 'salary-low', label: 'Lowest Salary' },
    { value: 'match-score', label: 'Best Match' }
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select
        options={sortOptions}
        value={sortBy}
        onChange={(value) => {
          if (typeof value === 'string') {
            onSortChange(value);
          }
        }}
        className="w-full sm:w-48"
      />
    </div>
  );
};

export default SortControls;