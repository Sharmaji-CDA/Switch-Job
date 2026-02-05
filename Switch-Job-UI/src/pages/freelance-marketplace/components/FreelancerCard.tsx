import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

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

interface FreelancerCardProps {
  freelancer: Freelancer;
  onSave: (id: number) => void;
  onContact: (id: number) => void;
  isSaved: boolean;
}

const FreelancerCard = ({ freelancer, onSave, onContact, isSaved }: FreelancerCardProps) => {
  const getAvailabilityColor = (availability: string) => {
    if (availability === 'available') return 'text-green-600 bg-green-50 dark:bg-green-900/20';
    if (availability === 'busy') return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
  };

  const getAvailabilityText = (availability: string) => {
    if (availability === 'available') return 'Available Now';
    if (availability === 'busy') return 'Busy';
    return 'Unavailable';
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-smooth border border-border">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-muted">
            <Image
              src={freelancer?.avatar}
              alt={freelancer?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
                {freelancer?.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-2">
                {freelancer?.title}
              </p>
            </div>
            <button
              onClick={() => onSave(freelancer?.id)}
              className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label={isSaved ? 'Unsave freelancer' : 'Save freelancer'}
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
              <span>{freelancer?.location}</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{freelancer?.rating} ({freelancer?.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
              <Icon name="Briefcase" size={16} />
              <span>{freelancer?.completedProjects} projects</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">
            {freelancer?.bio}
          </p>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            <span className="text-base md:text-lg font-semibold text-foreground">
              ${freelancer?.hourlyRate}/hr
            </span>
            <span className={`px-2 py-1 rounded-md text-xs md:text-sm font-medium ${getAvailabilityColor(freelancer?.availability)}`}>
              {getAvailabilityText(freelancer?.availability)}
            </span>
            {freelancer?.isTopRated && (
              <span className="px-2 py-1 rounded-md text-xs md:text-sm font-medium bg-accent text-accent-foreground flex items-center gap-1">
                <Icon name="Award" size={14} />
                Top Rated
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {freelancer?.skills?.slice(0, 5)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs md:text-sm"
              >
                {skill}
              </span>
            ))}
            {freelancer?.skills?.length > 5 && (
              <span className="px-2 py-1 text-muted-foreground text-xs md:text-sm">
                +{freelancer?.skills?.length - 5} more
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              size="sm"
              iconName="MessageCircle"
              iconPosition="right"
              onClick={() => onContact(freelancer?.id)}
              fullWidth
              className="sm:flex-1"
            >
              Contact
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              fullWidth
              className="sm:w-auto"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;