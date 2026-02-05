import Icon from '../../../components/AppIcon';

interface CareerProgressCardProps {
  title: string;
  value: number;
  total: number | null;
  percentage: number;
  icon: string;
  color: string;
}

const CareerProgressCard = ({ title, value, total, percentage, icon, color }: CareerProgressCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 transition-smooth hover:shadow-elevation-3">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-medium text-muted-foreground mb-1">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-foreground">
              {value}
            </span>
            {total && (
              <span className="text-sm md:text-base text-muted-foreground">
                / {total}
              </span>
            )}
          </div>
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon name={icon} size={24} color={color} />
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>

      <div className="mt-2 text-xs md:text-sm text-muted-foreground">
        {percentage}% Complete
      </div>
    </div>
  );
};

export default CareerProgressCard;