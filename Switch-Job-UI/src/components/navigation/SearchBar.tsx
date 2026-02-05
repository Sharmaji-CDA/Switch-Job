import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

interface SearchResult {
  id: number;
  title: string;
  type: 'job' | 'company';
  company?: string;
  location?: string;
  description?: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mockSearchResults: SearchResult[] = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'job'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Design Studio',
      location: 'Remote',
      type: 'job'
    },
    {
      id: 3,
      title: 'Google',
      description: 'Technology Company',
      type: 'company'
    },
    {
      id: 4,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'job'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery?.trim()?.length > 0) {
      setIsSearching(true);
      const timeoutId = setTimeout(() => {
        const filtered = mockSearchResults?.filter(
          (item) =>
            item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
            (item?.company && item?.company?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        );
        setSearchResults(filtered);
        setIsSearching(false);
        setShowResults(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    if (result?.type === 'job') {
      navigate('/job-search', { state: { searchQuery: result?.title } });
    } else if (result?.type === 'company') {
      navigate('/company-profile', { state: { companyName: result?.title } });
    }
    setSearchQuery('');
    setShowResults(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate('/job-search', { state: { searchQuery } });
      setSearchQuery('');
      setShowResults(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
        <Icon name="Search" size={20} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search jobs, companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onFocus={() => searchQuery?.trim() && setShowResults(true)}
        />
      </form>
      {showResults && searchResults?.length > 0 && (
        <div className="search-results">
          {searchResults?.map((result) => (
            <div
              key={result?.id}
              className="search-result-item"
              onClick={() => handleResultClick(result)}
            >
              <div className="search-result-title">{result?.title}</div>
              <div className="search-result-meta">
                {result?.type === 'job' ? (
                  <>
                    {result?.company} • {result?.location}
                  </>
                ) : (
                  result?.description
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {showResults && searchQuery?.trim() && searchResults?.length === 0 && !isSearching && (
        <div className="search-results">
          <div className="px-4 py-3 text-muted-foreground text-center">
            No results found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;