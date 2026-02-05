import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface SubscriptionUpgradeCardProps {
  onUpgrade: () => void;
}

const SubscriptionUpgradeCard = ({ onUpgrade }: SubscriptionUpgradeCardProps) => {
  const premiumFeatures = [
    { icon: 'Crown', text: 'Access to high-package jobs' },
    { icon: 'Users', text: 'Direct recruiter connections' },
    { icon: 'Zap', text: 'Early application access (20-40 apps)' },
    { icon: 'FileText', text: 'AI resume optimization' },
    { icon: 'TrendingUp', text: 'Advanced analytics dashboard' },
    { icon: 'Award', text: 'Paid internship listings' }
  ];

  return (
    <div
      className="rounded-lg shadow-elevation-3 p-6 md:p-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
        <Icon name="Crown" size={128} color="#FFFFFF" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Crown" size={28} color="#FFFFFF" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Upgrade to Premium
          </h2>
        </div>

        <p className="text-sm md:text-base text-white opacity-90 mb-6">
          Unlock exclusive features and accelerate your job search with premium access
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {premiumFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name={feature?.icon} size={18} color="#FFFFFF" />
              <span className="text-sm text-white">{feature?.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={onUpgrade}
            className="flex-1 bg-white text-primary hover:bg-white/90"
          >
            Upgrade Now - $29/month
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-white text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>

        <p className="text-xs text-white opacity-75 mt-4 text-center">
          Cancel anytime • 14-day money-back guarantee
        </p>
      </div>
    </div>
  );
};

export default SubscriptionUpgradeCard;