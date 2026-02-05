import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

interface RatingItem {
  stars: number;
  percentage: number;
}

interface Review {
  id: number;
  department: string;
  level: string;
  rating: number;
  title: string;
  role: string;
  duration: string;
  date: string;
  verified: boolean;
  currentEmployee: boolean;
  pros: string;
  cons: string;
  helpful: number;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  overallRating: number;
  ratingBreakdown?: RatingItem[];
}

const ReviewsSection = ({ reviews, overallRating, ratingBreakdown }: ReviewsSectionProps) => {
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'product', label: 'Product' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' }
  ];

  const filteredReviews = reviews?.filter(review => {
    if (filterDepartment !== 'all' && review?.department !== filterDepartment) return false;
    if (filterLevel !== 'all' && review?.level !== filterLevel) return false;
    return true;
  });

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
        Employee Reviews
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
        <div className="lg:col-span-1">
          <div className="bg-muted rounded-xl p-4 md:p-6 text-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">
              {overallRating}
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={20}
                  className={star <= Math.round(overallRating) ? 'text-warning fill-warning' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Based on {reviews?.length} reviews
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {ratingBreakdown?.map((item) => (
              <div key={item?.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16 md:w-20">
                  <span className="text-sm md:text-base text-foreground font-medium">
                    {item?.stars}
                  </span>
                  <Icon name="Star" size={16} className="text-warning fill-warning" />
                </div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full transition-smooth"
                    style={{ width: `${item?.percentage}%` }}
                  ></div>
                </div>
                <div className="w-12 md:w-16 text-right text-sm md:text-base text-muted-foreground">
                  {item?.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <Select
          options={departmentOptions}
          value={filterDepartment}
          onChange={(value) => setFilterDepartment(value as string)}
          placeholder="Filter by department"
          className="flex-1"
        />
        <Select
          options={levelOptions}
          value={filterLevel}
          onChange={(value) => setFilterLevel(value as string)}
          placeholder="Filter by level"
          className="flex-1"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(value) => setSortBy(value as string)}
          placeholder="Sort by"
          className="flex-1"
        />
      </div>
      <div className="space-y-4 md:space-y-6">
        {filteredReviews?.map((review) => (
          <div
            key={review?.id}
            className="border border-border rounded-xl p-4 md:p-6 transition-smooth hover:shadow-elevation-2"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        className={star <= review?.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground">
                    {review?.rating}/5
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {review?.title}
                </h3>
                <div className="flex flex-wrap gap-2 text-xs md:text-sm text-muted-foreground">
                  <span>{review?.role}</span>
                  <span>•</span>
                  <span>{review?.department}</span>
                  <span>•</span>
                  <span>{review?.duration}</span>
                  <span>•</span>
                  <span>{review?.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {review?.verified && (
                  <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                    Verified Employee
                  </span>
                )}
                {review?.currentEmployee && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
                    Current Employee
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="ThumbsUp" size={16} className="text-success" />
                  <span className="text-sm md:text-base font-medium text-foreground">Pros</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {review?.pros}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="ThumbsDown" size={16} className="text-error" />
                  <span className="text-sm md:text-base font-medium text-foreground">Cons</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {review?.cons}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-sm md:text-base text-muted-foreground transition-smooth hover:text-foreground">
                  <Icon name="ThumbsUp" size={16} />
                  <span>Helpful ({review?.helpful})</span>
                </button>
                <button className="flex items-center gap-2 text-sm md:text-base text-muted-foreground transition-smooth hover:text-foreground">
                  <Icon name="MessageSquare" size={16} />
                  <span>Reply</span>
                </button>
              </div>
              <button className="text-sm md:text-base text-muted-foreground transition-smooth hover:text-foreground">
                <Icon name="Flag" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsSection;