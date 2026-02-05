import { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onAction, 
  onClearSelection 
}: { 
  selectedCount: number; 
  onAction: (action: string) => void; 
  onClearSelection: () => void; 
}) => {
  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'withdraw', label: 'Withdraw Applications' },
    { value: 'export', label: 'Export Selected' },
    { value: 'mark-reviewed', label: 'Mark as Reviewed' }
  ];

  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleApplyAction = () => {
    if (selectedAction) {
      onAction(selectedAction);
      setSelectedAction('');
    }
  };

  const handleSelectChange = (value: string | number | (string | number)[] | null) => {
    setSelectedAction(value as string);
  };

  return (
    <div className="bg-primary text-primary-foreground rounded-lg p-4 md:p-6 shadow-elevation-3 mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <span className="text-lg font-bold">{selectedCount}</span>
          </div>
          <div>
            <div className="font-semibold text-base md:text-lg">
              {selectedCount} {selectedCount === 1 ? 'Application' : 'Applications'} Selected
            </div>
            <div className="text-sm opacity-90">Choose an action to apply to selected items</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={handleSelectChange}
            className="w-full sm:w-64"
          />
          <Button
            variant="secondary"
            iconName="Check"
            iconPosition="left"
            onClick={handleApplyAction}
            disabled={!selectedAction}
            fullWidth
          >
            Apply
          </Button>
          <Button
            variant="outline"
            iconName="X"
            onClick={onClearSelection}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;