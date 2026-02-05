import React from 'react';
import Icon from '../../../components/AppIcon';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const LoginBenefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: 'Sparkles',
      title: 'AI-Powered Matching',
      description: 'Get personalized job recommendations based on your skills and preferences'
    },
    {
      icon: 'Users',
      title: 'Connect with Recruiters',
      description: 'Direct access to hiring managers and early application opportunities'
    },
    {
      icon: 'TrendingUp',
      title: 'Career Growth',
      description: 'Track your progress, access courses, and advance your career'
    },
    {
      icon: 'Calendar',
      title: 'Interview Scheduling',
      description: 'Seamlessly schedule and manage your interviews in one place'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground text-center">
        Why Join JobAI Connect?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-4 md:p-5 lg:p-6 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-all duration-250"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-primary)' }}
              >
                <Icon name={benefit.icon} size={20} color="#FFFFFF" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-1 md:mb-2">
                  {benefit.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginBenefits;