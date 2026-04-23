import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import StatusBadge from './StatusBadge.tsx';

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

const ApplicationTable = ({ 
  applications, 
  onViewDetails, 
  onWithdraw, 
  selectedIds, 
  onSelectChange 
}: { 
  applications: Application[]; 
  onViewDetails: (id: number) => void; 
  onWithdraw: (id: number) => void; 
  selectedIds: number[]; 
  onSelectChange: (ids: number[]) => void; 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectChange(applications?.map((app: Application) => app?.id));
    } else {
      onSelectChange([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      onSelectChange([...selectedIds, id]);
    } else {
      onSelectChange(selectedIds?.filter((selectedId: number) => selectedId !== id));
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <Checkbox
                  checked={selectedIds?.length === applications?.length && applications?.length > 0}
                  indeterminate={selectedIds?.length > 0 && selectedIds?.length < applications?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)} label={undefined}                />
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <button
                  className="flex items-center gap-2 text-xs md:text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('company')}
                >
                  Company
                  <Icon name={getSortIcon('company')} size={16} />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <button
                  className="flex items-center gap-2 text-xs md:text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('position')}
                >
                  Position
                  <Icon name={getSortIcon('position')} size={16} />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <button
                  className="flex items-center gap-2 text-xs md:text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  onClick={() => handleSort('appliedDate')}
                >
                  Applied Date
                  <Icon name={getSortIcon('appliedDate')} size={16} />
                </button>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <span className="text-xs md:text-sm font-semibold text-foreground">Status</span>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left">
                <span className="text-xs md:text-sm font-semibold text-foreground">Next Action</span>
              </th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-right">
                <span className="text-xs md:text-sm font-semibold text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applications?.map((application) => (
              <tr key={application?.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <Checkbox
                    checked={selectedIds?.includes(application?.id)}
                    onChange={(e) => handleSelectOne(application?.id, e?.target?.checked)}
                    indeterminate={false} label=""                  />
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={application?.companyLogo}
                        alt={application?.companyLogoAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-sm md:text-base line-clamp-1">
                        {application?.company}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                        {application?.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="font-medium text-foreground text-sm md:text-base line-clamp-2">
                    {application?.position}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {application?.jobType}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="text-sm md:text-base text-foreground whitespace-nowrap">
                    {application?.appliedDate}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <StatusBadge status={application?.status} />
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                    {application?.nextAction || 'Waiting for response'}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onViewDetails(application?.id)}
                    />
                    {application?.status !== 'rejected' && application?.status !== 'withdrawn' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onWithdraw(application?.id)}
                        className="text-error hover:bg-error/10"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;