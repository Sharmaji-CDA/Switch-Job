import Icon from '../../../components/AppIcon';

interface Stat {
  color?: string;
  icon: string;
  value?: string | number;
  label?: string;
  trend?: number;
}

interface CompanyStatsProps {
  stats?: Stat[];
}

const CompanyStats = ({ stats }: CompanyStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 transition-smooth hover:shadow-elevation-3"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
              style={{ background: stat?.color }}
            >
              <Icon name={stat?.icon} size={20} color="#FFFFFF" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-2xl md:text-3xl font-bold text-foreground whitespace-nowrap">
                {stat?.value}
              </div>
            </div>
          </div>
          <div className="text-sm md:text-base text-muted-foreground">
            {stat?.label}
          </div>
          {stat?.trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs md:text-sm ${stat?.trend > 0 ? 'text-success' : 'text-error'}`}>
              <Icon name={stat?.trend > 0 ? "TrendingUp" : "TrendingDown"} size={14} />
              <span>{Math.abs(stat?.trend)}% vs last month</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompanyStats;