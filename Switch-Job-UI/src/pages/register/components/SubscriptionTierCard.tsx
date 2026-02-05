import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface Tier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: { included: boolean; text: string }[];
}

interface SubscriptionTierCardProps {
  tier: Tier;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SubscriptionTierCard: React.FC<SubscriptionTierCardProps> = ({ tier, isSelected, onSelect }) => {
  const isPopular = tier.id === 'premium';

  return (
    <div
      className={`relative rounded-xl p-6 md:p-8 transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-accent shadow-elevation-3'
          : 'ring-1 ring-border hover:shadow-elevation-2'
      } ${isPopular ? 'bg-gradient-to-br from-primary/5 to-accent/5' : 'bg-card'}`}
      onClick={() => onSelect(tier.id)}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
            <Icon name="Star" size={14} />
            Most Popular
          </span>
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-1">
            {tier.name}
          </h3>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected
              ? 'border-accent bg-accent' :'border-border bg-transparent'
          }`}
        >
          {isSelected && <Icon name="Check" size={16} color="#FFFFFF" />}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl md:text-4xl font-bold text-foreground">
            ${tier.price}
          </span>
          <span className="text-muted-foreground">/month</span>
        </div>
        {tier.id === 'free' && (
          <p className="text-xs text-muted-foreground mt-1">No credit card required</p>
        )}
      </div>
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Icon
              name={feature.included ? 'Check' : 'X'}
              size={18}
              className={`flex-shrink-0 mt-0.5 ${
                feature.included ? 'text-success' : 'text-muted-foreground'
              }`}
            />
            <span
              className={`text-sm ${
                feature.included ? 'text-foreground' : 'text-muted-foreground line-through'
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
      <Button
        variant={isSelected ? 'default' : 'outline'}
        fullWidth
        onClick={(e) => {
          e.stopPropagation();
          onSelect(tier.id);
        }}
      >
        {isSelected ? 'Selected' : 'Select Plan'}
      </Button>
    </div>
  );
};

export default SubscriptionTierCard;