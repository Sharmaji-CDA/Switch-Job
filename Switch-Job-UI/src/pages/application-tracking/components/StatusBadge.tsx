const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; bgColor: string; textColor: string; borderColor: string }> = {
    applied: {
      label: 'Applied',
      bgColor: 'rgba(45, 90, 135, 0.15)',
      textColor: 'var(--color-secondary)',
      borderColor: 'var(--color-secondary)'
    },
    reviewing: {
      label: 'Under Review',
      bgColor: 'rgba(255, 107, 71, 0.15)',
      textColor: 'var(--color-accent)',
      borderColor: 'var(--color-accent)'
    },
    interviewing: {
      label: 'Interviewing',
      bgColor: 'rgba(245, 158, 11, 0.15)',
      textColor: 'var(--color-warning)',
      borderColor: 'var(--color-warning)'
    },
    offered: {
      label: 'Offered',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      textColor: 'var(--color-success)',
      borderColor: 'var(--color-success)'
    },
    rejected: {
      label: 'Rejected',
      bgColor: 'rgba(239, 68, 68, 0.15)',
      textColor: 'var(--color-error)',
      borderColor: 'var(--color-error)'
    },
    withdrawn: {
      label: 'Withdrawn',
      bgColor: 'rgba(74, 85, 104, 0.15)',
      textColor: 'var(--color-muted-foreground)',
      borderColor: 'var(--color-muted-foreground)'
    }
  };

  const config = statusConfig[status] || statusConfig.applied;

  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap"
      style={{
        backgroundColor: config?.bgColor,
        color: config?.textColor,
        border: `1px solid ${config?.borderColor}`
      }}
    >
      {config?.label}
    </span>
  );
};

export default StatusBadge;