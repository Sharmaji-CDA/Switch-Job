import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge.tsx';
import ApplicationTimeline from './ApplicationTimeline.tsx';

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

const ApplicationCard = ({ 
  application, 
  onViewDetails, 
  onWithdraw, 
  onAddNote 
}: { 
  application: Application; 
  onViewDetails: (id: number) => void; 
  onWithdraw: (id: number) => void; 
  onAddNote: (id: number) => void; 
}) => {
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden transition-smooth hover:shadow-elevation-3">
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <Image
              src={application?.companyLogo}
              alt={application?.companyLogoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 line-clamp-1">
              {application?.position}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-2">
              {application?.company}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                {application?.location}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                Applied {application?.appliedDate}
              </span>
            </div>
          </div>
          <StatusBadge status={application?.status} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 p-3 md:p-4 bg-muted rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Salary Range</div>
            <div className="text-sm md:text-base font-semibold text-foreground data-text">
              {application?.salaryRange}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Job Type</div>
            <div className="text-sm md:text-base font-semibold text-foreground">
              {application?.jobType}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Experience</div>
            <div className="text-sm md:text-base font-semibold text-foreground">
              {application?.experience}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Match Score</div>
            <div className="text-sm md:text-base font-semibold data-text" style={{ color: 'var(--color-success)' }}>
              {application?.matchScore}%
            </div>
          </div>
        </div>

        {application?.nextInterview && (
          <div className="mb-4 p-3 md:p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--color-success)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Calendar" size={18} color="var(--color-success)" />
              <span className="font-semibold text-foreground text-sm md:text-base">
                Upcoming Interview
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {application?.nextInterview?.type} - {application?.nextInterview?.date} at {application?.nextInterview?.time}
            </div>
          </div>
        )}

        {application?.lastNote && (
          <div className="mb-4 p-3 md:p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="StickyNote" size={16} />
              <span className="text-xs md:text-sm font-medium text-foreground">Last Note</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
              {application?.lastNote}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            iconName={showTimeline ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setShowTimeline(!showTimeline)}
            fullWidth
          >
            {showTimeline ? 'Hide' : 'Show'} Timeline
          </Button>
          <Button
            variant="outline"
            iconName="StickyNote"
            iconPosition="left"
            onClick={() => onAddNote(application?.id)}
            fullWidth
          >
            Add Note
          </Button>
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => onViewDetails(application?.id)}
            fullWidth
          >
            View Details
          </Button>
        </div>

        {showTimeline && (
          <div className="mt-4 pt-4 border-t border-border">
            <ApplicationTimeline timeline={application?.timeline} />
          </div>
        )}
      </div>
      {application?.status !== 'rejected' && application?.status !== 'withdrawn' && (
        <div className="px-4 md:px-6 py-3 bg-muted border-t border-border">
          <Button
            variant="ghost"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => onWithdraw(application?.id)}
            className="text-error hover:bg-error/10"
          >
            Withdraw Application
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;