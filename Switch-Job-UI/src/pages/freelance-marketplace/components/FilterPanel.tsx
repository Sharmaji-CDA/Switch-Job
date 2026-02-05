import { Checkbox } from '../../../components/ui/Checkbox';

interface Filters {
  availability: string;
  hourlyRate: { min: number; max: number };
  experienceLevel: string;
  category: string;
  skills: string[];
  topRatedOnly: boolean;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const handleFilterUpdate = (key: string, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleRateChange = (type: string, value: string) => {
    onFilterChange({
      ...filters,
      hourlyRate: { ...filters?.hourlyRate, [type]: parseInt(value) || 0 }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Availability</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'available', label: 'Available Now' },
            { value: 'busy', label: 'Busy' },
          ]?.map((option) => (
            <label key={option?.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="availability"
                value={option?.value}
                checked={filters?.availability === option?.value}
                onChange={(e) => handleFilterUpdate('availability', e?.target?.value)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option?.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Hourly Rate</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Min: ${filters?.hourlyRate?.min}</label>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={filters?.hourlyRate?.min}
              onChange={(e) => handleRateChange('min', e?.target?.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Max: ${filters?.hourlyRate?.max}</label>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={filters?.hourlyRate?.max}
              onChange={(e) => handleRateChange('max', e?.target?.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Experience Level</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Levels' },
            { value: 'entry', label: 'Entry Level' },
            { value: 'mid', label: 'Mid Level' },
            { value: 'senior', label: 'Senior' },
          ]?.map((option) => (
            <label key={option?.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="experienceLevel"
                value={option?.value}
                checked={filters?.experienceLevel === option?.value}
                onChange={(e) => handleFilterUpdate('experienceLevel', e?.target?.value)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option?.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'development', label: 'Development' },
            { value: 'design', label: 'Design' },
            { value: 'writing', label: 'Writing' },
            { value: 'marketing', label: 'Marketing' },
          ]?.map((option) => (
            <label key={option?.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={option?.value}
                checked={filters?.category === option?.value}
                onChange={(e) => handleFilterUpdate('category', e?.target?.value)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{option?.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-border">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={filters?.topRatedOnly}
            onChange={(e) => handleFilterUpdate('topRatedOnly', e?.target?.checked)}
            indeterminate={false}
          />
          <span className="text-sm text-foreground">Top Rated Only</span>
        </label>
      </div>
      <button
        onClick={() => onFilterChange({
          availability: 'all',
          hourlyRate: { min: 0, max: 200 },
          experienceLevel: 'all',
          category: 'all',
          skills: [],
          topRatedOnly: false,
        })}
        className="w-full px-4 py-2 text-sm text-primary hover:bg-muted rounded-lg transition-smooth"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterPanel;