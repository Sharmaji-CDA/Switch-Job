import { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { optimizeResume } from '../../../services/openaiService';

interface ResumeOptimizerModalProps {
  onClose: () => void;
}

const ResumeOptimizerModal = ({ onClose }: ResumeOptimizerModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    matchScore: number;
    keywordsToAdd: string[];
    skillsToHighlight: string[];
    experienceImprovements: string[];
    summary: string;
  } | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!resumeText?.trim() || !jobDescription?.trim()) {
      setError('Please provide both resume and job description.');
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      const optimization = await optimizeResume(resumeText, jobDescription);
      setResults(optimization);
    } catch (err) {
      setError((err as Error)?.message || 'Failed to optimize resume. Please try again.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setResumeText('');
    setJobDescription('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <Icon name="Sparkles" size={20} color="#FFFFFF" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                AI Resume Optimizer
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground">
                Powered by OpenAI GPT-5
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Close"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {!results ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Resume
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e?.target?.value)}
                  placeholder="Paste your resume text here..."
                  className="w-full h-40 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e?.target?.value)}
                  placeholder="Paste the job description you're applying for..."
                  className="w-full h-40 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                variant="default"
                size="lg"
                iconName="Sparkles"
                onClick={handleOptimize}
                disabled={isOptimizing}
                fullWidth
              >
                {isOptimizing ? 'Optimizing...' : 'Optimize Resume'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Target" size={24} className="text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Match Score</p>
                    <p className="text-2xl font-bold text-foreground">{results?.matchScore}%</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-semibold ${
                  results?.matchScore >= 80 ? 'bg-green-100 text-green-700' :
                  results?.matchScore >= 60 ? 'bg-yellow-100 text-yellow-700': 'bg-red-100 text-red-700'
                }`}>
                  {results?.matchScore >= 80 ? 'Excellent' :
                   results?.matchScore >= 60 ? 'Good' : 'Needs Work'}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Lightbulb" size={20} className="text-accent" />
                  Summary
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {results?.summary}
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Key" size={20} className="text-accent" />
                  Keywords to Add
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results?.keywordsToAdd?.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-accent" />
                  Skills to Highlight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results?.skillsToHighlight?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-accent" />
                  Experience Improvements
                </h3>
                <ul className="space-y-2">
                  {results?.experienceImprovements?.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  onClick={handleReset}
                  fullWidth
                >
                  Optimize Another
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  onClick={() => console.log('Download results')}
                  fullWidth
                >
                  Download Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeOptimizerModal;