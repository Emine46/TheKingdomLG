import { Users, TrendingUp, MessageSquare, Target, Crown, Instagram, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Page, User } from '../App';

interface ManagerDashboardProps {
  onNavigate: (page: Page) => void;
}

export function ManagerDashboard({ onNavigate }: ManagerDashboardProps) {
  const teamMembers: User[] = [
    {
      id: 'user-2',
      name: 'Tuana',
      email: 'tuana@thekingdom.com',
      role: 'teilnehmer',
      avatar: 'T',
      instagramConnected: true,
      tiktokConnected: true,
      instagramUsername: '@tuana',
      tiktokUsername: '@tuana',
      stats: {
        neueLeads: 124,
        antworten: 56,
        offeneNachrichten: 18,
        conversionRate: 45,
      },
      joinedDate: '2024-02-05',
    },
    {
      id: 'user-3',
      name: 'Emine',
      email: 'emine@thekingdom.com',
      role: 'teilnehmer',
      avatar: 'E',
      instagramConnected: true,
      tiktokConnected: true,
      instagramUsername: '@emine',
      tiktokUsername: '@emine',
      stats: {
        neueLeads: 98,
        antworten: 41,
        offeneNachrichten: 15,
        conversionRate: 42,
      },
      joinedDate: '2024-02-10',
    },
    {
      id: 'user-1',
      name: 'Büsra',
      email: 'busra@thekingdom.com',
      role: 'teilnehmer',
      avatar: 'B',
      instagramConnected: true,
      tiktokConnected: false,
      instagramUsername: '@busra',
      stats: {
        neueLeads: 87,
        antworten: 34,
        offeneNachrichten: 12,
        conversionRate: 39,
      },
      joinedDate: '2024-02-01',
    },
  ];

  const totalStats = {
    neueLeads: teamMembers.reduce((sum, m) => sum + m.stats.neueLeads, 0),
    antworten: teamMembers.reduce((sum, m) => sum + m.stats.antworten, 0),
    offeneNachrichten: teamMembers.reduce((sum, m) => sum + m.stats.offeneNachrichten, 0),
    avgConversionRate: Math.round(teamMembers.reduce((sum, m) => sum + m.stats.conversionRate, 0) / teamMembers.length),
  };

  const kpis = [
    { label: 'Gesamt Leads', value: totalStats.neueLeads.toString(), change: '+18%', icon: Users },
    { label: 'Gesamt Antworten', value: totalStats.antworten.toString(), change: '+12%', icon: MessageSquare },
    { label: 'Team-Mitglieder', value: teamMembers.length.toString(), change: '3', icon: Users },
    { label: 'Ø Conversion', value: `${totalStats.avgConversionRate}%`, change: '+5%', icon: TrendingUp },
  ];

  const beitrittsAnfragen = [
    { name: 'Aylin Kara', email: 'aylin@example.com', nachricht: 'Ich habe 3 Jahre Erfahrung im Social Media Marketing...', datum: 'vor 3 Std' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Crown size={32} className="text-primary" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' }} />
            <h2 className="text-foreground">Manager Übersicht</h2>
          </div>
          <p className="text-muted-foreground">Gesamtüberblick über dein Team</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => onNavigate('team')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}
          >
            <Users size={18} className="mr-2" />
            Team verwalten
          </Button>
          <Button
            onClick={() => onNavigate('performance')}
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
          >
            <TrendingUp size={18} className="mr-2" />
            Performance
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <GlassCard key={kpi.label} hover glow>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm mb-2">{kpi.label}</p>
                    <p className="text-foreground text-3xl font-bold mb-1">{kpi.value}</p>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                      <TrendingUp size={12} className="text-green-600" />
                      <span className="text-green-600 text-xs font-medium">{kpi.change}</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80"
                       style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
                    <Icon size={24} className="text-primary-foreground" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Team Performance */}
        <GlassCard glow>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Users size={20} className="text-primary" />
              <h3 className="text-foreground">Team Performance</h3>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={member.id} 
                     className={`p-4 rounded-xl transition-all ${
                       index === 0 
                         ? 'bg-gradient-to-r from-primary/20 to-transparent border border-primary/40' 
                         : 'bg-muted/40 border border-primary/10 hover:border-primary/20'
                     }`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold"
                           style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.4)' }}>
                        {member.avatar}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                          <Crown size={10} className="text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{member.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {member.instagramConnected && <Instagram size={12} className="text-muted-foreground" />}
                        {member.tiktokConnected && <span className="text-xs">📱</span>}
                        <span className="text-xs text-muted-foreground">{member.email}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/40 font-bold">
                      {member.stats.conversionRate}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 rounded-lg bg-primary/5">
                      <p className="text-foreground font-bold">{member.stats.neueLeads}</p>
                      <p className="text-muted-foreground text-xs">Leads</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-primary/5">
                      <p className="text-foreground font-bold">{member.stats.antworten}</p>
                      <p className="text-muted-foreground text-xs">Antworten</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-primary/5">
                      <p className="text-foreground font-bold">{member.stats.offeneNachrichten}</p>
                      <p className="text-muted-foreground text-xs">Offen</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Beitrittsanfragen */}
        <GlassCard glow>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AlertCircle size={20} className="text-primary" />
                <h3 className="text-foreground">Beitrittsanfragen</h3>
              </div>
              {beitrittsAnfragen.length > 0 && (
                <Badge className="bg-primary text-primary-foreground border-0">
                  {beitrittsAnfragen.length} neu
                </Badge>
              )}
            </div>

            {beitrittsAnfragen.length > 0 ? (
              <div className="space-y-4">
                {beitrittsAnfragen.map((anfrage, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold"
                             style={{ boxShadow: '0 0 15px hsl(var(--primary) / 0.4)' }}>
                          {anfrage.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{anfrage.name}</p>
                          <p className="text-muted-foreground text-sm">{anfrage.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-primary">{anfrage.datum}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{anfrage.nachricht}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                              style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' }}>
                        Genehmigen
                      </Button>
                      <Button size="sm" variant="outline" 
                              className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10">
                        Ablehnen
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={() => onNavigate('team')}
                  variant="outline"
                  className="w-full border-primary/20 hover:border-primary/40"
                >
                  Alle Anfragen ansehen
                </Button>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto mb-4 text-primary/20" />
                <p className="text-muted-foreground">Keine offenen Anfragen</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Best Practices */}
      <GlassCard gradient>
        <div className="p-6">
          <h3 className="text-foreground mb-4 flex items-center gap-2">
            <Target size={20} className="text-primary" />
            Team-Insights
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/60 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Höchste Conversion Rate</p>
              <p className="text-foreground font-bold mb-1">Tuana - 45%</p>
              <p className="text-xs text-primary">Nutzt regelmäßig Audio-Antworten</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Meiste Leads</p>
              <p className="text-foreground font-bold mb-1">Tuana - 124</p>
              <p className="text-xs text-primary">Aktiv auf beiden Plattformen</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/60 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Schnellste Response</p>
              <p className="text-foreground font-bold mb-1">Emine - 2.3h</p>
              <p className="text-xs text-primary">Nutzt Nachrichtenvorlagen</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
