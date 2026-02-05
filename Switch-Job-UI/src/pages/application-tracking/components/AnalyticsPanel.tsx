import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface AnalyticsData {
  avgResponseTime: string;
  responseTimeTrend: number;
  interviewConversion: number;
  conversionTrend: number;
  successRate: number;
  successTrend: number;
  responseRate: number;
}

const AnalyticsPanel = ({ analytics }: { analytics: AnalyticsData }) => {
  const metrics = [
    {
      label: 'Average Response Time',
      value: analytics?.avgResponseTime,
      icon: 'Clock',
      trend: analytics?.responseTimeTrend,
      trendLabel: 'vs last month'
    },
    {
      label: 'Interview Conversion',
      value: `${analytics?.interviewConversion}%`,
      icon: 'TrendingUp',
      trend: analytics?.conversionTrend,
      trendLabel: 'vs last month'
    },
    {
      label: 'Success Rate',
      value: `${analytics?.successRate}%`,
      icon: 'Target',
      trend: analytics?.successTrend,
      trendLabel: 'vs last month'
    }
  ];

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'var(--color-success)';
    if (trend < 0) return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Application Analytics</h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {metrics?.map((metric, index) => (
          <div key={index} className="p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}
              >
                <Icon name={metric?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 data-text">
              {metric?.value}
            </div>
            <div className="flex items-center gap-2">
              <Icon
                name={getTrendIcon(metric?.trend)}
                size={16}
                color={getTrendColor(metric?.trend)}
              />
              <span
                className="text-xs md:text-sm font-medium"
                style={{ color: getTrendColor(metric?.trend) }}
              >
                {metric?.trend > 0 ? '+' : ''}{metric?.trend}%
              </span>
              <span className="text-xs text-muted-foreground">{metric?.trendLabel}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 107, 71, 0.1)', border: '1px solid var(--color-accent)' }}>
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          <div>
            <div className="font-semibold text-foreground mb-1">AI Insight</div>
            <p className="text-sm text-muted-foreground">
              Your response rate is {analytics?.responseRate}% higher than average. Consider applying to similar roles to maximize your success rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;