import React, { useState } from 'react';
import { GitCompare, FileText, Download, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  pages: number;
  uploadDate: string;
}

interface Difference {
  type: 'addition' | 'deletion' | 'modification';
  section: string;
  original: string;
  changed: string;
  page: number;
}

const Compare = () => {
  const [document1, setDocument1] = useState('');
  const [document2, setDocument2] = useState('');
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [hasCompared, setHasCompared] = useState(false);
  const { toast } = useToast();

  const documents: Document[] = [
    { id: '1', name: 'Service Agreement 2024.pdf', pages: 24, uploadDate: '2024-01-15' },
    { id: '2', name: 'Service Agreement 2023.pdf', pages: 22, uploadDate: '2023-12-20' },
    { id: '3', name: 'Employment Contract - John Doe.pdf', pages: 12, uploadDate: '2024-01-14' },
    { id: '4', name: 'Employment Contract - Jane Smith.pdf', pages: 11, uploadDate: '2024-01-12' },
  ];

  const mockDifferences: Difference[] = [
    {
      type: 'modification',
      section: 'Payment Terms',
      original: 'Payment is due within 45 days of invoice receipt.',
      changed: 'Payment is due within 30 days of invoice receipt.',
      page: 5
    },
    {
      type: 'addition',
      section: 'Force Majeure',
      original: '',
      changed: 'Neither party shall be liable for any failure or delay in performance under this Agreement which is due to pandemic, epidemic, or other health emergency declared by applicable governmental authorities.',
      page: 18
    },
    {
      type: 'deletion',
      section: 'Termination',
      original: 'This agreement may be terminated without cause with 90 days written notice.',
      changed: '',
      page: 12
    },
    {
      type: 'modification',
      section: 'Liability Cap',
      original: 'Total liability is limited to $500,000.',
      changed: 'Total liability is limited to the total fees paid in the 12 months preceding the claim.',
      page: 15
    },
    {
      type: 'addition',
      section: 'Data Protection',
      original: '',
      changed: 'Both parties shall comply with all applicable data protection laws, including but not limited to GDPR and CCPA.',
      page: 20
    }
  ];

  const compareDocuments = async () => {
    if (!document1 || !document2) return;
    
    setIsComparing(true);
    setHasCompared(false);
    
    // Simulate API call
    setTimeout(() => {
      setDifferences(mockDifferences);
      setIsComparing(false);
      setHasCompared(true);
      toast({
        title: "Comparison Complete",
        description: `Found ${mockDifferences.length} differences between documents.`,
      });
    }, 3000);
  };

  const downloadReport = () => {
    const report = `Document Comparison Report
Generated on: ${new Date().toLocaleDateString()}

Document 1: ${documents.find(d => d.id === document1)?.name}
Document 2: ${documents.find(d => d.id === document2)?.name}

Differences Found: ${differences.length}

${differences.map((diff, index) => `
${index + 1}. ${diff.section} (Page ${diff.page})
Type: ${diff.type.toUpperCase()}
${diff.type === 'deletion' ? `Removed: "${diff.original}"` : 
  diff.type === 'addition' ? `Added: "${diff.changed}"` :
  `Changed from: "${diff.original}"
Changed to: "${diff.changed}"`}
`).join('\n')}`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document-comparison-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Comparison report has been downloaded successfully.",
    });
  };

  const getDifferenceTypeColor = (type: string) => {
    switch (type) {
      case 'addition': return 'text-green-600 bg-green-50 border-green-200';
      case 'deletion': return 'text-red-600 bg-red-50 border-red-200';
      case 'modification': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-muted-foreground bg-secondary border-border';
    }
  };

  const getDifferenceIcon = (type: string) => {
    switch (type) {
      case 'addition': return '+';
      case 'deletion': return '−';
      case 'modification': return '~';
      default: return '?';
    }
  };

  const selectedDoc1 = documents.find(doc => doc.id === document1);
  const selectedDoc2 = documents.find(doc => doc.id === document2);
  const canCompare = document1 && document2 && document1 !== document2;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Document Comparison</h1>
        <p className="text-muted-foreground">
          Compare two legal documents to identify differences and changes
        </p>
      </div>

      {/* Document Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GitCompare className="h-5 w-5" />
            <span>Select Documents to Compare</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Document 1</label>
              <Select value={document1} onValueChange={setDocument1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first document" />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      <div className="flex flex-col">
                        <span>{doc.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {doc.pages} pages • {doc.uploadDate}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Document 2</label>
              <Select value={document2} onValueChange={setDocument2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second document" />
                </SelectTrigger>
                <SelectContent>
                  {documents.filter(doc => doc.id !== document1).map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      <div className="flex flex-col">
                        <span>{doc.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {doc.pages} pages • {doc.uploadDate}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedDoc1 && selectedDoc2 && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground">Ready to Compare</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>📄 {selectedDoc1.name}</span>
                    <span>vs</span>
                    <span>📄 {selectedDoc2.name}</span>
                  </div>
                </div>
                <Button 
                  onClick={compareDocuments} 
                  disabled={!canCompare || isComparing}
                  className="min-w-[120px]"
                >
                  {isComparing ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Comparing...
                    </>
                  ) : (
                    <>
                      <GitCompare className="h-4 w-4 mr-2" />
                      Compare Documents
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comparison Results */}
      {hasCompared && differences.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <GitCompare className="h-5 w-5" />
                <span>Comparison Results</span>
                <Badge variant="outline">
                  {differences.length} differences found
                </Badge>
              </CardTitle>
              <Button variant="outline" size="sm" onClick={downloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {differences.map((diff, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${getDifferenceTypeColor(diff.type)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${getDifferenceTypeColor(diff.type)}`}>
                        {getDifferenceIcon(diff.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{diff.section}</h3>
                        <p className="text-xs text-muted-foreground">Page {diff.page}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {diff.type}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {diff.type !== 'addition' && diff.original && (
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {diff.type === 'deletion' ? 'Removed' : 'Original'}
                        </label>
                        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm">
                          {diff.original}
                        </div>
                      </div>
                    )}
                    
                    {diff.type !== 'deletion' && diff.changed && (
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {diff.type === 'addition' ? 'Added' : 'Changed To'}
                        </label>
                        <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                          {diff.changed}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isComparing && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <GitCompare className="h-12 w-12 text-primary mx-auto animate-pulse" />
              <h3 className="text-lg font-medium text-foreground">Comparing Documents</h3>
              <p className="text-muted-foreground">
                Our AI is analyzing both documents to identify all differences...
              </p>
              <div className="w-64 mx-auto bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasCompared && differences.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Differences Found</h3>
            <p className="text-muted-foreground">
              The selected documents appear to be identical or have no significant differences.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Compare;