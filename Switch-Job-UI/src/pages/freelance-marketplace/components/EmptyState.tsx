import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon name="Users" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
        No Freelancers Found
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md">
        We couldn't find any freelancers matching your criteria. Try adjusting your filters or search terms.
      </p>
      <Button variant="outline" iconName="RotateCcw">
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyState;