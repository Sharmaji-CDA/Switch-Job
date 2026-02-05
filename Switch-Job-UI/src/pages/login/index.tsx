import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import TrustSignals from './components/TrustSignals';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import RegistrationPrompt from './components/RegistrationPrompt';
import LoginBenefits from './components/LoginBenefits';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-md space-y-6 md:space-y-8">
            {/* Logo and Header */}
            <div className="text-center space-y-2 md:space-y-3">
              <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4 md:mb-6">
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--color-primary)' }}>

                  <Icon name="Briefcase" size={28} color="#FFFFFF" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  JobAI Connect
                </span>
              </Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Sign in to continue your job search journey
              </p>
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Login Form */}
            <div className="bg-card rounded-xl shadow-elevation-2 p-6 md:p-8 border border-border">
              <LoginForm />
            </div>

            {/* Social Login */}
            <SocialLogin />

            {/* Registration Prompt */}
            <RegistrationPrompt />

            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link to="/help" className="hover:text-foreground transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Benefits & Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 lg:p-12 items-center justify-center">
          <div className="max-w-xl space-y-8">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-4">
              <Image
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1efc8391b-1767700962291.png"
                alt="Diverse team of professionals collaborating in modern office space with laptops and documents on conference table"
                className="w-full h-80 object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Your Dream Job Awaits
                </h2>
                <p className="text-white/90 text-sm">
                  Join thousands of professionals who found their perfect match
                </p>
              </div>
            </div>

            {/* Benefits */}
            <LoginBenefits />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default Login;