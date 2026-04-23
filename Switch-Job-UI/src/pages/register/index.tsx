import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import SubscriptionTierCard from './components/SubscriptionTierCard';
import SocialSignupButton from './components/SocialSignupButton';
import RegistrationForm, { type RegistrationFormData } from './components/RegistrationForm';

interface Tier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: { included: boolean; text: string }[];
}

const Register: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('free');
  const [showSocialSignup,] = useState<boolean>(true);

  const subscriptionTiers: Tier[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      features: [
        { text: 'Access to basic job listings', included: true },
        { text: 'Limited company reviews (5/month)', included: true },
        { text: 'Basic salary information', included: true },
        { text: 'Interview scheduling', included: true },
        { text: 'Free open-source courses', included: true },
        { text: 'Recruiter contact access', included: false },
        { text: 'High-package job listings', included: false },
        { text: 'AI resume optimization', included: false },
        { text: 'Paid internship listings', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Unlock your career potential',
      price: 29,
      features: [
        { text: 'Unlimited job applications', included: true },
        { text: 'Full access to company reviews', included: true },
        { text: 'Detailed salary insights & trends', included: true },
        { text: 'Priority interview scheduling', included: true },
        { text: 'Direct recruiter contact (20-40 applications)', included: true },
        { text: 'Exclusive high-package job access', included: true },
        { text: 'AI resume & project optimization', included: true },
        { text: 'AI interview preparation', included: true },
        { text: 'Paid internship opportunities', included: true }
      ]
    }
  ];

  const handleSocialSignup = (provider: 'google' | 'linkedin') => {
    console.log(`Signing up with ${provider}`);
  };

  const handleRegistration = (data: RegistrationFormData) => {
    console.log('Registration data:', data);
  };

  return (
    <>
      <title>Create Account - JobAI Connect</title>
      <meta name="description" content="Join JobAI Connect and unlock AI-powered job matching, career development tools, and connect with top recruiters." />
      <div className="min-h-screen bg-background">
        <div className="content-container py-8 md:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary mb-4 md:mb-6">
                <Icon name="Briefcase" size={32} color="#FFFFFF" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
                Start Your Career Journey
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of professionals finding their dream jobs with AI-powered matching
              </p>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-6 md:mb-8">
                Choose Your Plan
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {subscriptionTiers.map((tier) => (
                  <SubscriptionTierCard
                    key={tier.id}
                    tier={tier}
                    isSelected={selectedTier === tier.id}
                    onSelect={setSelectedTier}
                  />
                ))}
              </div>
            </div>

            <div className="max-w-xl mx-auto bg-card rounded-xl shadow-elevation-2 p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-6 md:mb-8">
                Create Your Account
              </h2>

              {showSocialSignup && (
                <>
                  <div className="space-y-3 mb-6">
                    <SocialSignupButton
                      provider="google"
                      onClick={() => handleSocialSignup('google')}
                    />
                    <SocialSignupButton
                      provider="linkedin"
                      onClick={() => handleSocialSignup('linkedin')}
                    />
                  </div>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </>
              )}

              <RegistrationForm
                selectedTier={selectedTier}
                onSubmit={handleRegistration}
              />
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={18} className="text-success" />
                  <span>Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={18} className="text-success" />
                  <span>50,000+ Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={18} className="text-success" />
                  <span>Trusted by Top Companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;