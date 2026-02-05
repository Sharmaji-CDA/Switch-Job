import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

interface Job {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  posted: string;
  applicants: number;
  featured?: boolean;
  urgent?: boolean;
  description: string;
  skills: string[];
}

interface JobOpeningsProps {
  jobs?: Job[];
}

const JobOpenings = ({ jobs }: JobOpeningsProps) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const filteredJobs = jobs?.filter(job => {
    if (filterType !== 'all' && job?.type !== filterType) return false;
    if (filterDepartment !== 'all' && job?.department !== filterDepartment) return false;
    return true;
  });

  const handleApply = (jobId: string) => {
    navigate('/application-tracking', { state: { jobId } });
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Open Positions ({filteredJobs?.length})
        </h2>
        <Button
          variant="outline"
          iconName="Bell"
          iconPosition="left"
          onClick={() => console.log('Job alerts enabled')}
        >
          Get Job Alerts
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <Select
          options={typeOptions}
          value={filterType}
          onChange={(value) => setFilterType(value as string)}
          placeholder="Filter by type"
          className="flex-1"
        />
        <Select
          options={departmentOptions}
          value={filterDepartment}
          onChange={(value) => setFilterDepartment(value as string)}
          placeholder="Filter by department"
          className="flex-1"
        />
      </div>
      <div className="space-y-4">
        {filteredJobs?.map((job) => (
          <div
            key={job?.id}
            className="border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-elevation-2 cursor-pointer"
            onClick={() => navigate('/job-search', { state: { jobId: job?.id } })}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">
                    {job?.title}
                  </h3>
                  {job?.featured && (
                    <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                  {job?.urgent && (
                    <span className="px-2 py-1 bg-error/10 text-error rounded text-xs font-medium">
                      Urgent
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3 md:gap-4 mb-3 text-sm md:text-base text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    <span>{job?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={16} />
                    <span>{job?.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} />
                    <span>{job?.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>Posted {job?.posted}</span>
                  </div>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground mb-3 line-clamp-2">
                  {job?.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {job?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-xs md:text-sm text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 lg:items-end">
                <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                  <Icon name="Users" size={16} />
                  <span>{job?.applicants} applicants</span>
                </div>
                <Button
                  variant="default"
                  iconName="Send"
                  iconPosition="right"
                  onClick={(e) => {
                    e?.stopPropagation();
                    handleApply(job?.id);
                  }}
                  className="w-full lg:w-auto"
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredJobs?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-base md:text-lg text-muted-foreground">
            No jobs found matching your filters
          </p>
        </div>
      )}
    </div>
  );
};

export default JobOpenings;