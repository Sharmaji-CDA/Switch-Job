import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import BottomNav from '../../components/navigation/BottomNav';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ApplicationFilters from './components/ApplicationFilters.tsx';
import ApplicationStats from './components/ApplicationStats.tsx';
import ApplicationCard from './components/ApplicationCard.tsx';
import ApplicationTable from './components/ApplicationTable.tsx';
import BulkActionsBar from './components/BulkActionsBar.tsx';
import AnalyticsPanel from './components/AnalyticsPanel.tsx';
import NoteModal from './components/NoteModal.tsx';

interface Application {
  id: number;
  company: string;
  companyLogo: string;
  companyLogoAlt: string;
  position: string;
  location: string;
  appliedDate: string;
  status: string;
  jobType: string;
  experience: string;
  salaryRange: string;
  matchScore: number;
  nextAction: string | null;
  nextInterview?: {
    type: string;
    date: string;
    time: string;
  };
  lastNote: string;
  timeline: any[];
  tags?: string[];
}

const ApplicationTracking = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    companyType: 'all',
    dateRange: 'all',
    startDate: '',
    endDate: ''
  });

  const mockApplications: Application[] = [
  {
    id: 1,
    company: "TechCorp Inc.",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1448e2f4d-1766615520167.png",
    companyLogoAlt: "Modern tech company office building with glass facade and TechCorp logo",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    appliedDate: "01/28/2026",
    status: "interviewing",
    jobType: "Full-time",
    experience: "5+ years",
    salaryRange: "$120K - $160K",
    matchScore: 92,
    nextAction: "Technical interview scheduled for 02/05/2026",
    nextInterview: {
      type: "Technical Round",
      date: "02/05/2026",
      time: "2:00 PM PST"
    },
    lastNote: "Great conversation with hiring manager. They emphasized team collaboration and modern tech stack.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Your application was successfully submitted",
      date: "01/28/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Application Reviewed",
      description: "Hiring manager reviewed your profile",
      date: "01/29/2026",
      completed: true
    },
    {
      status: "interview",
      title: "Interview Scheduled",
      description: "Technical interview with senior engineers",
      date: "02/05/2026",
      completed: false,
      nextAction: "Prepare system design questions"
    },
    {
      status: "decision",
      title: "Final Decision",
      description: "Awaiting final decision from hiring team",
      date: "Pending",
      completed: false
    }]

  },
  {
    id: 2,
    company: "StartupXYZ",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_130d53363-1769451772821.png",
    companyLogoAlt: "Modern startup office space with collaborative work environment and StartupXYZ branding",
    position: "Full Stack Engineer",
    location: "Remote",
    appliedDate: "01/25/2026",
    status: "reviewing",
    jobType: "Full-time",
    experience: "3-5 years",
    salaryRange: "$100K - $140K",
    matchScore: 88,
    nextAction: "Waiting for initial screening call",
    lastNote: "Applied through referral from John Doe. Startup focuses on AI-powered analytics.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Application submitted via referral",
      date: "01/25/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Under Review",
      description: "Recruiter is reviewing your application",
      date: "In Progress",
      completed: false,
      nextAction: "Wait for recruiter contact"
    }]

  },
  {
    id: 3,
    company: "Design Studio",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_131ed93fc-1769862926022.png",
    companyLogoAlt: "Creative design studio workspace with modern furniture and Design Studio logo display",
    position: "Product Designer",
    location: "New York, NY",
    appliedDate: "01/22/2026",
    status: "offered",
    jobType: "Full-time",
    experience: "4+ years",
    salaryRange: "$110K - $150K",
    matchScore: 95,
    nextAction: "Review offer details and respond by 02/10/2026",
    lastNote: "Received offer! Salary is at the higher end of range. Need to negotiate benefits package.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Portfolio reviewed by design team",
      date: "01/22/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Application Reviewed",
      description: "Design lead reviewed portfolio",
      date: "01/23/2026",
      completed: true
    },
    {
      status: "interview",
      title: "Interviews Completed",
      description: "Completed 3 rounds of interviews",
      date: "01/27/2026",
      completed: true
    },
    {
      status: "decision",
      title: "Offer Extended",
      description: "Formal offer letter received",
      date: "01/30/2026",
      completed: true,
      nextAction: "Review and respond by 02/10/2026"
    }]

  },
  {
    id: 4,
    company: "Global Enterprises",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9322810-1766487237569.png",
    companyLogoAlt: "Corporate headquarters building with modern architecture and Global Enterprises signage",
    position: "Backend Developer",
    location: "Austin, TX",
    appliedDate: "01/20/2026",
    status: "rejected",
    jobType: "Full-time",
    experience: "3+ years",
    salaryRange: "$90K - $130K",
    matchScore: 78,
    nextAction: null,
    lastNote: "Received rejection email. They mentioned strong competition and encouraged reapplying in 6 months.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Application submitted successfully",
      date: "01/20/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Application Reviewed",
      description: "Reviewed by technical team",
      date: "01/22/2026",
      completed: true
    },
    {
      status: "rejected",
      title: "Application Declined",
      description: "Position filled with another candidate",
      date: "01/24/2026",
      completed: true
    }]

  },
  {
    id: 5,
    company: "CloudTech Solutions",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19a730918-1764676806385.png",
    companyLogoAlt: "Modern tech office with cloud computing infrastructure and CloudTech Solutions branding",
    position: "DevOps Engineer",
    location: "Seattle, WA",
    appliedDate: "01/18/2026",
    status: "applied",
    jobType: "Full-time",
    experience: "4-6 years",
    salaryRange: "$115K - $155K",
    matchScore: 85,
    nextAction: "Application submitted, awaiting review",
    lastNote: "Strong match for required skills. Company has excellent benefits and remote work policy.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Your application is in the queue",
      date: "01/18/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Pending Review",
      description: "Waiting for recruiter review",
      date: "Pending",
      completed: false
    }]

  },
  {
    id: 6,
    company: "FinTech Innovations",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_19cc536b3-1769862926057.png",
    companyLogoAlt: "Financial technology company office with modern trading floor and FinTech Innovations logo",
    position: "Senior Software Engineer",
    location: "Boston, MA",
    appliedDate: "01/15/2026",
    status: "interviewing",
    jobType: "Full-time",
    experience: "6+ years",
    salaryRange: "$130K - $180K",
    matchScore: 90,
    nextAction: "Final round interview with CTO on 02/08/2026",
    nextInterview: {
      type: "Final Round - CTO Interview",
      date: "02/08/2026",
      time: "10:00 AM EST"
    },
    lastNote: "Passed technical rounds. Final interview focuses on system architecture and leadership experience.",
    timeline: [
    {
      status: "submitted",
      title: "Application Submitted",
      description: "Application submitted with referral",
      date: "01/15/2026",
      completed: true
    },
    {
      status: "reviewed",
      title: "Application Reviewed",
      description: "Fast-tracked due to referral",
      date: "01/16/2026",
      completed: true
    },
    {
      status: "interview",
      title: "Technical Interviews",
      description: "Completed coding and system design rounds",
      date: "01/25/2026",
      completed: true
    },
    {
      status: "interview",
      title: "Final Interview Scheduled",
      description: "Meeting with CTO and senior leadership",
      date: "02/08/2026",
      completed: false,
      nextAction: "Prepare leadership and architecture questions"
    }]

  }];


  const stats = {
    total: mockApplications?.length,
    active: mockApplications?.filter((app) => ['applied', 'reviewing', 'interviewing']?.includes(app?.status))?.length,
    interviews: mockApplications?.filter((app) => app?.nextInterview)?.length,
    responseRate: 67
  };

  const analytics = {
    avgResponseTime: "3.2 days",
    responseTimeTrend: -12,
    interviewConversion: 45,
    conversionTrend: 8,
    successRate: 28,
    successTrend: 5,
    responseRate: 67
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      companyType: 'all',
      dateRange: 'all',
      startDate: '',
      endDate: ''
    });
  };

  const handleViewDetails = (id: number) => {
    navigate('/job-search', { state: { applicationId: id } });
  };

  const handleWithdraw = (id: number) => {
    console.log('Withdraw application:', id);
  };

  const handleAddNote = (id: number) => {
    const app = mockApplications?.find((a) => a?.id === id);
    setSelectedApplication(app || null);
    setNoteModalOpen(true);
  };

  const handleSaveNote = (noteData: any) => {
    console.log('Save note:', noteData, 'for application:', selectedApplication?.id);
  };

  const handleBulkAction = (action: string) => {
    console.log('Bulk action:', action, 'for applications:', selectedIds);
  };

  const filteredApplications = mockApplications?.filter((app) => {
    if (filters?.search && !app?.company?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
    !app?.position?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.status !== 'all' && app?.status !== filters?.status) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="content-container py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Application Tracking
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Monitor and manage your job application progress
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  iconName="Table"
                  onClick={() => setViewMode('table')}>

                  Table
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  iconName="LayoutGrid"
                  onClick={() => setViewMode('cards')}>

                  Cards
                </Button>
              </div>
            </div>
          </div>

          <ApplicationStats stats={stats} />

          <AnalyticsPanel analytics={analytics} />

          <ApplicationFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters} />


          {selectedIds?.length > 0 &&
          <BulkActionsBar
            selectedCount={selectedIds?.length}
            onAction={handleBulkAction}
            onClearSelection={() => setSelectedIds([])} />

          }

          {filteredApplications?.length === 0 ?
          <div className="bg-card rounded-lg p-8 md:p-12 text-center shadow-elevation-2">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                No Applications Found
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Try adjusting your filters or start applying to jobs
              </p>
              <Button
              variant="default"
              iconName="Briefcase"
              iconPosition="left"
              onClick={() => navigate('/job-search')}>

                Browse Jobs
              </Button>
            </div> :
          viewMode === 'table' ?
          <div className="hidden lg:block">
              <ApplicationTable
              applications={filteredApplications}
              onViewDetails={handleViewDetails}
              onWithdraw={handleWithdraw}
              selectedIds={selectedIds}
              onSelectChange={setSelectedIds} />

            </div> :
          null}

          {(viewMode === 'cards' || window.innerWidth < 1024) &&
          <div className="grid grid-cols-1 gap-4 md:gap-6">
              {filteredApplications?.map((application) =>
            <ApplicationCard
              key={application?.id}
              application={application}
              onViewDetails={handleViewDetails}
              onWithdraw={handleWithdraw}
              onAddNote={handleAddNote} />

            )}
            </div>
          }

          <div className="mt-6 md:mt-8 p-4 md:p-6 bg-card rounded-lg shadow-elevation-2">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255, 107, 71, 0.1)' }}>
                <Icon name="Zap" size={24} color="var(--color-accent)" />
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Upgrade to Premium for Advanced Features
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get recruiter feedback, AI-powered application optimization, and priority support
                </p>
              </div>
              <Button
                variant="default"
                iconName="Crown"
                iconPosition="left">

                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      <NoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        onSave={handleSaveNote}
        applicationTitle={selectedApplication ? `${selectedApplication?.position} at ${selectedApplication?.company}` : ''} />

      <BottomNav />
    </div>);

};

export default ApplicationTracking;