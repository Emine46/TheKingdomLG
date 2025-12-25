import { useState } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Instagram, Mic, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Page } from '../App';

interface InboxProps {
  onNavigate: (page: Page) => void;
}

export function Inbox({ onNavigate }: InboxProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('alle');

  const messages = [
    {
      id: '1',
      leadName: 'Sarah Weber',
      username: '@sarahweber',
      platform: 'instagram' as const,
      lastMessage: 'Hey, das klingt super interessant! Wann können wir telefonieren?',
      status: 'antwort-erhalten',
      timestamp: 'vor 5 Min',
      unread: true,
    },
    {
      id: '2',
      leadName: 'Max Müller',
      username: '@maxmueller',
      platform: 'tiktok' as const,
      lastMessage: 'Danke für die Nachricht! Erzähl mir mehr darüber.',
      status: 'antwort-erhalten',
      timestamp: 'vor 1 Std',
      unread: true,
    },
    {
      id: '3',
      leadName: 'Tom Fischer',
      username: '@tomfischer',
      platform: 'tiktok' as const,
      lastMessage: 'Nachricht gesendet: "Hey Tom! Mir ist aufgefallen..."',
      status: 'ausstehend',
      timestamp: 'vor 3 Std',
      unread: false,
    },
    {
      id: '4',
      leadName: 'Lisa Schmidt',
      username: '@lisaschmidt',
      platform: 'instagram' as const,
      lastMessage: 'Ja gerne! Aber erst nächste Woche, okay?',
      status: 'follow-up',
      timestamp: 'vor 2 Tagen',
      unread: false,
    },
    {
      id: '5',
      leadName: 'Anna Klein',
      username: '@annaklein',
      platform: 'instagram' as const,
      lastMessage: 'Nachricht gesendet: "Hallo Anna! Als jemand..."',
      status: 'ausstehend',
      timestamp: 'vor 3 Tagen',
      unread: false,
    },
    {
      id: '6',
      leadName: 'Daniel Becker',
      username: '@danielbecker',
      platform: 'tiktok' as const,
      lastMessage: 'Cool, schick mir mal mehr Infos!',
      status: 'follow-up',
      timestamp: 'vor 5 Tagen',
      unread: false,
    },
  ];

  const filteredMessages = messages.filter((msg) => {
    if (selectedFilter === 'alle') return true;
    return msg.status === selectedFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'antwort-erhalten':
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 dark:bg-green-500/20 dark:text-green-400">
            <CheckCircle size={14} className="mr-1" />
            Antwort erhalten
          </Badge>
        );
      case 'ausstehend':
        return (
          <Badge className="bg-muted text-muted-foreground border-border">
            <Clock size={14} className="mr-1" />
            Ausstehend
          </Badge>
        );
      case 'follow-up':
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <AlertCircle size={14} className="mr-1" />
            Follow-up nötig
          </Badge>
        );
      default:
        return null;
    }
  };

  const statusCounts = {
    alle: messages.length,
    'antwort-erhalten': messages.filter((m) => m.status === 'antwort-erhalten').length,
    ausstehend: messages.filter((m) => m.status === 'ausstehend').length,
    'follow-up': messages.filter((m) => m.status === 'follow-up').length,
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setSelectedFilter('alle')}
          variant={selectedFilter === 'alle' ? 'default' : 'outline'}
          className={selectedFilter === 'alle' ? 'bg-primary hover:bg-primary/90' : ''}
        >
          Alle ({statusCounts.alle})
        </Button>
        <Button
          onClick={() => setSelectedFilter('antwort-erhalten')}
          variant={selectedFilter === 'antwort-erhalten' ? 'default' : 'outline'}
          className={selectedFilter === 'antwort-erhalten' ? 'bg-green-600 hover:bg-green-700 text-white border-0' : ''}
        >
          Antwort erhalten ({statusCounts['antwort-erhalten']})
        </Button>
        <Button
          onClick={() => setSelectedFilter('ausstehend')}
          variant={selectedFilter === 'ausstehend' ? 'default' : 'outline'}
          className={selectedFilter === 'ausstehend' ? 'bg-foreground hover:bg-foreground/90 text-background border-0' : ''}
        >
          Ausstehend ({statusCounts.ausstehend})
        </Button>
        <Button
          onClick={() => setSelectedFilter('follow-up')}
          variant={selectedFilter === 'follow-up' ? 'default' : 'outline'}
          className={selectedFilter === 'follow-up' ? 'bg-primary/80 hover:bg-primary border-0' : ''}
        >
          Follow-up nötig ({statusCounts['follow-up']})
        </Button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => {
          const PlatformIcon = message.platform === 'instagram' ? Instagram : Video;
          
          return (
            <Card
              key={message.id}
              className={`border-primary/20 hover:shadow-md transition-all ${
                message.unread ? 'bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Profile */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold">
                      {message.leadName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    {message.unread && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-card" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-foreground font-medium mb-1">{message.leadName}</h3>
                        <p className="text-muted-foreground text-sm">{message.username}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(message.status)}
                        <PlatformIcon size={18} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{message.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-foreground/80 mb-4">{message.lastMessage}</p>

                    {message.status === 'antwort-erhalten' && (
                      <div className="flex gap-3">
                        <Button className="bg-primary hover:bg-primary/90">
                          <MessageSquare size={18} className="mr-2" />
                          Antwort-Vorschlag generieren
                        </Button>
                        <Button
                          onClick={() => onNavigate('audio')}
                          variant="outline"
                          className="border-primary/30 hover:bg-primary/5"
                        >
                          <Mic size={18} className="mr-2" />
                          Audio-Antwort erstellen
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <Card className="border-primary/20">
          <CardContent className="p-12 text-center">
            <MessageSquare size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">Keine Nachrichten in dieser Kategorie.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}