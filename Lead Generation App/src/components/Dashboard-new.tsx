import { TrendingUp, Users, MessageSquare, Target, ArrowUpRight, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { Page, User } from '../App';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  currentUser: User;
}

export function Dashboard({ onNavigate, currentUser }: DashboardProps) {
  const kpis = [
    { label: 'Neue Leads', value: currentUser.stats.neueLeads.toString(), change: '+12%', icon: Users, color: 'from-primary to-primary/80' },
    { label: 'Antworten', value: currentUser.stats.antworten.toString(), change: '+8%', icon: MessageSquare, color: 'from-green-500 to-green-600' },
    { label: 'Offene Nachrichten', value: currentUser.stats.offeneNachrichten.toString(), change: '-3%', icon: TrendingUp, color: 'from-muted-foreground to-foreground' },
    { label: 'Conversion Rate', value: `${currentUser.stats.conversionRate}%`, change: '+5%', icon: Target, color: 'from-primary/80 to-primary' },
  ];

  const recentLeads = [
    { name: 'Julia Becker', username: '@juliabecker', platform: 'instagram', activity: 'Hat deinen Content geliked', time: 'vor 5 Min' },
    { name: 'Tim Wagner', username: '@timwagner', platform: 'tiktok', activity: 'Neuer Kommentar', time: 'vor 12 Min' },
    { name: 'Nina Schulz', username: '@ninaschulz', platform: 'instagram', activity: 'Folgt dir jetzt', time: 'vor 1 Std' },
    { name: 'Paul Richter', username: '@paulrichter', platform: 'tiktok', activity: 'Video geteilt', time: 'vor 2 Std' },
  ];

  const contentTrends = [
    { topic: 'Behind-the-Scenes', engagement: 94, cluster: 'Unternehmer 25-35' },
    { topic: 'Tutorials & Tipps', engagement: 87, cluster: 'Anfänger & Einsteiger' },
    { topic: 'Success Stories', engagement: 76, cluster: 'Fortgeschrittene' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2>Willkommen zurück, {currentUser.name.split(' ')[0]}! 👋</h2>
          <p className="text-muted-foreground mt-1">Hier ist deine Akquise-Übersicht für heute</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => onNavigate('analyse')}
            className="bg-primary hover:bg-primary/90"
          >
            <Target size={18} className="mr-2" />
            Neue Zielgruppe analysieren
          </Button>
          <Button
            onClick={() => onNavigate('leads')}
            variant="outline"
            className="border-primary/30 hover:bg-primary/5"
          >
            <MessageSquare size={18} className="mr-2" />
            Neue Nachricht erstellen
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="border-primary/20 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">{kpi.label}</p>
                    <p className="text-foreground mb-1">{kpi.value}</p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <ArrowUpRight size={16} />
                      <span>{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${kpi.color}`}>
                    <Icon size={20} className={kpi.color.includes('green') ? 'text-white' : 'text-primary-foreground'} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Lead Feed */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              Mein Lead Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeads.map((lead, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-foreground">{lead.name}</p>
                  <p className="text-muted-foreground text-sm">{lead.username}</p>
                </div>
                <div className="text-right">
                  <p className="text-foreground/80 text-sm">{lead.activity}</p>
                  <p className="text-muted-foreground text-sm">{lead.time}</p>
                </div>
                <Instagram size={18} className="text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Content Trends */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              Content-Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentTrends.map((trend, index) => (
              <div key={index} className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-foreground">{trend.topic}</p>
                  <span className="px-3 py-1 rounded-full bg-card text-sm text-primary">{trend.engagement}% Engagement</span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    style={{ width: `${trend.engagement}%` }}
                  />
                </div>
                <p className="text-muted-foreground text-sm mt-2">Zielgruppe: {trend.cluster}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Connected Accounts */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardContent className="p-6">
          <h3 className="text-foreground mb-4">Verbundene Accounts</h3>
          <div className="flex gap-4">
            {currentUser.instagramConnected && (
              <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-green-500/20">
                <Instagram size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-foreground">{currentUser.instagramUsername}</p>
                  <p className="text-xs text-green-600">✓ Verbunden</p>
                </div>
              </div>
            )}
            {currentUser.tiktokConnected && (
              <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-green-500/20">
                <span className="text-xl">📱</span>
                <div>
                  <p className="text-sm text-foreground">{currentUser.tiktokUsername}</p>
                  <p className="text-xs text-green-600">✓ Verbunden</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
