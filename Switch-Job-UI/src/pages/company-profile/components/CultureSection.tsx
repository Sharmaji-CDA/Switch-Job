import { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

interface Photo {
  url: string;
  alt: string;
}

interface Benefit {
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface Testimonial {
  avatar: string;
  avatarAlt: string;
  name: string;
  role: string;
  duration: string;
  rating: number;
  quote: string;
}

interface CultureSectionProps {
  culture: {
    photos?: Photo[];
    benefits?: Benefit[];
    testimonials?: Testimonial[];
  };
}

const CultureSection = ({ culture }: CultureSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
        Company Culture & Benefits
      </h2>
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Image" size={20} className="text-accent" />
          Office & Team Photos
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {culture?.photos?.map((photo, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-smooth hover:scale-105"
              onClick={() => setSelectedImage(photo)}
            >
              <Image
                src={photo?.url}
                alt={photo?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Gift" size={20} className="text-accent" />
          Benefits & Perks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {culture?.benefits?.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 md:p-4 bg-muted rounded-lg"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: benefit?.color }}
              >
                <Icon name={benefit?.icon} size={20} color="#FFFFFF" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm md:text-base text-foreground mb-1">
                  {benefit?.title}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {benefit?.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MessageSquare" size={20} className="text-accent" />
          What Employees Say
        </h3>
        <div className="space-y-4">
          {culture?.testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="border border-border rounded-xl p-4 md:p-6"
            >
              <div className="flex items-start gap-3 md:gap-4 mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm md:text-base text-foreground">
                    {testimonial?.name}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {testimonial?.role} • {testimonial?.duration}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={14}
                      className={star <= testimonial?.rating ? 'text-warning fill-warning' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                "{testimonial?.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 p-2 rounded-lg bg-card transition-smooth hover:bg-muted"
              onClick={() => setSelectedImage(null)}
            >
              <Icon name="X" size={24} />
            </button>
            <Image
              src={selectedImage?.url}
              alt={selectedImage?.alt}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CultureSection;