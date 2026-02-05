import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

interface Filters {
  search: string;
  status: string;
  companyType: string;
  dateRange: string;
  startDate: string;
  endDate: string;
}

const ApplicationFilters = ({ 
  filters, 
  onFilterChange, 
  onReset 
}: { 
  filters: Filters; 
  onFilterChange: (key: string, value: any) => void; 
  onReset: () => void; 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'applied', label: 'Applied' },
    { value: 'reviewing', label: 'Under Review' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offered', label: 'Offered' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'withdrawn', label: 'Withdrawn' }
  ];

  const companyTypeOptions = [
    { value: 'all', label: 'All Companies' },
    { value: 'startup', label: 'Startup' },
    { value: 'mid-size', label: 'Mid-Size' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'remote-first', label: 'Remote-First' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 mb-4 md:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search by company or position..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />

          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />

          <Select
            placeholder="Company type"
            options={companyTypeOptions}
            value={filters?.companyType}
            onChange={(value) => onFilterChange('companyType', value)}
          />

          <Select
            placeholder="Date range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => onFilterChange('dateRange', value)}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
          >
            Reset
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      {filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <Input
            type="date"
            label="From Date"
            value={filters?.startDate}
            onChange={(e) => onFilterChange('startDate', e?.target?.value)}
          />
          <Input
            type="date"
            label="To Date"
            value={filters?.endDate}
            onChange={(e) => onFilterChange('endDate', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;