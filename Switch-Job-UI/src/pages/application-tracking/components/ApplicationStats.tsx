import Icon from '../../../components/AppIcon';

interface Stats {
  total: number;
  active: number;
  interviews: number;
  responseRate: number;
}

const ApplicationStats = ({ stats }: { stats: Stats }) => {
  const statCards = [
    {
      label: 'Total Applications',
      value: stats?.total,
      icon: 'FileText',
      color: 'var(--color-primary)',
      bgColor: 'rgba(30, 58, 95, 0.1)'
    },
    {
      label: 'Active Applications',
      value: stats?.active,
      icon: 'Clock',
      color: 'var(--color-accent)',
      bgColor: 'rgba(255, 107, 71, 0.1)'
    },
    {
      label: 'Interviews Scheduled',
      value: stats?.interviews,
      icon: 'Calendar',
      color: 'var(--color-success)',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      label: 'Response Rate',
      value: `${stats?.responseRate}%`,
      icon: 'TrendingUp',
      color: 'var(--color-secondary)',
      bgColor: 'rgba(45, 90, 135, 0.1)'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 transition-smooth hover:shadow-elevation-3"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: stat?.bgColor }}
            >
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-1 data-text">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground">{stat?.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStats;