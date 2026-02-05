import React from 'react';
import Icon from '../../../components/AppIcon';

interface TrustFeature {
  icon: string;
  text: string;
  color: string;
}

const TrustSignals: React.FC = () => {
  const trustFeatures: TrustFeature[] = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      color: 'var(--color-success)'
    },
    {
      icon: 'Lock',
      text: 'Secure Login',
      color: 'var(--color-primary)'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform',
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8 py-4 md:py-5 lg:py-6">
      {trustFeatures.map((feature, index) => (
        <div key={index} className="flex items-center gap-2">
          <Icon name={feature.icon} size={18} color={feature.color} />
          <span className="text-xs md:text-sm text-muted-foreground font-medium">
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;