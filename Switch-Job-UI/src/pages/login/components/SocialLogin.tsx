import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const SocialLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const socialProviders: SocialProvider[] = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: '#4285F4'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: '#0A66C2'
    }
  ];

  const handleSocialLogin = (provider: SocialProvider) => {
    setLoadingProvider(provider.id);
    
    setTimeout(() => {
      console.log(`${provider.name} login initiated`);
      navigate('/dashboard');
      setLoadingProvider(null);
    }, 1500);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs md:text-sm uppercase">
          <span className="bg-card px-2 md:px-3 text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            size="lg"
            onClick={() => handleSocialLogin(provider)}
            loading={loadingProvider === provider.id}
            disabled={!!loadingProvider && loadingProvider !== provider.id}
            iconName={provider.icon}
            iconPosition="left"
            className="w-full"
          >
            {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;