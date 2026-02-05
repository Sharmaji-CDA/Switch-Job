import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/navigation/Header';
import BottomNav from '../../components/navigation/BottomNav';
import SearchBar from '../../components/navigation/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import JobRecommendationCard from './components/JobRecommendationCard.tsx';
import CareerProgressCard from './components/CareerProgressCard.tsx';
import QuickActionCard from './components/QuickActionCard.tsx';
import ActivityFeedItem from './components/ActivityFeedItem.tsx';
import SubscriptionUpgradeCard from './components/SubscriptionUpgradeCard.tsx';
import QuickStatsWidget from './components/QuickStatsWidget.tsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  const jobRecommendations = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    companyLogo: "https://images.unsplash.com/photo-1715950227433-4cd241cc50b2",
    companyLogoAlt: "Modern tech company office building with glass facade and blue sky background",
    location: "San Francisco, CA",
    type: "Remote",
    salaryRange: "$120k - $180k",
    matchPercentage: 92,
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    isPremium: true
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Design Studio Inc",
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_12e085d6c-1765477590528.png",
    companyLogoAlt: "Creative design studio workspace with colorful modern architecture and natural lighting",
    location: "New York, NY",
    type: "Hybrid",
    salaryRange: "$90k - $130k",
    matchPercentage: 85,
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    isPremium: false
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "CloudTech Innovations",
    companyLogo: "https://images.unsplash.com/photo-1717386255950-f7fbe05eb6c0",
    companyLogoAlt: "High-tech data center with rows of server racks and blue LED lighting",
    location: "Austin, TX",
    type: "Remote",
    salaryRange: "$110k - $160k",
    matchPercentage: 78,
    skills: ["Kubernetes", "CI/CD", "Terraform", "Python"],
    isPremium: true
  }];


  const careerProgress = [
  {
    title: "Profile Completion",
    value: 85,
    total: 100,
    percentage: 85,
    icon: "User",
    color: "var(--color-primary)"
  },
  {
    title: "Applications Sent",
    value: 12,
    total: 20,
    percentage: 60,
    icon: "Send",
    color: "var(--color-accent)"
  },
  {
    title: "Interview Scheduled",
    value: 3,
    total: null,
    percentage: 100,
    icon: "Calendar",
    color: "var(--color-success)"
  },
  {
    title: "Skills Verified",
    value: 8,
    total: 12,
    percentage: 67,
    icon: "Award",
    color: "var(--color-warning)"
  }];


  const quickActions = [
  {
    title: "Upload Resume",
    description: "Let AI optimize your resume for better job matches",
    icon: "Upload",
    buttonText: "Upload Now",
    isPremium: false
  },
  {
    title: "Browse Jobs",
    description: "Explore thousands of job opportunities tailored for you",
    icon: "Search",
    buttonText: "Start Browsing",
    isPremium: false
  },
  {
    title: "Connect with Recruiters",
    description: "Get direct access to hiring managers and recruiters",
    icon: "Users",
    buttonText: "Upgrade to Connect",
    isPremium: true
  },
  {
    title: "AI Interview Prep",
    description: "Practice with AI-powered mock interviews",
    icon: "MessageSquare",
    buttonText: "Start Practice",
    isPremium: false
  }];


  const recentActivities = [
  {
    id: 1,
    type: "application",
    title: "Application Viewed",
    description: "Your application for Senior Developer at TechCorp was viewed by the hiring manager",
    timestamp: new Date(Date.now() - 1800000),
    unread: true
  },
  {
    id: 2,
    type: "interview",
    title: "Interview Scheduled",
    description: "Interview with Design Studio Inc scheduled for Feb 5, 2026 at 2:00 PM",
    timestamp: new Date(Date.now() - 7200000),
    unread: true
  },
  {
    id: 3,
    type: "message",
    title: "New Message from Recruiter",
    description: "Sarah Johnson from CloudTech wants to discuss the DevOps position",
    timestamp: new Date(Date.now() - 14400000),
    unread: false
  },
  {
    id: 4,
    type: "recommendation",
    title: "New Job Recommendations",
    description: "5 new jobs matching your profile have been added",
    timestamp: new Date(Date.now() - 28800000),
    unread: false
  },
  {
    id: 5,
    type: "profile",
    title: "Profile Update Reminder",
    description: "Complete your profile to increase visibility by 40%",
    timestamp: new Date(Date.now() - 86400000),
    unread: false
  }];


  const quickStats = [
  {
    icon: "Eye",
    value: "247",
    label: "Profile Views",
    color: "var(--color-primary)",
    trend: 12
  },
  {
    icon: "Bookmark",
    value: "18",
    label: "Saved Jobs",
    color: "var(--color-accent)",
    trend: null
  },
  {
    icon: "MessageSquare",
    value: "5",
    label: "New Messages",
    color: "var(--color-success)",
    trend: null
  },
  {
    icon: "TrendingUp",
    value: "89%",
    label: "Match Score",
    color: "var(--color-warning)",
    trend: 5
  }];


  const handleApplyJob = (jobId: number) => {
    console.log('Applying to job:', jobId);
    navigate('/application-tracking');
  };

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
    prev?.includes(jobId) ?
    prev?.filter((id) => id !== jobId) :
    [...prev, jobId]
    );
  };

  const handleQuickAction = (action: { title: string; isPremium?: boolean }) => {
    if (action?.title === "Browse Jobs") {
      navigate('/job-search');
    } else if (action?.title === "Connect with Recruiters" && action?.isPremium) {
      console.log('Show upgrade prompt');
    } else {
      console.log('Action:', action?.title);
    }
  };

  const handleUpgrade = () => {
    console.log('Navigate to subscription page');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="content-container py-6 md:py-8">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Here's what's happening with your job search today
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <SearchBar />
                <Button
                  variant="default"
                  size="default"
                  iconName="Bell"
                  iconPosition="left">

                  Notifications
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStatsWidget stats={quickStats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column - Job Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Progress */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    Career Progress
                  </h2>
                  <Button variant="ghost" size="sm" iconName="ChevronRight">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {careerProgress?.map((progress, index) =>
                  <CareerProgressCard key={index} {...progress} />
                  )}
                </div>
              </div>

              {/* Job Recommendations */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                    AI-Powered Job Recommendations
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    iconPosition="left">

                    Refresh
                  </Button>
                </div>
                <div className="space-y-4">
                  {jobRecommendations?.map((job) =>
                  <JobRecommendationCard
                    key={job?.id}
                    job={job}
                    onApply={handleApplyJob}
                    onSave={handleSaveJob}
                    isSaved={savedJobs?.includes(job?.id)} />

                  )}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => navigate('/job-search')}>

                    View All Recommendations
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions?.map((action, index) =>
                  <QuickActionCard
                    key={index}
                    {...action}
                    onClick={() => handleQuickAction(action)} />

                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Activity Feed & Upgrade */}
            <div className="space-y-6">
              {/* Subscription Upgrade */}
              <SubscriptionUpgradeCard onUpgrade={handleUpgrade} />

              {/* Recent Activity */}
              <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Recent Activity
                  </h2>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
                <div className="space-y-2">
                  {recentActivities?.map((activity) =>
                  <ActivityFeedItem key={activity?.id} activity={activity} />
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth>

                    View All Activity
                  </Button>
                </div>
              </div>

              {/* Upcoming Interviews */}
              <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Upcoming Interviews
                  </h2>
                  <Icon name="Calendar" size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Video" size={20} color="var(--color-success)" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-foreground mb-1">
                          Design Studio Inc
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                          Product Designer Position
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>Feb 5, 2026 at 2:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      fullWidth
                      className="mt-3">

                      Join Meeting
                    </Button>
                  </div>
                </div>
              </div>

              {/* Learning Resources */}
              <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground">
                    Recommended Courses
                  </h2>
                  <Icon name="BookOpen" size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-border hover:bg-muted transition-smooth cursor-pointer">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      Advanced React Patterns
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Free • 8 hours
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: '35%' }} />

                      </div>
                      <span className="text-xs text-muted-foreground">35%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-border hover:bg-muted transition-smooth cursor-pointer">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      System Design Fundamentals
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Free • 12 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>);

};

export default Dashboard;