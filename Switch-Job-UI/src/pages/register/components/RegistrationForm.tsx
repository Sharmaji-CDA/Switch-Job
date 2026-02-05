import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  careerLevel: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface RegistrationFormProps {
  selectedTier: string;
  onSubmit: (data: RegistrationFormData & { tier: string }) => void;
}

const RegistrationForm = ({ selectedTier, onSubmit }: RegistrationFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    careerLevel: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RegistrationFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const careerLevelOptions = [
    { value: 'recent-graduate', label: 'Recent Graduate', description: '0-2 years experience' },
    { value: 'experienced-professional', label: 'Experienced Professional', description: '3-10 years experience' },
    { value: 'senior-professional', label: 'Senior Professional', description: '10+ years experience' },
    { value: 'career-changer', label: 'Career Changer', description: 'Transitioning to new field' },
  ];

  const validateField = (name: keyof RegistrationFormData, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';

      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          return 'Password must contain uppercase, lowercase, and number';
        return '';

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';

      case 'careerLevel':
        if (!value) return 'Please select your career level';
        return '';

      case 'agreeToTerms':
        return value ? '' : 'You must agree to the terms';

      case 'agreeToPrivacy':
        return value ? '' : 'You must agree to the privacy policy';

      default:
        return '';
    }
  };

  const handleChange = (name: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof RegistrationFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name]) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
    (Object.keys(formData) as (keyof RegistrationFormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((a, k) => ({ ...a, [k]: true }), {}));

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      setTimeout(() => {
        onSubmit({ ...formData, tier: selectedTier });
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        onBlur={() => handleBlur('fullName')}
        error={touched.fullName ? errors.fullName : ''}
        required
      />

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : ''}
        required
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : ''}
        required
      />

      <PasswordStrengthIndicator password={formData.password} />

      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={touched.confirmPassword ? errors.confirmPassword : ''}
        required
      />

      <Select
        label="Career Level"
        options={careerLevelOptions}
        value={formData.careerLevel}
        onChange={(value) => handleChange('careerLevel', value)}
        error={touched.careerLevel ? errors.careerLevel : ''}
        required
      />

      <Checkbox
        label="I agree to the Terms of Service"
        checked={formData.agreeToTerms}
        onChange={(checked) => handleChange('agreeToTerms', checked)}
        error={touched.agreeToTerms ? errors.agreeToTerms : ''} indeterminate={undefined}      />

      <Checkbox
        label="I agree to the Privacy Policy"
        checked={formData.agreeToPrivacy}
        onChange={(checked) => handleChange('agreeToPrivacy', checked)}
        error={touched.agreeToPrivacy ? errors.agreeToPrivacy : ''} indeterminate={undefined}      />

      <Button type="submit" loading={isSubmitting} fullWidth>
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;
