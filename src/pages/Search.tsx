import React, { useState } from 'react';
import { Search as SearchIcon, Mic, Volume2, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  question: string;
  answer: string;
  source: string;
  confidence: number;
  document: string;
  page: number;
  section: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search results for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      question: 'What are the termination clauses?',
      answer: 'The agreement may be terminated by either party with 30 days written notice. Additionally, immediate termination is permitted in cases of material breach, insolvency, or violation of confidentiality provisions.',
      source: 'contract_2024.pdf',
      confidence: 95,
      document: 'Service Agreement 2024',
      page: 12,
      section: 'Section 8 - Termination'
    },
    {
      id: '2',
      question: 'What are the payment terms?',
      answer: 'Payment is due within 30 days of invoice receipt. Late payments incur a 1.5% monthly fee. All payments must be made in USD via wire transfer or ACH.',
      source: 'contract_2024.pdf',
      confidence: 92,
      document: 'Service Agreement 2024',
      page: 5,
      section: 'Section 4 - Payment Terms'
    },
    {
      id: '3',
      question: 'What is the liability limitation?',
      answer: 'Total liability is limited to the total fees paid in the 12 months preceding the claim. Neither party shall be liable for indirect, incidental, or consequential damages.',
      source: 'contract_2024.pdf',
      confidence: 88,
      document: 'Service Agreement 2024',
      page: 15,
      section: 'Section 10 - Limitation of Liability'
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setSearchResults(mockResults);
    setHasSearched(true);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedResults(newExpanded);
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
    if (!isListening) {
      setTimeout(() => {
        setQuery("What are the termination clauses in the contract?");
        setIsListening(false);
      }, 2000);
    }
  };

  const speakText = (text: string) => {
    // In a real implementation, this would use text-to-speech API
    console.log('Speaking:', text);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500';
    if (confidence >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Document Search</h1>
        <p className="text-muted-foreground">
          Search across your uploaded documents using natural language queries
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ask a question about your documents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'text-red-500' : 'text-muted-foreground'
                }`}
                onClick={handleVoiceSearch}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>3 documents uploaded</span>
              </div>
              <Button type="submit" disabled={!query.trim()}>
                Search Documents
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Search Results</h2>
            <span className="text-sm text-muted-foreground">{searchResults.length} results found</span>
          </div>

          {searchResults.map((result) => (
            <Card key={result.id} className="shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{result.question}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{result.document}</span>
                      </div>
                      <span>Page {result.page}</span>
                      <span>{result.section}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant="outline" className="text-xs">
                      <div className={`w-2 h-2 rounded-full mr-1 ${getConfidenceColor(result.confidence)}`} />
                      {result.confidence}% confidence
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => speakText(result.answer)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className={`text-foreground ${expandedResults.has(result.id) ? '' : 'line-clamp-3'}`}>
                    {result.answer}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Source: {result.source}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(result.id)}
                      className="text-xs"
                    >
                      {expandedResults.has(result.id) ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          Show More
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {hasSearched && searchResults.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try rephrasing your question or uploading more documents
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;