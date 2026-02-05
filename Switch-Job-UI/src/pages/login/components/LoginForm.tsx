import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Errors {
  [key: string]: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const mockCredentials = {
    email: 'alex.johnson@email.com',
    password: 'JobAI2026!'
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: e.target.checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        formData.email === mockCredentials.email &&
        formData.password === mockCredentials.password
      ) {
        navigate('/dashboard');
      } else {
        setErrors({
          submit: `Invalid credentials. Please use:\nEmail: ${mockCredentials.email}\nPassword: ${mockCredentials.password}`
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        disabled={loading}
      />
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Checkbox
                  label="Remember me"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  disabled={loading} indeterminate={undefined}        />
        <button
          type="button"
          onClick={() => console.log('Forgot password clicked')}
          className="text-sm md:text-base text-primary hover:underline font-medium"
        >
          Forgot Password?
        </button>
      </div>
      {errors.submit && (
        <div className="p-3 md:p-4 rounded-lg bg-error/10 border border-error/20">
          <div className="flex items-start gap-2 md:gap-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-error whitespace-pre-line">{errors.submit}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="right"
        className="mt-4 md:mt-5 lg:mt-6"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;