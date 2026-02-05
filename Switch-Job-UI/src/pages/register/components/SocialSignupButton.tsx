import React from 'react';
import Icon from '../../../components/AppIcon';

interface SocialSignupButtonProps {
  provider: 'google' | 'linkedin';
  onClick: () => void;
}

interface ProviderConfig {
  icon: string;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const SocialSignupButton: React.FC<SocialSignupButtonProps> = ({ provider, onClick }) => {
  const providerConfig: Record<string, ProviderConfig> = {
    google: {
      icon: 'Chrome',
      label: 'Continue with Google',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    linkedin: {
      icon: 'Linkedin',
      label: 'Continue with LinkedIn',
      bgColor: 'bg-[#0A66C2] hover:bg-[#004182]',
      textColor: 'text-white',
      borderColor: 'border-[#0A66C2]'
    }
  };

  const config = providerConfig[provider];

  if (!config) {
    return null; // Handle invalid provider gracefully
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border ${config.borderColor} ${config.bgColor} ${config.textColor} font-medium transition-all duration-250 hover:shadow-elevation-2`}
    >
      <Icon name={config.icon} size={20} />
      <span>{config.label}</span>
    </button>
  );
};

export default SocialSignupButton;