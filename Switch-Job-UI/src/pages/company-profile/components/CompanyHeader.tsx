import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface CompanyHeaderProps {
  company: {
    logo: string;
    logoAlt: string;
    name?: string;
    tagline?: string;
    location?: string;
    size?: string;
    industry?: string;
    founded?: string;
    specialties?: string[];
  };
  onFollowToggle: () => void;
  isFollowing: boolean;
}

const CompanyHeader = ({ company, onFollowToggle, isFollowing }: CompanyHeaderProps) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-2 overflow-hidden">
      <div className="h-32 md:h-40 lg:h-48 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      <div className="px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 -mt-12 md:-mt-16">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl bg-card shadow-elevation-3 p-3 md:p-4">
              <Image
                src={company?.logo}
                alt={company?.logoAlt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          <div className="flex-1 pt-0 lg:pt-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {company?.name}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
                  {company?.tagline}
                </p>
                
                <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                    <Icon name="MapPin" size={18} className="text-muted-foreground" />
                    <span>{company?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                    <Icon name="Users" size={18} className="text-muted-foreground" />
                    <span>{company?.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                    <Icon name="Building2" size={18} className="text-muted-foreground" />
                    <span>{company?.industry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-foreground">
                    <Icon name="Calendar" size={18} className="text-muted-foreground" />
                    <span>Founded {company?.founded}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {company?.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-xs md:text-sm text-foreground"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={onFollowToggle}
                  iconName={isFollowing ? "Check" : "Plus"}
                  iconPosition="left"
                  className="flex-1 md:flex-none"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" iconName="Share2" size="default">
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;