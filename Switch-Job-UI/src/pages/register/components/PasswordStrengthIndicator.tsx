import React from 'react';

interface Strength {
  level: number;
  label: string;
  color: string;
}

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const calculateStrength = (pwd: string): Strength => {
    if (!pwd) return { level: 0, label: '', color: '' };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    const levels: Strength[] = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'Weak', color: 'bg-error' },
      { level: 2, label: 'Fair', color: 'bg-warning' },
      { level: 3, label: 'Good', color: 'bg-blue-500' },
      { level: 4, label: 'Strong', color: 'bg-success' },
      { level: 5, label: 'Very Strong', color: 'bg-success' }
    ];

    return levels[strength];
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= strength.level ? strength.color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {strength.label && (
        <p className="text-xs text-muted-foreground">
          Password strength: <span className="font-medium">{strength.label}</span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;