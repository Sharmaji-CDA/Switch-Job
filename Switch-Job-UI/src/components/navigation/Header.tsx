import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [upgradePromptOpen, setUpgradePromptOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    tier: 'Free',
    avatar: 'AJ'
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Jobs', path: '/job-search', icon: 'Briefcase' },
    { label: 'Applications', path: '/application-tracking', icon: 'FileText' },
    { label: 'Freelancers', path: '/freelance-marketplace', icon: 'Users' },
    { label: 'Course', path: '/course', icon: 'BookOpen' }

  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'Subscription', icon: 'CreditCard', action: () => setUpgradePromptOpen(true) },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Logout', icon: 'LogOut', action: () => navigate('/login') }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
      </button>
      <header className="header-container">
        <div className="header-content">
          <NavLink to="/dashboard" className="header-logo">
            <div className="header-logo-icon">
              <Icon name="Briefcase" size={24} color="#FFFFFF" />
            </div>
            <span className="header-logo-text">Switch Job</span>
          </NavLink>

          <nav className="header-nav">
            {navigationItems?.map((item) => (
              <NavLink
                key={item?.path}
                to={item?.path}
                className={({ isActive }) =>
                  `header-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item?.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <div className="relative" ref={userMenuRef}>
              <div
                className="user-menu-trigger"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-avatar">{user?.avatar}</div>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`transition-transform duration-250 ${
                    userMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {userMenuOpen && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-header">
                    <div className="user-menu-name">{user?.name}</div>
                    <div className="user-menu-email">{user?.email}</div>
                    <span className="user-menu-tier">{user?.tier} Plan</span>
                  </div>
                  <div className="user-menu-items">
                    {userMenuItems?.map((item, index) => (
                      <div
                        key={index}
                        className="user-menu-item"
                        onClick={() => {
                          item?.action();
                          setUserMenuOpen(false);
                        }}
                      >
                        <Icon name={item?.icon} size={20} />
                        <span>{item?.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-nav-overlay ${!mobileMenuOpen ? 'closed' : ''}`}>
        <nav className="mobile-nav-content">
          {navigationItems?.map((item) => (
            <NavLink
              key={item?.path}
              to={item?.path}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={handleNavClick}
            >
              <Icon name={item?.icon} size={20} className="inline-block mr-3" />
              {item?.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {upgradePromptOpen && (
        <div className="upgrade-prompt-overlay">
          <div className="upgrade-prompt-content">
            <div className="upgrade-prompt-header">
              <h3 className="upgrade-prompt-title">Upgrade to Premium</h3>
              <button
                className="upgrade-prompt-close"
                onClick={() => setUpgradePromptOpen(false)}
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="upgrade-prompt-body">
              <div className="upgrade-prompt-feature">
                <Icon name="Check" size={20} className="upgrade-prompt-feature-icon" />
                <div>
                  <div className="font-semibold text-foreground">Unlimited Job Applications</div>
                  <div className="text-sm text-muted-foreground">Apply to as many jobs as you want</div>
                </div>
              </div>
              <div className="upgrade-prompt-feature">
                <Icon name="Check" size={20} className="upgrade-prompt-feature-icon" />
                <div>
                  <div className="font-semibold text-foreground">AI-Powered Resume Builder</div>
                  <div className="text-sm text-muted-foreground">Create tailored resumes for each job</div>
                </div>
              </div>
              <div className="upgrade-prompt-feature">
                <Icon name="Check" size={20} className="upgrade-prompt-feature-icon" />
                <div>
                  <div className="font-semibold text-foreground">Priority Support</div>
                  <div className="text-sm text-muted-foreground">Get help when you need it most</div>
                </div>
              </div>
              <div className="upgrade-prompt-feature">
                <Icon name="Check" size={20} className="upgrade-prompt-feature-icon" />
                <div>
                  <div className="font-semibold text-foreground">Advanced Analytics</div>
                  <div className="text-sm text-muted-foreground">Track your job search progress</div>
                </div>
              </div>
            </div>
            <button
              className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-250"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-accent-foreground)'
              }}
              onClick={() => {
                console.log('Upgrade clicked');
                setUpgradePromptOpen(false);
              }}
            >
              Upgrade Now - $29/month
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;