import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const RegistrationPrompt: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-3 md:space-y-4">
      <p className="text-sm md:text-base text-muted-foreground">
        Don't have an account yet?
      </p>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => navigate('/register')}
        iconName="UserPlus"
        iconPosition="right"
        className="w-full md:w-auto"
      >
        Create Account
      </Button>
    </div>
  );
};

export default RegistrationPrompt;