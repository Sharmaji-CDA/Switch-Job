import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

interface SalaryItem {
  id: number;
  role: string;
  roleTitle: string;
  department: string;
  level: string;
  experienceRange: string;
  location: string;
  averageSalary: string;
  minSalary: string;
  medianSalary: string;
  maxSalary: string;
  bonus: string;
  stockOptions: string;
  dataPoints: number;
}

interface SalaryInsightsProps {
  salaryData?: SalaryItem[];
  isPremium?: boolean;
}

const SalaryInsights = ({ salaryData, isPremium }: SalaryInsightsProps) => {
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'designer', label: 'Designer' },
    { value: 'data-scientist', label: 'Data Scientist' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const filteredData = salaryData?.filter(item => {
    if (selectedRole !== 'all' && item?.role !== selectedRole) return false;
    if (selectedLevel !== 'all' && item?.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Salary Insights
        </h2>
        {!isPremium && (
          <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 rounded-lg">
            <Icon name="Lock" size={16} className="text-accent" />
            <span className="text-sm md:text-base text-accent font-medium">
              Premium Feature
            </span>
          </div>
        )}
      </div>
      {isPremium ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
            <Select
              options={roleOptions}
              value={selectedRole}
              onChange={(value) => setSelectedRole(value as string)}
              placeholder="Select role"
              className="flex-1"
            />
            <Select
              options={levelOptions}
              value={selectedLevel}
              onChange={(value) => setSelectedLevel(value as string)}
              placeholder="Select experience level"
              className="flex-1"
            />
          </div>
          
          <div className="space-y-4">
            {filteredData?.map((item) => (
              <div
                key={item?.id}
                className="border border-border rounded-xl p-4 md:p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                      {item?.roleTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm md:text-base text-muted-foreground">
                      <span>{item?.department}</span>
                      <span>•</span>
                      <span>{item?.experienceRange}</span>
                      <span>•</span>
                      <span>{item?.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {item?.averageSalary}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      Average Annual
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted rounded-lg p-3 md:p-4">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">
                      Minimum
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-foreground">
                      {item?.minSalary}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 md:p-4">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">
                      Median
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-foreground">
                      {item?.medianSalary}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-3 md:p-4">
                    <div className="text-xs md:text-sm text-muted-foreground mb-1">
                      Maximum
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-foreground">
                      {item?.maxSalary}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span className="text-muted-foreground">
                      Bonus: <span className="text-foreground font-medium">{item?.bonus}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="DollarSign" size={16} className="text-primary" />
                    <span className="text-muted-foreground">
                      Stock Options: <span className="text-foreground font-medium">{item?.stockOptions}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={16} className="text-accent" />
                    <span className="text-muted-foreground">
                      Based on {item?.dataPoints} salaries
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 md:py-16">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={32} className="text-accent" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Unlock Detailed Salary Insights
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md mx-auto">
            Get access to comprehensive salary data, compensation trends, and negotiation insights with our Premium plan.
          </p>
          <Button variant="default" iconName="Crown" iconPosition="left">
            Upgrade to Premium
          </Button>
        </div>
      )}
    </div>
  );
};

export default SalaryInsights;