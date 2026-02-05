import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NoteModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  applicationTitle 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: { note: string; reminder: string }) => void; 
  applicationTitle: string; 
}) => {
  const [note, setNote] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSave = () => {
    if (note?.trim()) {
      onSave({ note, reminder });
      setNote('');
      setReminder('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Add Note</h3>
            <p className="text-sm text-muted-foreground mt-1">{applicationTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Note
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              rows={6}
              placeholder="Add your notes about this application..."
              value={note}
              onChange={(e) => setNote(e?.target?.value)}
            />
          </div>

          <Input
            type="datetime-local"
            label="Set Reminder (Optional)"
            description="Get notified to follow up on this application"
            value={reminder}
            onChange={(e) => setReminder(e?.target?.value)}
          />

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Keep track of important details like interview feedback, follow-up actions, or recruiter conversations.
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-4 md:px-6 py-4 flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
            disabled={!note?.trim()}
            fullWidth
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;