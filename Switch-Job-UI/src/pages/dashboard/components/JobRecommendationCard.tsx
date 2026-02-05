import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  companyLogoAlt: string;
  location: string;
  salaryRange: string;
  type: string;
  matchPercentage: number;
  skills: string[];
  isPremium?: boolean;
}

interface JobRecommendationCardProps {
  job: Job;
  onApply: (jobId: number) => void;
  onSave: (jobId: number) => void;
  isSaved: boolean;
}

const JobRecommendationCard = ({ job, onApply, onSave, isSaved }: JobRecommendationCardProps) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 transition-smooth hover:shadow-elevation-3">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-muted">
            <Image
              src={job?.companyLogo}
              alt={job?.companyLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1 line-clamp-1">
                {job?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {job?.company}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`text-2xl md:text-3xl font-bold ${getMatchColor(job?.matchPercentage)}`}>
                {job?.matchPercentage}%
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Match</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="Briefcase" size={16} />
              <span>{job?.type}</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="DollarSign" size={16} />
              <span className="whitespace-nowrap">{job?.salaryRange}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {job?.skills?.slice(0, 4)?.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs md:text-sm rounded-full bg-muted text-foreground"
              >
                {skill}
              </span>
            ))}
            {job?.skills?.length > 4 && (
              <span className="px-3 py-1 text-xs md:text-sm rounded-full bg-muted text-muted-foreground">
                +{job?.skills?.length - 4} more
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <Button
              variant="default"
              size="default"
              iconName="Send"
              iconPosition="right"
              onClick={() => onApply(job?.id)}
              className="flex-1 sm:flex-initial"
            >
              Quick Apply
            </Button>
            <Button
              variant="outline"
              size="default"
              iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
              onClick={() => onSave(job?.id)}
              className="flex-1 sm:flex-initial"
            >
              {isSaved ? 'Saved' : 'Save'}
            </Button>
          </div>

          {job?.isPremium && (
            <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-accent">
              <Icon name="Crown" size={16} />
              <span className="font-medium">Premium Job - Early Access</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobRecommendationCard;