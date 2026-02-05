import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';


// --- Add TypeScript types for props and filters ---
interface SalaryRange {
  min: number;
  max: number;
}

interface JobTypes {
  fullTime?: boolean;
  partTime?: boolean;
  contract?: boolean;
  freelance?: boolean;
}

interface Filters {
  locationType?: string;
  salary?: SalaryRange;
  experienceLevel?: string;
  industry?: string;
  companySize?: string;
  jobTypes?: JobTypes;
  premiumOnly?: boolean;
  savedOnly?: boolean;
  [key: string]: any;
}

interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange, onClearFilters, isOpen = false, onClose = () => {} }) => {
  const locationTypeOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'remote', label: 'Remote' },
    { value: 'hybrid', label: 'Hybrid' },
    { value: 'onsite', label: 'On-site' }
  ];

  const experienceLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' }
  ];

  const companySizeOptions = [
    { value: 'all', label: 'All Sizes' },
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' }
  ];

  const handleSalaryChange = (type: 'min' | 'max', value: string) => {
    onFilterChange('salary', {
      ...filters?.salary,
      [type]: parseInt(value) || 0
    });
  };

  return (
    <div
      className={`
        fixed lg:relative inset-0 lg:inset-auto z-[150] lg:z-auto
        bg-background lg:bg-transparent
        transition-transform duration-300 lg:transition-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="h-full lg:h-auto overflow-y-auto lg:overflow-visible">
        <div className="sticky top-0 lg:hidden bg-card p-4 border-b border-border flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close filters"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-4 lg:p-0 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Location Type</h3>
            <Select
              options={locationTypeOptions}
              value={filters?.locationType}
              onChange={(value) => onFilterChange('locationType', value)}
              placeholder="Select location type"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Salary Range</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Minimum: ${filters?.salary?.min?.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={filters?.salary?.min}
                  onChange={(e) => handleSalaryChange('min', e?.target?.value)}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  Maximum: ${filters?.salary?.max?.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="300000"
                  step="10000"
                  value={filters?.salary?.max}
                  onChange={(e) => handleSalaryChange('max', e?.target?.value)}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Experience Level</h3>
            <Select
              options={experienceLevelOptions}
              value={filters?.experienceLevel}
              onChange={(value) => onFilterChange('experienceLevel', value)}
              placeholder="Select experience level"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Industry</h3>
            <Select
              options={industryOptions}
              value={filters?.industry}
              onChange={(value) => onFilterChange('industry', value)}
              placeholder="Select industry"
              searchable
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Company Size</h3>
            <Select
              options={companySizeOptions}
              value={filters?.companySize}
              onChange={(value) => onFilterChange('companySize', value)}
              placeholder="Select company size"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Job Type</h3>
            <div className="space-y-2">
              <Checkbox
                              label="Full-time"
                              checked={filters?.jobTypes?.fullTime}
                              onChange={(e) => onFilterChange('jobTypes', {
                                  ...filters?.jobTypes,
                                  fullTime: e?.target?.checked
                              })} indeterminate={undefined}              />
              <Checkbox
                              label="Part-time"
                              checked={filters?.jobTypes?.partTime}
                              onChange={(e) => onFilterChange('jobTypes', {
                                  ...filters?.jobTypes,
                                  partTime: e?.target?.checked
                              })} indeterminate={undefined}              />
              <Checkbox
                              label="Contract"
                              checked={filters?.jobTypes?.contract}
                              onChange={(e) => onFilterChange('jobTypes', {
                                  ...filters?.jobTypes,
                                  contract: e?.target?.checked
                              })} indeterminate={undefined}              />
              <Checkbox
                              label="Freelance"
                              checked={filters?.jobTypes?.freelance}
                              onChange={(e) => onFilterChange('jobTypes', {
                                  ...filters?.jobTypes,
                                  freelance: e?.target?.checked
                              })} indeterminate={undefined}              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Additional Filters</h3>
            <div className="space-y-2">
              <Checkbox
                              label="Show Premium Jobs Only"
                              checked={filters?.premiumOnly}
                              onChange={(e) => onFilterChange('premiumOnly', e?.target?.checked)} indeterminate={undefined}              />
              <Checkbox
                              label="Show Saved Jobs"
                              checked={filters?.savedOnly}
                              onChange={(e) => onFilterChange('savedOnly', e?.target?.checked)} indeterminate={undefined}              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              fullWidth
              iconName="RotateCcw"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;