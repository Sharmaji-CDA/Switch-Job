import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/navigation/Header';
import BottomNav from '../../components/navigation/BottomNav';
import SearchBar from '../../components/navigation/SearchBar';

import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import JobCardSkeleton from './components/JobCardSkeleton';
import EmptyState from './components/EmptyState';
import JobCard from './components/JobCard';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  companyLogoAlt: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  matchScore: number;
  isPremium: boolean;
  postedDate: string;
  skills: string[];
  experienceLevel: string;
  industry: string;
  companySize: string;
}

interface Filters {
  locationType: string;
  salary: { min: number; max: number };
  experienceLevel: string;
  industry: string;
  companySize: string;
  jobTypes: {
    fullTime: boolean;
    partTime: boolean;
    contract: boolean;
    freelance: boolean;
  };
  premiumOnly: boolean;
  savedOnly: boolean;
}

const JobSearch: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    locationType: 'all',
    salary: { min: 0, max: 300000 },
    experienceLevel: 'all',
    industry: 'all',
    companySize: 'all',
    jobTypes: {
      fullTime: false,
      partTime: false,
      contract: false,
      freelance: false
    },
    premiumOnly: false,
    savedOnly: false
  });

  const [sortBy, setSortBy] = useState<string>('relevance');
  const [savedJobs, setSavedJobs] = useState<number[]>([2, 5, 8]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1448e2f4d-1766615520167.png",
      companyLogoAlt: "Modern tech company office building with glass facade and TechCorp logo",
      location: "San Francisco, CA",
      type: "Remote",
      salaryMin: 120000,
      salaryMax: 180000,
      matchScore: 92,
      isPremium: true,
      postedDate: "2026-01-30T10:00:00Z",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      experienceLevel: "senior",
      industry: "technology",
      companySize: "large"
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Design Studio Pro",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_15afff644-1764641554170.png",
      companyLogoAlt: "Creative design studio workspace with colorful brand materials and modern furniture",
      location: "Remote",
      type: "Remote",
      salaryMin: 90000,
      salaryMax: 140000,
      matchScore: 88,
      isPremium: false,
      postedDate: "2026-01-29T14:30:00Z",
      skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "medium"
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_130d53363-1769451772821.png",
      companyLogoAlt: "Modern startup office space with open floor plan and collaborative work areas",
      location: "New York, NY",
      type: "Hybrid",
      salaryMin: 100000,
      salaryMax: 150000,
      matchScore: 85,
      isPremium: true,
      postedDate: "2026-01-28T09:15:00Z",
      skills: ["Python", "Django", "React", "PostgreSQL", "Docker"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "startup"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1493ef069-1765122004810.png",
      companyLogoAlt: "High-tech data center with rows of servers and blue ambient lighting",
      location: "Austin, TX",
      type: "On-site",
      salaryMin: 110000,
      salaryMax: 160000,
      matchScore: 78,
      isPremium: false,
      postedDate: "2026-01-27T16:45:00Z",
      skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
      experienceLevel: "senior",
      industry: "technology",
      companySize: "large"
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppMakers Ltd",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_16073ccd5-1766925322121.png",
      companyLogoAlt: "Modern tech office with developers working on mobile applications at standing desks",
      location: "Seattle, WA",
      type: "Remote",
      salaryMin: 95000,
      salaryMax: 145000,
      matchScore: 82,
      isPremium: true,
      postedDate: "2026-01-26T11:20:00Z",
      skills: ["React Native", "iOS", "Android", "Firebase", "Redux"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "medium"
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "Analytics Corp",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_122eadd92-1764919275696.png",
      companyLogoAlt: "Professional data analytics office with multiple monitors displaying charts and graphs",
      location: "Boston, MA",
      type: "Hybrid",
      salaryMin: 115000,
      salaryMax: 170000,
      matchScore: 90,
      isPremium: true,
      postedDate: "2026-01-25T13:00:00Z",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
      experienceLevel: "senior",
      industry: "technology",
      companySize: "large"
    },
    {
      id: 7,
      title: "Backend Developer",
      company: "ServerSide Inc",
      companyLogo: "https://images.unsplash.com/photo-1643614396623-d8a572033d1a",
      companyLogoAlt: "Corporate office building with modern architecture and glass windows at sunset",
      location: "Chicago, IL",
      type: "On-site",
      salaryMin: 85000,
      salaryMax: 130000,
      matchScore: 75,
      isPremium: false,
      postedDate: "2026-01-24T08:30:00Z",
      skills: ["Java", "Spring Boot", "MySQL", "REST API", "Microservices"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "medium"
    },
    {
      id: 8,
      title: "UX Researcher",
      company: "UserFirst Design",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce1cc2d2-1768742937767.png",
      companyLogoAlt: "Creative agency office with design thinking workshop materials and user research boards",
      location: "Remote",
      type: "Remote",
      salaryMin: 80000,
      salaryMax: 120000,
      matchScore: 87,
      isPremium: false,
      postedDate: "2026-01-23T15:45:00Z",
      skills: ["User Research", "Usability Testing", "Figma", "Data Analysis"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "small"
    },
    {
      id: 9,
      title: "Security Engineer",
      company: "CyberShield Systems",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_18f6b9080-1764670826754.png",
      companyLogoAlt: "Cybersecurity operations center with multiple screens showing network security monitoring",
      location: "Washington, DC",
      type: "Hybrid",
      salaryMin: 125000,
      salaryMax: 185000,
      matchScore: 80,
      isPremium: true,
      postedDate: "2026-01-22T10:15:00Z",
      skills: ["Cybersecurity", "Penetration Testing", "SIEM", "Compliance", "Python"],
      experienceLevel: "senior",
      industry: "technology",
      companySize: "large"
    },
    {
      id: 10,
      title: "Frontend Developer",
      company: "WebCraft Studios",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_164998d72-1767965250115.png",
      companyLogoAlt: "Modern web development studio with designers and developers collaborating on projects",
      location: "Los Angeles, CA",
      type: "Remote",
      salaryMin: 75000,
      salaryMax: 115000,
      matchScore: 83,
      isPremium: false,
      postedDate: "2026-01-21T12:00:00Z",
      skills: ["Vue.js", "JavaScript", "CSS", "HTML", "Responsive Design"],
      experienceLevel: "entry",
      industry: "technology",
      companySize: "small"
    },
    {
      id: 11,
      title: "AI/ML Engineer",
      company: "DeepMind Labs",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1964c9f4c-1764661525586.png",
      companyLogoAlt: "Advanced AI research laboratory with neural network visualizations on large displays",
      location: "San Francisco, CA",
      type: "On-site",
      salaryMin: 140000,
      salaryMax: 200000,
      matchScore: 95,
      isPremium: true,
      postedDate: "2026-01-20T09:30:00Z",
      skills: ["PyTorch", "Deep Learning", "NLP", "Computer Vision", "Python"],
      experienceLevel: "lead",
      industry: "technology",
      companySize: "large"
    },
    {
      id: 12,
      title: "QA Automation Engineer",
      company: "TestPro Solutions",
      companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7b6b6fd-1767656198072.png",
      companyLogoAlt: "Quality assurance testing lab with automated testing equipment and monitoring systems",
      location: "Denver, CO",
      type: "Hybrid",
      salaryMin: 85000,
      salaryMax: 125000,
      matchScore: 76,
      isPremium: false,
      postedDate: "2026-01-19T14:20:00Z",
      skills: ["Selenium", "Jest", "Cypress", "API Testing", "CI/CD"],
      experienceLevel: "mid",
      industry: "technology",
      companySize: "medium"
    }
  ];

  const filterJobs = useCallback((jobs: Job[]) => {
    return jobs.filter((job) => {
      if (filters.locationType !== 'all' && job.type.toLowerCase() !== filters.locationType) {
        return false;
      }

      if (job.salaryMin < filters.salary.min || job.salaryMax > filters.salary.max) {
        return false;
      }

      if (filters.experienceLevel !== 'all' && job.experienceLevel !== filters.experienceLevel) {
        return false;
      }

      if (filters.industry !== 'all' && job.industry !== filters.industry) {
        return false;
      }

      if (filters.companySize !== 'all' && job.companySize !== filters.companySize) {
        return false;
      }

      const hasJobTypeFilter = Object.values(filters.jobTypes).some((v) => v);
      if (hasJobTypeFilter) {
        const jobTypeMap: { [key: string]: string } = {
          fullTime: 'full-time',
          partTime: 'part-time',
          contract: 'contract',
          freelance: 'freelance'
        };
        const matchesJobType = Object.entries(filters.jobTypes).some(
          ([key, value]) => value && job.type.toLowerCase().includes(jobTypeMap[key])
        );
        if (!matchesJobType) return false;
      }

      if (filters.premiumOnly && !job.isPremium) {
        return false;
      }

      if (filters.savedOnly && !savedJobs.includes(job.id)) {
        return false;
      }

      return true;
    });
  }, [filters, savedJobs]);

  const sortJobs = useCallback((jobs: Job[]) => {
    const sorted = [...jobs];
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      case 'salary-high':
        return sorted.sort((a, b) => b.salaryMax - a.salaryMax);
      case 'salary-low':
        return sorted.sort((a, b) => a.salaryMin - b.salaryMin);
      case 'match-score':
        return sorted.sort((a, b) => b.matchScore - a.matchScore);
      case 'relevance':
      default:
        return sorted.sort((a, b) => b.matchScore - a.matchScore);
    }
  }, [sortBy]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const filtered = filterJobs(mockJobs);
      const sorted = sortJobs(filtered);
      setDisplayedJobs(sorted.slice(0, 6));
      setHasMore(sorted.length > 6);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters, sortBy, filterJobs, sortJobs]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      locationType: 'all',
      salary: { min: 0, max: 300000 },
      experienceLevel: 'all',
      industry: 'all',
      companySize: 'all',
      jobTypes: {
        fullTime: false,
        partTime: false,
        contract: false,
        freelance: false
      },
      premiumOnly: false,
      savedOnly: false
    });
    setSortBy('relevance');
  };

  const handleSaveJob = (jobId: string | number) => {
    const id = typeof jobId === 'string' ? parseInt(jobId, 10) : jobId;
    setSavedJobs((prev) =>
      prev.includes(id) ?
        prev.filter((savedId) => savedId !== id) :
        [...prev, id]
    );
  };

  const handleApplyJob = (jobId: string | number) => {
    const id = typeof jobId === 'string' ? parseInt(jobId, 10) : jobId;
    console.log('Applying to job:', id);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = filterJobs(mockJobs);
      const sorted = sortJobs(filtered);
      const nextBatch = sorted.slice(displayedJobs.length, displayedJobs.length + 6);
      setDisplayedJobs((prev) => [...prev, ...nextBatch]);
      setHasMore(sorted.length > displayedJobs.length + nextBatch.length);
      setIsLoading(false);
    }, 500);
  };

  const activeFilterCount = () => {
    let count = 0;
    if (filters.locationType !== 'all') count++;
    if (filters.salary.min > 0 || filters.salary.max < 300000) count++;
    if (filters.experienceLevel !== 'all') count++;
    if (filters.industry !== 'all') count++;
    if (filters.companySize !== 'all') count++;
    if (Object.values(filters.jobTypes).some((v) => v)) count++;
    if (filters.premiumOnly) count++;
    if (filters.savedOnly) count++;
    return count;
  };

  return (
  <>
      <title>Job Search - JobAI Connect</title>
      <meta name="description" content="Discover your dream job with AI-powered job matching. Browse thousands of opportunities with advanced filtering and personalized recommendations." />
      <Header />
      <BottomNav />
      <main className="main-content bg-background min-h-screen">
        <div className="content-container py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Discover opportunities tailored to your skills and preferences
            </p>
          </div>

          <div className="mb-6">
            <SearchBar />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="hidden lg:block">
                  <div className="bg-card rounded-lg p-4 shadow-elevation-2 border border-border mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                      {activeFilterCount() > 0 &&
                        <span className="px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium">
                          {activeFilterCount()} Active
                        </span>
                      }
                    </div>
                    <FilterPanel
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onClearFilters={handleClearFilters}
                      isOpen={true}
                      onClose={() => {}} />

                  </div>
                </div>

                <Button
                  variant="outline"
                  fullWidth
                  iconName="SlidersHorizontal"
                  iconPosition="left"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden">

                  Filters {activeFilterCount() > 0 && `(${activeFilterCount()})`}
                </Button>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-lg p-4 shadow-elevation-2 border border-border mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-sm md:text-base text-muted-foreground">
                    {isLoading ?
                      <span>Loading jobs...</span> :

                      <span>
                        Showing <span className="font-semibold text-foreground">{displayedJobs.length}</span> jobs
                      </span>
                    }
                  </div>
                  <SortControls sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>

              <div className="space-y-4">
                {isLoading && displayedJobs.length === 0 ?
                  <>
                    {[...Array(6)].map((_, index) =>
                      <JobCardSkeleton key={index} />
                    )}
                  </> :
                  displayedJobs.length === 0 ?
                    <EmptyState onClearFilters={handleClearFilters} /> :

                    <>
                      {displayedJobs.map((job) =>
                        <JobCard
                          key={job.id}
                          job={job}
                          onSave={handleSaveJob}
                          onApply={handleApplyJob}
                          isSaved={savedJobs.includes(job.id)} />

                      )}

                      {hasMore &&
                        <div className="flex justify-center pt-4">
                          <Button
                            variant="outline"
                            loading={isLoading}
                            iconName="ChevronDown"
                            iconPosition="right"
                            onClick={handleLoadMore}>

                            Load More Jobs
                          </Button>
                        </div>
                      }
                    </>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)} />

    </>);

};

export default JobSearch;