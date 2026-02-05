import Icon from '../../../components/AppIcon';

const ApplicationTimeline = ({ timeline }: { timeline: any[] }) => {
  const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
      submitted: 'Send',
      reviewed: 'Eye',
      interview: 'Calendar',
      decision: 'CheckCircle',
      rejected: 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  const getStatusColor = (status: string, isCompleted: boolean) => {
    if (!isCompleted) return 'var(--color-muted-foreground)';
    
    const colors: Record<string, string> = {
      submitted: 'var(--color-secondary)',
      reviewed: 'var(--color-accent)',
      interview: 'var(--color-warning)',
      decision: 'var(--color-success)',
      rejected: 'var(--color-error)'
    };
    return colors?.[status] || 'var(--color-primary)';
  };

  return (
    <div className="space-y-4">
      {timeline?.map((item: any, index: number) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: item?.completed
                  ? `${getStatusColor(item?.status, true)}20`
                  : 'var(--color-muted)',
                border: `2px solid ${getStatusColor(item?.status, item?.completed)}`
              }}
            >
              <Icon
                name={getStatusIcon(item?.status)}
                size={20}
                color={getStatusColor(item?.status, item?.completed)}
              />
            </div>
            {index < timeline?.length - 1 && (
              <div
                className="w-0.5 h-12 mt-2"
                style={{
                  backgroundColor: item?.completed
                    ? getStatusColor(item?.status, true)
                    : 'var(--color-border)'
                }}
              />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-semibold text-foreground text-sm md:text-base">
                {item?.title}
              </h4>
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap ml-2">
                {item?.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item?.description}</p>
            {item?.nextAction && (
              <div className="mt-2 text-xs md:text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                Next: {item?.nextAction}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationTimeline;