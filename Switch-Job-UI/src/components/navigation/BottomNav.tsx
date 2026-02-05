import { NavLink } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNav = () => {
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Jobs', path: '/job-search', icon: 'Briefcase' },
    { label: 'Applications', path: '/application-tracking', icon: 'FileText' }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-content">
        {navigationItems?.map((item) => (
          <NavLink
            key={item?.path}
            to={item?.path}
            className={({ isActive }) =>
              `bottom-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Icon name={item?.icon} size={24} className="bottom-nav-icon" />
            <span className="bottom-nav-label">{item?.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;