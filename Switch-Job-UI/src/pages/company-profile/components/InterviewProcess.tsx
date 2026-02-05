import Icon from '../../../components/AppIcon';

interface Stage {
  color: string;
  icon: string;
  title: string;
  description: string;
  duration?: string;
  tips?: string[];
}

interface InterviewProcessProps {
  process: {
    avgDuration?: string;
    avgRounds?: string;
    responseTime?: string;
    stages?: Stage[];
    commonQuestions?: string[];
  };
}

const InterviewProcess = ({ process }: InterviewProcessProps) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-2 p-4 md:p-6 lg:p-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-4 md:mb-6">
        Interview Process
      </h2>
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-muted rounded-xl p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {process.avgDuration}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Average Process Duration
            </div>
          </div>
          <div className="bg-muted rounded-xl p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {process.avgRounds}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Interview Rounds
            </div>
          </div>
          <div className="bg-muted rounded-xl p-4 md:p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {process.responseTime}
            </div>
            <div className="text-sm md:text-base text-muted-foreground">
              Response Time
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Typical Interview Stages
        </h3>
        <div className="space-y-4">
          {process.stages?.map((stage, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: stage?.color }}
                >
                  <Icon name={stage?.icon} size={20} color="#FFFFFF" />
                </div>
                {index < (process.stages?.length ?? 0) - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-base md:text-lg font-semibold text-foreground">
                    {stage?.title}
                  </h4>
                  <span className="px-2 py-1 bg-muted rounded text-xs md:text-sm text-muted-foreground">
                    {stage?.duration}
                  </span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3">
                  {stage?.description}
                </p>
                {stage?.tips && (
                  <div className="bg-muted rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name="Lightbulb" size={16} className="text-accent mt-1" />
                      <span className="text-sm md:text-base font-medium text-foreground">
                        Preparation Tips:
                      </span>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {stage?.tips?.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs md:text-sm text-muted-foreground">
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
          Common Interview Questions
        </h3>
        <div className="space-y-3">
          {process.commonQuestions?.map((question, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-3 md:p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base text-foreground font-medium">
                    {question}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewProcess;