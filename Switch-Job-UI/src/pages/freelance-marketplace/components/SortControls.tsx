import Select from '../../../components/ui/Select';

interface SortControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortControls = ({ sortBy, onSortChange }: SortControlsProps) => {
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'rate-low', label: 'Rate: Low to High' },
    { value: 'rate-high', label: 'Rate: High to Low' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select
        value={sortBy}
        onChange={(value) => {
          if (typeof value === 'string') {
            onSortChange(value);
          }
        }}
        options={sortOptions}
        className="w-48"
      />
    </div>
  );
};

export default SortControls;