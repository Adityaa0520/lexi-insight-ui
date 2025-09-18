import React, { useState } from 'react';
import { Clock, Calendar, FileText, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'contract' | 'deadline' | 'meeting' | 'filing' | 'payment' | 'milestone';
  source: string;
  page: number;
  importance: 'high' | 'medium' | 'low';
}

const Timeline = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterImportance, setFilterImportance] = useState('all');

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      date: '2024-01-15',
      title: 'Contract Execution Date',
      description: 'Service Agreement between parties officially executed and becomes effective.',
      type: 'contract',
      source: 'Service Agreement 2024.pdf',
      page: 1,
      importance: 'high'
    },
    {
      id: '2',
      date: '2024-02-15',
      title: 'First Payment Due',
      description: 'Initial payment of $12,500 due within 30 days of contract execution.',
      type: 'payment',
      source: 'Service Agreement 2024.pdf',
      page: 5,
      importance: 'high'
    },
    {
      id: '3',
      date: '2024-03-01',
      title: 'Project Kickoff Meeting',
      description: 'Mandatory project kickoff meeting to be held within 45 days of contract signing.',
      type: 'meeting',
      source: 'Service Agreement 2024.pdf',
      page: 8,
      importance: 'medium'
    },
    {
      id: '4',
      date: '2024-04-15',
      title: 'Quarterly Review Deadline',
      description: 'First quarterly performance review and deliverables assessment.',
      type: 'deadline',
      source: 'Service Agreement 2024.pdf',
      page: 11,
      importance: 'medium'
    },
    {
      id: '5',
      date: '2024-06-01',
      title: 'Insurance Certificate Filing',
      description: 'Professional liability insurance certificate must be filed and maintained.',
      type: 'filing',
      source: 'Service Agreement 2024.pdf',
      page: 16,
      importance: 'high'
    },
    {
      id: '6',
      date: '2024-07-15',
      title: 'Mid-Year Performance Review',
      description: 'Comprehensive performance review and potential contract adjustments.',
      type: 'milestone',
      source: 'Service Agreement 2024.pdf',
      page: 11,
      importance: 'medium'
    },
    {
      id: '7',
      date: '2024-10-15',
      title: 'Renewal Notice Deadline',
      description: 'Deadline for either party to provide notice of non-renewal (90 days before expiry).',
      type: 'deadline',
      source: 'Service Agreement 2024.pdf',
      page: 12,
      importance: 'high'
    },
    {
      id: '8',
      date: '2024-12-31',
      title: 'Contract Expiration',
      description: 'Service Agreement expires unless renewed or extended by mutual agreement.',
      type: 'contract',
      source: 'Service Agreement 2024.pdf',
      page: 12,
      importance: 'high'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'meeting': return 'bg-green-500';
      case 'filing': return 'bg-purple-500';
      case 'payment': return 'bg-yellow-500';
      case 'milestone': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    if (filterImportance !== 'all' && event.importance !== filterImportance) return false;
    return true;
  });

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const downloadTimeline = () => {
    const timelineReport = `Legal Document Timeline Report
Generated on: ${new Date().toLocaleDateString()}

Total Events: ${sortedEvents.length}

${sortedEvents.map((event, index) => `
${index + 1}. ${event.title}
Date: ${new Date(event.date).toLocaleDateString()}
Type: ${event.type.toUpperCase()}
Importance: ${event.importance.toUpperCase()}
Description: ${event.description}
Source: ${event.source} (Page ${event.page})
`).join('\n')}`;

    const blob = new Blob([timelineReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'legal-timeline-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Timeline Visualization</h1>
        <p className="text-muted-foreground">
          Key events and deadlines extracted from your legal documents
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Timeline</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={downloadTimeline}>
              <Download className="h-4 w-4 mr-2" />
              Download Timeline
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filter by Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contract">Contracts</SelectItem>
                  <SelectItem value="deadline">Deadlines</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="filing">Filings</SelectItem>
                  <SelectItem value="payment">Payments</SelectItem>
                  <SelectItem value="milestone">Milestones</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filter by Importance</label>
              <Select value={filterImportance} onValueChange={setFilterImportance}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Importance Levels</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Timeline Events</span>
            </div>
            <Badge variant="outline">
              {sortedEvents.length} events
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-border"></div>
            
            <div className="space-y-6">
              {sortedEvents.map((event, index) => (
                <div key={event.id} className="relative flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-4 h-4 rounded-full ${getTypeColor(event.type)}`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Event card */}
                  <div className={`flex-1 ${isUpcoming(event.date) ? 'ring-2 ring-primary/20' : ''}`}>
                    <Card className={`${isUpcoming(event.date) ? 'shadow-medium' : 'shadow-soft'} transition-shadow`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-medium text-foreground">{event.title}</h3>
                              {isUpcoming(event.date) && (
                                <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
                                  Upcoming
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FileText className="h-3 w-3" />
                                <span>Page {event.page}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge variant="outline" className={`text-xs ${getImportanceColor(event.importance)}`}>
                              {event.importance} priority
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-foreground mb-3">{event.description}</p>
                        
                        <div className="text-xs text-muted-foreground">
                          Source: {event.source}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{timelineEvents.length}</div>
            <div className="text-sm text-muted-foreground">Total Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {timelineEvents.filter(e => isUpcoming(e.date)).length}
            </div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {timelineEvents.filter(e => e.importance === 'high').length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timeline;