import Icon from '../../../components/AppIcon';

interface Quarter {
  period: string;
  hires: number;
  percentage: number;
}

interface Department {
  name: string;
  growth: number;
  color: string;
}

interface GrowthMetricsProps {
  metrics: {
    hiringGrowth?: number;
    hiringByQuarter?: Quarter[];
    departmentGrowth?: Department[];
    activeOpenings?: number;
    openingsGrowth?: number;
    avgTimeToHire?: string;
    industryAvgTime?: string;
    acceptanceRate?: number;
  };
}

const GrowthMetrics = ({ metrics }: GrowthMetricsProps) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
        Growth & Hiring Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        <div className="bg-muted rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Hiring Growth
            </h3>
            <div className="flex items-center gap-2 text-success">
              <Icon name="TrendingUp" size={20} />
              <span className="text-sm md:text-base font-semibold">
                +{metrics?.hiringGrowth}%
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {metrics?.hiringByQuarter?.map((quarter, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm md:text-base">
                  <span className="text-muted-foreground">{quarter?.period}</span>
                  <span className="text-foreground font-medium">{quarter?.hires} hires</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-smooth"
                    style={{ width: `${quarter?.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-muted rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Department Growth
            </h3>
            <Icon name="Users" size={20} className="text-accent" />
          </div>
          <div className="space-y-3">
            {metrics?.departmentGrowth?.map((dept, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm md:text-base">
                  <span className="text-muted-foreground">{dept?.name}</span>
                  <span className="text-foreground font-medium">+{dept?.growth}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-smooth"
                    style={{ 
                      width: `${dept?.growth}%`,
                      background: dept?.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-muted rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Briefcase" size={20} color="#FFFFFF" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {metrics?.activeOpenings}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Active Openings
              </div>
            </div>
          </div>
          <div className="text-xs md:text-sm text-success flex items-center gap-1">
            <Icon name="TrendingUp" size={14} />
            <span>+{metrics?.openingsGrowth}% this month</span>
          </div>
        </div>
        
        <div className="bg-muted rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-accent flex items-center justify-center">
              <Icon name="Users" size={20} color="#FFFFFF" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {metrics?.avgTimeToHire}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Avg. Time to Hire
              </div>
            </div>
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            Industry avg: {metrics?.industryAvgTime}
          </div>
        </div>
        
        <div className="bg-muted rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success flex items-center justify-center">
              <Icon name="Target" size={20} color="#FFFFFF" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {metrics?.acceptanceRate}%
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Offer Acceptance
              </div>
            </div>
          </div>
          <div className="text-xs md:text-sm text-success flex items-center gap-1">
            <Icon name="TrendingUp" size={14} />
            <span>Above industry average</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthMetrics;