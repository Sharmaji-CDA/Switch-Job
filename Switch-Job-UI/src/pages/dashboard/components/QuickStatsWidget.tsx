import Icon from '../../../components/AppIcon';

interface Stat {
  icon: string;
  value: string | number;
  label: string;
  color: string;
  trend?: number | null;
}

interface QuickStatsWidgetProps {
  stats?: Stat[];
}

const QuickStatsWidget = ({ stats }: QuickStatsWidgetProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-5 transition-smooth hover:shadow-elevation-3"
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${stat?.color}20` }}
            >
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
            {stat?.trend && (
              <div className={`flex items-center gap-1 text-xs ${stat?.trend > 0 ? 'text-success' : 'text-error'}`}>
                <Icon name={stat?.trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={14} />
                <span>{Math.abs(stat?.trend)}%</span>
              </div>
            )}
          </div>
          <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">
            {stat?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsWidget;