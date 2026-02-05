import Icon from '../../../components/AppIcon';

interface Activity {
  type: string;
  timestamp: string | Date;
  title: string;
  description: string;
  unread?: boolean;
}

interface ActivityFeedItemProps {
  activity: Activity;
}

const ActivityFeedItem = ({ activity }: ActivityFeedItemProps) => {
  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      application: 'FileText',
      interview: 'Calendar',
      message: 'MessageSquare',
      recommendation: 'Sparkles',
      profile: 'User'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      application: 'var(--color-primary)',
      interview: 'var(--color-success)',
      message: 'var(--color-accent)',
      recommendation: 'var(--color-warning)',
      profile: 'var(--color-secondary)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  const formatTimestamp = (timestamp: string | Date) => {
    const now = new Date().getTime();
    const activityDate = new Date(timestamp).getTime();
    const diffMs = now - activityDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg hover:bg-muted transition-smooth cursor-pointer">
      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${getActivityColor(activity?.type)}20` }}
      >
        <Icon
          name={getActivityIcon(activity?.type)}
          size={20}
          color={getActivityColor(activity?.type)}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm md:text-base font-medium text-foreground mb-1 line-clamp-1">
          {activity?.title}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-1">
          {activity?.description}
        </p>
        <span className="text-xs text-muted-foreground">
          {formatTimestamp(activity?.timestamp)}
        </span>
      </div>
      {activity?.unread && (
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent flex-shrink-0 mt-2" />
      )}
    </div>
  );
};

export default ActivityFeedItem;