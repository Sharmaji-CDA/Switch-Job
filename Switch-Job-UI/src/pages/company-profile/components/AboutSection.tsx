import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface Value {
  title: string;
  description: string;
}

interface AboutSectionProps {
  about: {
    description?: string;
    vision?: string;
    values?: Value[];
    companyName?: string;
    mission?: string;
  };
}

const AboutSection = ({ about }: AboutSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = (about?.description?.length ?? 0) > 500;
  const displayText = isExpanded || !shouldTruncate 
    ? about?.description 
    : about?.description?.substring(0, 500) + "...";

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
        About {about?.companyName}
      </h2>
      <div className="prose prose-sm md:prose-base max-w-none mb-6">
        <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">
          {displayText}
        </p>
        {shouldTruncate && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="mt-2"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Target" size={20} className="text-accent" />
            Mission
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {about?.mission}
          </p>
        </div>
        
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Eye" size={20} className="text-accent" />
            Vision
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {about?.vision}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Heart" size={20} className="text-accent" />
          Core Values
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {about?.values?.map((value, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 md:p-4 bg-muted rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Check" size={16} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm md:text-base text-foreground mb-1">
                  {value?.title}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {value?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;