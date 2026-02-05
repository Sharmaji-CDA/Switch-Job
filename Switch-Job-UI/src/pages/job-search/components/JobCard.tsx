import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

interface Job {
  id: number | string;
  companyLogo: string;
  companyLogoAlt: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
  salaryMin: number;
  salaryMax: number;
  matchScore: number;
  isPremium: boolean;
  skills: string[];
}

interface JobCardProps {
  job: Job;
  onSave: (id: number | string) => void;
  onApply: (id: number | string) => void;
  isSaved: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, isSaved }) => {
  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20';
  };

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000)?.toFixed(0)}k - $${(max / 1000)?.toFixed(0)}k`;
  };

  const getTimeAgo = (date: string) => {
    const now = new Date('2026-01-31T12:25:45.063Z');
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth border border-border">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={job.companyLogo}
              alt={job.companyLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 line-clamp-1">
                {job.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {job.company}
              </p>
            </div>
            <button
              onClick={() => onSave(job.id)}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label={isSaved ? 'Unsave job' : 'Save job'}
              type="button"
            >
              <Icon
                name="Heart"
                size={20}
                className={isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-3">
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="Briefcase" size={16} />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>{getTimeAgo(job.postedDate)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <span className="text-sm md:text-base font-semibold text-foreground">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
            <span className={`px-2 py-1 rounded-md text-xs md:text-sm font-medium ${getMatchScoreColor(job.matchScore)}`}>
              {job.matchScore}% Match
            </span>
            {job.isPremium && (
              <span className="px-2 py-1 rounded-md text-xs md:text-sm font-medium bg-accent text-accent-foreground">
                Premium
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills?.slice(0, 4)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs md:text-sm"
              >
                {skill}
              </span>
            ))}
            {job.skills?.length > 4 && (
              <span className="px-2 py-1 text-muted-foreground text-xs md:text-sm">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              size="sm"
              iconName="Send"
              iconPosition="right"
              onClick={() => onApply(job.id)}
              fullWidth
              className="sm:flex-1"
            >
              Quick Apply
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              fullWidth
              className="sm:w-auto"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;