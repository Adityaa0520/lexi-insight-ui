import React, { useState } from 'react';
import { FileText, Download, Copy, Volume2, Zap } from 'lucide-react';
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

const Summarize = () => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const documents: Document[] = [
    { id: '1', name: 'Service Agreement 2024.pdf', pages: 24, uploadDate: '2024-01-15' },
    { id: '2', name: 'Employment Contract - John Doe.pdf', pages: 12, uploadDate: '2024-01-14' },
    { id: '3', name: 'Merger Agreement - ABC Corp.pdf', pages: 87, uploadDate: '2024-01-13' },
  ];

  const mockSummary = `**Executive Summary**

This Service Agreement establishes a comprehensive framework for professional services between the parties, effective from January 1, 2024, through December 31, 2024.

**Key Terms & Conditions:**

• **Services Scope**: Full-stack software development, maintenance, and consulting services
• **Compensation**: $150,000 annual fee, payable monthly ($12,500/month)
• **Payment Terms**: Net 30 days from invoice receipt
• **Performance Standards**: 99.5% uptime guarantee, 24/7 support coverage

**Critical Provisions:**

• **Termination**: Either party may terminate with 30 days written notice
• **Intellectual Property**: All work product remains with the client
• **Liability Limitation**: Total liability capped at annual fees paid
• **Confidentiality**: Comprehensive NDA provisions for 5 years post-termination

**Risk Factors:**

• **Force Majeure**: Standard exclusions apply for natural disasters and government actions
• **Indemnification**: Mutual indemnification for third-party claims
• **Dispute Resolution**: Binding arbitration in Delaware

**Renewal & Amendments:**

The agreement automatically renews for successive one-year terms unless terminated. Any amendments must be in writing and signed by both parties.

**Compliance Requirements:**

Both parties must maintain relevant licenses, insurance coverage ($2M professional liability), and comply with applicable data protection regulations.`;

  const generateSummary = async () => {
    if (!selectedDocument) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setSummary(mockSummary);
      setIsGenerating(false);
      toast({
        title: "Summary Generated",
        description: "Document summary has been successfully created.",
      });
    }, 3000);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied to Clipboard",
      description: "Summary has been copied to your clipboard.",
    });
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${selectedDocument}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Summary has been downloaded successfully.",
    });
  };

  const speakSummary = () => {
    // In a real implementation, this would use text-to-speech
    toast({
      title: "Text-to-Speech",
      description: "Summary playback started.",
    });
  };

  const selectedDoc = documents.find(doc => doc.id === selectedDocument);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Document Summarization</h1>
        <p className="text-muted-foreground">
          Generate concise summaries of your legal documents using AI
        </p>
      </div>

      {/* Document Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Select Document</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedDocument} onValueChange={setSelectedDocument}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a document to summarize" />
            </SelectTrigger>
            <SelectContent>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{doc.name}</span>
                    <div className="flex items-center space-x-2 ml-4">
                      <Badge variant="outline" className="text-xs">
                        {doc.pages} pages
                      </Badge>
                      <span className="text-xs text-muted-foreground">{doc.uploadDate}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedDoc && (
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{selectedDoc.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDoc.pages} pages • Uploaded {selectedDoc.uploadDate}
                  </p>
                </div>
                <Button 
                  onClick={generateSummary} 
                  disabled={isGenerating}
                  className="min-w-[120px]"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Results */}
      {summary && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Document Summary</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={speakSummary}>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Listen
                </Button>
                <Button variant="outline" size="sm" onClick={copySummary}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadSummary}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="bg-gradient-subtle p-6 rounded-lg border">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {summary}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>Generated from: {selectedDoc?.name}</span>
                <Badge variant="outline" className="text-xs">
                  AI Summary
                </Badge>
              </div>
              <span>Generated on {new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {isGenerating && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <Zap className="h-12 w-12 text-primary mx-auto animate-pulse" />
              <h3 className="text-lg font-medium text-foreground">Generating Summary</h3>
              <p className="text-muted-foreground">
                Our AI is analyzing your document and creating a comprehensive summary...
              </p>
              <div className="w-64 mx-auto bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Summarize;