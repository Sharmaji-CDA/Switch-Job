import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  onClick: () => void;
  isPremium?: boolean;
}

const QuickActionCard = ({ title, description, icon, buttonText, onClick, isPremium }: QuickActionCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 transition-smooth hover:shadow-elevation-3">
      <div className="flex flex-col h-full">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Icon name={icon} size={24} color="#FFFFFF" />
        </div>

        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground mb-4 flex-1">
          {description}
        </p>

        <Button
          variant={isPremium ? "default" : "outline"}
          size="default"
          iconName={isPremium ? "Crown" : "ArrowRight"}
          iconPosition="right"
          onClick={onClick}
          fullWidth
        >
          {buttonText}
        </Button>

        {isPremium && (
          <div className="mt-2 text-xs text-center text-accent">
            Premium Feature
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionCard;