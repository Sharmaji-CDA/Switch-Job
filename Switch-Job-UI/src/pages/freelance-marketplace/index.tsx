import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/navigation/Header';
import BottomNav from '../../components/navigation/BottomNav';
import SearchBar from '../../components/navigation/SearchBar';
import Button from '../../components/ui/Button';
import FreelancerCard from './components/FreelancerCard.tsx';
import FilterPanel from './components/FilterPanel.tsx';
import SortControls from './components/SortControls.tsx';
import FreelancerCardSkeleton from './components/FreelancerCardSkeleton.tsx';
import EmptyState from './components/EmptyState.tsx';
import ResumeOptimizerModal from './components/ResumeOptimizerModal.tsx';

interface Freelancer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  avatarAlt: string;
  location: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  availability: string;
  skills: string[];
  bio: string;
  experienceLevel: string;
  category: string;
  isTopRated: boolean;
}

const FreelanceMarketplace = () => {
  const [savedFreelancers, setSavedFreelancers] = useState<number[]>([2, 5]);
  const [displayedFreelancers, setDisplayedFreelancers] = useState<Freelancer[]>([]);
  const [filters, setFilters] = useState({
    availability: 'all',
    hourlyRate: { min: 0, max: 200 },
    experienceLevel: 'all',
    category: 'all',
    skills: [] as string[],
    topRatedOnly: false
  });

  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);

  const mockFreelancers = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior Full Stack Developer',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103d5a6bf-1763299503906.png",
    avatarAlt: 'Professional headshot of Sarah Chen, Asian woman with glasses and friendly smile',
    location: 'San Francisco, CA',
    hourlyRate: 120,
    rating: 4.9,
    reviewCount: 87,
    completedProjects: 142,
    availability: 'available',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    bio: 'Full-stack developer with 8+ years building scalable web applications. Specialized in React and Node.js ecosystems.',
    experienceLevel: 'senior',
    category: 'development',
    isTopRated: true
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    title: 'UI/UX Designer & Brand Strategist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_142443455-1763292703870.png",
    avatarAlt: 'Professional headshot of Marcus Johnson, African American man with creative style',
    location: 'New York, NY',
    hourlyRate: 95,
    rating: 4.8,
    reviewCount: 64,
    completedProjects: 98,
    availability: 'available',
    skills: ['Figma', 'Adobe XD', 'Branding', 'Prototyping', 'User Research'],
    bio: 'Award-winning designer creating intuitive digital experiences. Passionate about user-centered design.',
    experienceLevel: 'senior',
    category: 'design',
    isTopRated: true
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    title: 'Content Writer & SEO Specialist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18a09b944-1763301498243.png",
    avatarAlt: 'Professional headshot of Elena Rodriguez, Hispanic woman with warm smile',
    location: 'Austin, TX',
    hourlyRate: 65,
    rating: 4.9,
    reviewCount: 112,
    completedProjects: 203,
    availability: 'available',
    skills: ['SEO', 'Content Strategy', 'Copywriting', 'WordPress', 'Analytics'],
    bio: 'SEO-focused content writer helping businesses rank higher and convert better. 5+ years experience.',
    experienceLevel: 'mid',
    category: 'writing',
    isTopRated: true
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Mobile App Developer (iOS & Android)',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17966229e-1763300071737.png",
    avatarAlt: 'Professional headshot of David Kim, Asian man with professional attire',
    location: 'Seattle, WA',
    hourlyRate: 110,
    rating: 4.7,
    reviewCount: 53,
    completedProjects: 76,
    availability: 'busy',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'App Store Optimization'],
    bio: 'Mobile developer specializing in cross-platform apps. Built 50+ apps with millions of downloads.',
    experienceLevel: 'senior',
    category: 'development',
    isTopRated: false
  },
  {
    id: 5,
    name: 'Priya Patel',
    title: 'Digital Marketing Strategist',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecb4aca8-1763296537332.png",
    avatarAlt: 'Professional headshot of Priya Patel, Indian woman with confident expression',
    location: 'Remote',
    hourlyRate: 85,
    rating: 4.9,
    reviewCount: 91,
    completedProjects: 134,
    availability: 'available',
    skills: ['Google Ads', 'Facebook Ads', 'Analytics', 'Email Marketing', 'Conversion Optimization'],
    bio: 'Data-driven marketer with proven track record of 3x ROI improvements. Certified in Google & Meta platforms.',
    experienceLevel: 'mid',
    category: 'marketing',
    isTopRated: true
  },
  {
    id: 6,
    name: 'Alex Thompson',
    title: 'DevOps Engineer & Cloud Architect',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17ff63bba-1763291695269.png",
    avatarAlt: 'Professional headshot of Alex Thompson, person with technical background',
    location: 'Denver, CO',
    hourlyRate: 130,
    rating: 4.8,
    reviewCount: 45,
    completedProjects: 67,
    availability: 'available',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    bio: 'Cloud infrastructure expert helping companies scale reliably. AWS & Azure certified professional.',
    experienceLevel: 'senior',
    category: 'development',
    isTopRated: false
  }];


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedFreelancers(mockFreelancers.slice(0, 6));
      setIsLoading(false);
    }, 1000);
  }, [mockFreelancers]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    applyFilters(newFilters, sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    applyFilters(filters, newSort);
  };

  const applyFilters = (currentFilters: typeof filters, currentSort: string) => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...mockFreelancers];

      if (currentFilters?.availability !== 'all') {
        filtered = filtered?.filter((f) => f?.availability === currentFilters?.availability);
      }

      if (currentFilters?.experienceLevel !== 'all') {
        filtered = filtered?.filter((f) => f?.experienceLevel === currentFilters?.experienceLevel);
      }

      if (currentFilters?.category !== 'all') {
        filtered = filtered?.filter((f) => f?.category === currentFilters?.category);
      }

      if (currentFilters?.topRatedOnly) {
        filtered = filtered?.filter((f) => f?.isTopRated);
      }

      filtered = filtered?.filter(
        (f) => f?.hourlyRate >= currentFilters?.hourlyRate?.min &&
        f?.hourlyRate <= currentFilters?.hourlyRate?.max
      );

      if (currentSort === 'rate-low') {
        filtered?.sort((a, b) => a?.hourlyRate - b?.hourlyRate);
      } else if (currentSort === 'rate-high') {
        filtered?.sort((a, b) => b?.hourlyRate - a?.hourlyRate);
      } else if (currentSort === 'rating') {
        filtered?.sort((a, b) => b?.rating - a?.rating);
      }

      setDisplayedFreelancers(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleSave = (id: number) => {
    setSavedFreelancers((prev: number[]) =>
    prev?.includes(id) ? prev?.filter((fId: number) => fId !== id) : [...prev, id]
    );
  };

  const handleContact = (id: number) => {
    console.log('Contact freelancer:', id);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setHasMore(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Freelance Marketplace - Find Top Talent | JobAI Connect</title>
        <meta name="description" content="Discover and hire talented freelancers for your projects. Browse profiles, compare rates, and find the perfect match." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <SearchBar />

        <main className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Freelance Marketplace
              </h1>
              <p className="text-muted-foreground">
                {displayedFreelancers?.length} talented freelancers available
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                iconName="Sparkles"
                onClick={() => setIsOptimizerOpen(true)}
                className="flex-1 md:flex-initial">

                Optimize Resume
              </Button>
              <Button
                variant="outline"
                iconName="SlidersHorizontal"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden">

                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
              <div className="filter-sidebar-header">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <button
                  className="md:hidden"
                  onClick={() => setIsFilterOpen(false)}>

                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <SortControls sortBy={sortBy} onSortChange={handleSortChange} />
              </div>

              <div className="space-y-4">
                {isLoading ?
                Array(3)?.fill(0)?.map((_, index) =>
                <FreelancerCardSkeleton key={index} />
                ) :
                displayedFreelancers?.length > 0 ?
                displayedFreelancers?.map((freelancer: Freelancer) =>
                <FreelancerCard
                  key={freelancer?.id}
                  freelancer={freelancer}
                  onSave={handleSave}
                  onContact={handleContact}
                  isSaved={savedFreelancers?.includes(freelancer?.id)} />

                ) :

                <EmptyState />
                }
              </div>

              {!isLoading && hasMore && displayedFreelancers?.length > 0 &&
              <div className="mt-8 text-center">
                  <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}>

                    Load More Freelancers
                  </Button>
                </div>
              }
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
      {isOptimizerOpen &&
      <ResumeOptimizerModal onClose={() => setIsOptimizerOpen(false)} />
      }
    </>);

};

export default FreelanceMarketplace;