import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Search, GitCompare, Clock, Zap, Shield } from 'lucide-react';
import FileUpload from '@/components/FileUpload';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find specific information across all your legal documents with AI-powered search and voice queries.'
    },
    {
      icon: FileText,
      title: 'Document Summarization',
      description: 'Generate concise summaries of complex legal documents to quickly understand key points.'
    },
    {
      icon: GitCompare,
      title: 'Contract Comparison',
      description: 'Compare two documents side-by-side with highlighted differences and change tracking.'
    },
    {
      icon: Clock,
      title: 'Timeline Extraction',
      description: 'Automatically extract and visualize important dates and events from case documents.'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Upload and analyze documents quickly with our advanced AI processing capabilities.'
    },
    {
      icon: Shield,
      title: 'Secure & Confidential',
      description: 'Your legal documents are processed securely with enterprise-grade encryption.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">
          AI-Powered Legal Document Assistant
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload, search, summarize, and analyze legal documents with advanced AI technology. 
          Built for lawyers, paralegals, and legal researchers.
        </p>
      </div>

      {/* File Upload Section */}
      <FileUpload />

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Start */}
      <Card className="bg-gradient-subtle border-accent">
        <CardHeader>
          <CardTitle className="text-xl">Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-medium">1</div>
              <h3 className="font-medium text-sm">Upload Documents</h3>
              <p className="text-xs text-muted-foreground">Upload your PDF legal documents</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-medium">2</div>
              <h3 className="font-medium text-sm">Choose Action</h3>
              <p className="text-xs text-muted-foreground">Search, summarize, or compare</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-medium">3</div>
              <h3 className="font-medium text-sm">Get Results</h3>
              <p className="text-xs text-muted-foreground">Receive AI-powered insights</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-sm font-medium">4</div>
              <h3 className="font-medium text-sm">Export & Share</h3>
              <p className="text-xs text-muted-foreground">Download or share your analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;