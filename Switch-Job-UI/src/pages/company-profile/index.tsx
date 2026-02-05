import { useState, useEffect } from 'react';
import Header from '../../components/navigation/Header';
import BottomNav from '../../components/navigation/BottomNav';
import CompanyHeader from './components/CompanyHeader';
import CompanyStats from './components/CompanyStats';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import JobOpenings from './components/JobOpenings';
import SalaryInsights from './components/SalaryInsights';
import CultureSection from './components/CultureSection';
import GrowthMetrics from './components/GrowthMetrics';
import InterviewProcess from './components/InterviewProcess';

const CompanyProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPremium] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const companyData = {
    name: "TechVision Solutions",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11349ac97-1764635716722.png",
    logoAlt: "TechVision Solutions logo featuring modern geometric design with blue and purple gradient colors on white background",
    tagline: "Building the future of enterprise software solutions",
    location: "San Francisco, CA",
    size: "500-1000 employees",
    industry: "Enterprise Software",
    founded: "2015",
    specialties: ["Cloud Computing", "AI/ML", "Data Analytics", "SaaS", "Enterprise Solutions"]
  };

  const stats = [
  {
    icon: "Briefcase",
    value: "47",
    label: "Open Positions",
    color: "var(--color-primary)",
    trend: 23
  },
  {
    icon: "Users",
    value: "850",
    label: "Total Employees",
    color: "var(--color-accent)",
    trend: 15
  },
  {
    icon: "Star",
    value: "4.6",
    label: "Company Rating",
    color: "var(--color-warning)",
    trend: 8
  },
  {
    icon: "TrendingUp",
    value: "92%",
    label: "Growth Rate",
    color: "var(--color-success)",
    trend: 12
  }];


  const aboutData = {
    companyName: "TechVision Solutions",
    description: `TechVision Solutions is a leading enterprise software company specializing in cloud-based solutions that transform how businesses operate. Founded in 2015, we've grown from a small startup to a global organization serving Fortune 500 companies across multiple industries.\n\nOur mission is to empower businesses with cutting-edge technology that drives innovation, efficiency, and growth. We combine deep industry expertise with advanced AI and machine learning capabilities to deliver solutions that solve real-world business challenges.\n\nWith offices in San Francisco, New York, London, and Singapore, we're building a diverse team of talented individuals who are passionate about technology and committed to making a positive impact. Our culture emphasizes innovation, collaboration, and continuous learning, creating an environment where everyone can thrive and grow their careers.`,
    mission: "To empower businesses worldwide with innovative technology solutions that drive digital transformation and sustainable growth.",
    vision: "To be the world's most trusted partner in enterprise digital transformation, setting new standards for innovation and customer success.",
    values: [
    {
      title: "Innovation First",
      description: "We constantly push boundaries and embrace new technologies to stay ahead of the curve."
    },
    {
      title: "Customer Success",
      description: "Our customers\' success is our success. We go above and beyond to deliver exceptional value."
    },
    {
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and foster a culture of open communication and mutual support."
    },
    {
      title: "Integrity & Trust",
      description: "We operate with transparency, honesty, and ethical standards in everything we do."
    },
    {
      title: "Continuous Learning",
      description: "We invest in our people's growth and encourage lifelong learning and development."
    },
    {
      title: "Diversity & Inclusion",
      description: "We celebrate differences and create an inclusive environment where everyone belongs."
    }]

  };

  const reviewsData = [
  {
    id: 1,
    rating: 5,
    title: "Amazing place to grow your career",
    role: "Senior Software Engineer",
    department: "engineering",
    level: "senior",
    duration: "3 years",
    date: "January 15, 2026",
    verified: true,
    currentEmployee: true,
    pros: "Excellent work-life balance, cutting-edge technology stack, supportive management, great learning opportunities, and competitive compensation. The company truly invests in employee development with regular training sessions and conference attendance.",
    cons: "Fast-paced environment can be challenging at times, and some processes could be more streamlined. Occasional communication gaps between teams during major projects.",
    helpful: 42
  },
  {
    id: 2,
    rating: 4,
    title: "Great company culture and benefits",
    role: "Product Manager",
    department: "product",
    level: "mid",
    duration: "2 years",
    date: "January 10, 2026",
    verified: true,
    currentEmployee: true,
    pros: "Collaborative environment, innovative projects, excellent benefits package including health insurance and stock options. Leadership is approachable and values employee feedback. Remote work flexibility is a huge plus.",
    cons: "Rapid growth sometimes leads to organizational challenges. More clarity needed on long-term product roadmap. Office space can get crowded during peak hours.",
    helpful: 38
  },
  {
    id: 3,
    rating: 5,
    title: "Best decision of my career",
    role: "UX Designer",
    department: "design",
    level: "mid",
    duration: "1.5 years",
    date: "January 5, 2026",
    verified: true,
    currentEmployee: true,
    pros: "Design-driven culture, access to latest tools and resources, talented team members, and meaningful work that impacts millions of users. The design team has a strong voice in product decisions.",
    cons: "High expectations and tight deadlines can be stressful. Would benefit from more structured design processes and documentation standards.",
    helpful: 35
  },
  {
    id: 4,
    rating: 4,
    title: "Solid company with room to grow",
    role: "Data Scientist",
    department: "engineering",
    level: "senior",
    duration: "2.5 years",
    date: "December 28, 2025",
    verified: true,
    currentEmployee: false,
    pros: "Interesting data problems to solve, modern tech stack, good compensation, and smart colleagues. Access to large datasets and computational resources. Regular hackathons and innovation days.",
    cons: "Limited opportunities for advancement in specialized roles. Some legacy systems need modernization. Cross-team collaboration could be improved.",
    helpful: 29
  }];


  const overallRating = 4.6;
  const ratingBreakdown = [
  { stars: 5, percentage: 65 },
  { stars: 4, percentage: 25 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 }];


  const jobsData = [
  {
    id: "1",
    title: "Senior Full Stack Engineer",
    department: "engineering",
    type: "full-time",
    location: "San Francisco, CA (Hybrid)",
    salary: "$150,000 - $200,000",
    posted: "2 days ago",
    applicants: 127,
    featured: true,
    urgent: false,
    description: "We're looking for an experienced Full Stack Engineer to join our core platform team. You'll work on building scalable microservices and modern web applications using React, Node.js, and cloud technologies.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]
  },
  {
    id: "2",
    title: "Product Designer",
    department: "design",
    type: "full-time",
    location: "Remote",
    salary: "$120,000 - $160,000",
    posted: "5 days ago",
    applicants: 89,
    featured: true,
    urgent: false,
    description: "Join our design team to create intuitive and beautiful user experiences for our enterprise products. You'll collaborate with product managers and engineers to design features that delight our customers.",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping", "User Research"]
  },
  {
    id: "3",
    title: "DevOps Engineer",
    department: "engineering",
    type: "full-time",
    location: "New York, NY",
    salary: "$140,000 - $180,000",
    posted: "1 week ago",
    applicants: 64,
    featured: false,
    urgent: true,
    description: "We need a DevOps Engineer to help scale our infrastructure and improve our deployment processes. You'll work with Kubernetes, Terraform, and CI/CD pipelines to ensure reliable and efficient operations.",
    skills: ["Kubernetes", "Docker", "Terraform", "CI/CD", "AWS"]
  },
  {
    id: "4",
    title: "Data Analyst",
    department: "product",
    type: "full-time",
    location: "San Francisco, CA",
    salary: "$100,000 - $130,000",
    posted: "3 days ago",
    applicants: 156,
    featured: false,
    urgent: false,
    description: "Help us make data-driven decisions by analyzing user behavior, product metrics, and business performance. You'll create dashboards, run experiments, and provide insights to guide product strategy.",
    skills: ["SQL", "Python", "Tableau", "Statistics", "A/B Testing"]
  },
  {
    id: "5",
    title: "Marketing Manager",
    department: "marketing",
    type: "full-time",
    location: "Remote",
    salary: "$110,000 - $145,000",
    posted: "1 week ago",
    applicants: 92,
    featured: false,
    urgent: false,
    description: "Lead our marketing initiatives to drive brand awareness and customer acquisition. You\'ll develop and execute marketing campaigns across multiple channels and work closely with sales and product teams.",
    skills: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Analytics", "Campaign Management"]
  }];


  const salaryData = [
  {
    id: 1,
    role: "software-engineer",
    roleTitle: "Software Engineer",
    department: "Engineering",
    level: "mid",
    experienceRange: "3-5 years",
    location: "San Francisco, CA",
    averageSalary: "$145,000",
    minSalary: "$120,000",
    medianSalary: "$145,000",
    maxSalary: "$180,000",
    bonus: "$15,000 - $25,000",
    stockOptions: "$30,000 - $50,000",
    dataPoints: 127
  },
  {
    id: 2,
    role: "product-manager",
    roleTitle: "Product Manager",
    department: "Product",
    level: "senior",
    experienceRange: "6-10 years",
    location: "San Francisco, CA",
    averageSalary: "$165,000",
    minSalary: "$140,000",
    medianSalary: "$165,000",
    maxSalary: "$200,000",
    bonus: "$20,000 - $35,000",
    stockOptions: "$40,000 - $70,000",
    dataPoints: 89
  },
  {
    id: 3,
    role: "designer",
    roleTitle: "Senior UX Designer",
    department: "Design",
    level: "senior",
    experienceRange: "6-10 years",
    location: "Remote",
    averageSalary: "$135,000",
    minSalary: "$115,000",
    medianSalary: "$135,000",
    maxSalary: "$165,000",
    bonus: "$12,000 - $20,000",
    stockOptions: "$25,000 - $45,000",
    dataPoints: 64
  }];


  const cultureData = {
    photos: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1e83fa0dc-1764772276072.png",
      alt: "Modern open office space with collaborative workstations, natural lighting through large windows, and employees working together at standing desks"
    },
    {
      url: "https://images.unsplash.com/photo-1690191968764-7332707854bc",
      alt: "Diverse team of professionals having brainstorming session around conference table with laptops and sticky notes on glass wall"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1772319e6-1765017831243.png",
      alt: "Team members collaborating on project using large digital whiteboard in modern meeting room with comfortable seating"
    },
    {
      url: "https://images.unsplash.com/photo-1572025442506-64f9e3525c6b",
      alt: "Office recreation area with ping pong table, lounge seating, and employees taking break in casual environment"
    },
    {
      url: "https://images.unsplash.com/photo-1570077075022-24c2aa9ba10b",
      alt: "Company all-hands meeting with CEO presenting on stage to engaged audience of employees in modern auditorium"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_176eb2212-1764655135325.png",
      alt: "Team celebrating project success with high-fives and smiles in bright office space with motivational wall art"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1223a67ff-1766924967019.png",
      alt: "Outdoor team building activity with employees participating in group exercise on company campus lawn"
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_146e021f1-1767953912688.png",
      alt: "Company cafeteria with healthy food options, modern furniture, and employees enjoying lunch together"
    }],

    benefits: [
    {
      icon: "Heart",
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance with mental health support",
      color: "var(--color-error)"
    },
    {
      icon: "DollarSign",
      title: "Competitive Compensation",
      description: "Market-leading salaries, equity packages, and performance bonuses",
      color: "var(--color-success)"
    },
    {
      icon: "Home",
      title: "Flexible Work",
      description: "Hybrid work model with remote options and flexible hours",
      color: "var(--color-primary)"
    },
    {
      icon: "GraduationCap",
      title: "Learning & Development",
      description: "$5,000 annual budget for courses, conferences, and certifications",
      color: "var(--color-accent)"
    },
    {
      icon: "Calendar",
      title: "Time Off",
      description: "Unlimited PTO, paid parental leave, and company-wide holidays",
      color: "var(--color-warning)"
    },
    {
      icon: "Coffee",
      title: "Office Perks",
      description: "Free meals, snacks, gym membership, and commuter benefits",
      color: "var(--color-secondary)"
    }],

    testimonials: [
    {
      name: "Sarah Chen",
      role: "Senior Software Engineer",
      duration: "3 years",
      rating: 5,
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1626d7015-1763296571038.png",
      avatarAlt: "Professional headshot of Asian woman with long black hair wearing blue blazer smiling at camera",
      quote: "The culture here is truly special. Everyone is supportive, collaborative, and genuinely cares about each other's success. I've grown more in my three years here than in my entire previous career."
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      duration: "2 years",
      rating: 5,
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13a48293d-1763296098326.png",
      avatarAlt: "Professional headshot of Black man with short hair wearing gray suit and glasses with confident smile",
      quote: "What I love most is the autonomy and trust given to make decisions. Leadership empowers us to take ownership and innovate. The work-life balance is also exceptional."
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      duration: "1.5 years",
      rating: 5,
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0dd4728-1763298885240.png",
      avatarAlt: "Professional headshot of Hispanic woman with brown wavy hair wearing black turtleneck with warm smile",
      quote: "The design team has a real seat at the table. Our input is valued from day one of any project. Plus, the learning opportunities and mentorship have been incredible for my career growth."
    }]

  };

  const metricsData = {
    hiringGrowth: 45,
    hiringByQuarter: [
    { period: "Q4 2025", hires: 87, percentage: 100 },
    { period: "Q3 2025", hires: 72, percentage: 83 },
    { period: "Q2 2025", hires: 64, percentage: 74 },
    { period: "Q1 2025", hires: 58, percentage: 67 }],

    departmentGrowth: [
    { name: "Engineering", growth: 52, color: "var(--color-primary)" },
    { name: "Product", growth: 38, color: "var(--color-accent)" },
    { name: "Sales", growth: 45, color: "var(--color-success)" },
    { name: "Design", growth: 35, color: "var(--color-warning)" }],

    activeOpenings: 47,
    openingsGrowth: 23,
    avgTimeToHire: "18 days",
    industryAvgTime: "32 days",
    acceptanceRate: 94
  };

  const processData = {
    avgDuration: "2-3 weeks",
    avgRounds: "4-5",
    responseTime: "3-5 days",
    stages: [
    {
      icon: "FileText",
      title: "Application Review",
      duration: "1-2 days",
      color: "var(--color-primary)",
      description: "Our recruiting team reviews your application and resume to assess your qualifications and fit for the role.",
      tips: [
      "Tailor your resume to highlight relevant experience",
      "Include specific achievements with measurable results",
      "Ensure your LinkedIn profile is up to date"]

    },
    {
      icon: "Phone",
      title: "Phone Screening",
      duration: "30 minutes",
      color: "var(--color-accent)",
      description: "Initial conversation with a recruiter to discuss your background, experience, and interest in the role.",
      tips: [
      "Research the company and role thoroughly",
      "Prepare questions about the team and culture",
      "Have examples ready of your past work"]

    },
    {
      icon: "Code",
      title: "Technical Assessment",
      duration: "1-2 hours",
      color: "var(--color-success)",
      description: "Role-specific evaluation which may include coding challenges, design exercises, or case studies.",
      tips: [
      "Practice relevant technical skills beforehand",
      "Think out loud to show your problem-solving process",
      "Ask clarifying questions when needed"]

    },
    {
      icon: "Users",
      title: "Team Interviews",
      duration: "3-4 hours",
      color: "var(--color-warning)",
      description: "Meet with potential team members and managers to discuss your experience, approach to work, and cultural fit.",
      tips: [
      "Prepare STAR method examples for behavioral questions",
      "Show enthusiasm and ask thoughtful questions",
      "Be authentic and let your personality shine"]

    },
    {
      icon: "CheckCircle",
      title: "Final Decision",
      duration: "2-3 days",
      color: "var(--color-secondary)",
      description: "The team reviews all feedback and makes a hiring decision. Successful candidates receive an offer.",
      tips: [
      "Send thank you notes to interviewers",
      "Be patient during the decision process",
      "Prepare questions for offer discussion"]

    }],

    commonQuestions: [
    "Tell me about a challenging project you worked on and how you overcame obstacles.",
    "How do you approach collaboration with cross-functional teams?",
    "Describe a time when you had to learn a new technology or skill quickly.",
    "What interests you most about working at TechVision Solutions?",
    "How do you stay current with industry trends and best practices?",
    "Tell me about a time you disagreed with a team decision and how you handled it."]

  };

  return (
    <>
      <Header />
      <div className="main-content bg-background">
        <div className="content-container py-6 md:py-8 lg:py-12">
          <div className="space-y-6 md:space-y-8">
            <CompanyHeader
              company={companyData}
              onFollowToggle={() => setIsFollowing(!isFollowing)}
              isFollowing={isFollowing} />

            
            <CompanyStats stats={stats} />
            
            <AboutSection about={aboutData} />
            
            <ReviewsSection
              reviews={reviewsData}
              overallRating={overallRating}
              ratingBreakdown={ratingBreakdown} />

            
            <JobOpenings jobs={jobsData} />
            
            <SalaryInsights salaryData={salaryData} isPremium={isPremium} />
            
            <CultureSection culture={cultureData} />
            
            <GrowthMetrics metrics={metricsData} />
            
            <InterviewProcess process={processData} />
          </div>
        </div>
      </div>
      <BottomNav />
    </>);

};

export default CompanyProfile;