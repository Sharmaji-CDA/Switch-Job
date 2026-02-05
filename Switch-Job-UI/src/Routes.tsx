import { Routes as RouterRoutes, Route, } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from './pages/login/index.tsx';
import Dashboard from './pages/dashboard/index.tsx';
import CompanyProfile from './pages/company-profile/index.tsx';
import ApplicationTracking from './pages/application-tracking/index.tsx';
import JobSearch from './pages/job-search/index.tsx';
import Register from './pages/register/index.tsx';
import FreelanceMarketplace from './pages/freelance-marketplace/index.tsx';

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<JobSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/application-tracking" element={<ApplicationTracking />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/register" element={<Register />} />
        <Route path="/freelance-marketplace" element={<FreelanceMarketplace />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </>
  );
};

export default AppRoutes;
