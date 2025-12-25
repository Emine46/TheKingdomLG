import { useState } from 'react';
import { Users, Instagram, UserX, CheckCircle, XCircle, AlertCircle, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { User, BeitrittsAnfrage } from '../App';

export function TeamManagement() {
  const [selectedTab, setSelectedTab] = useState<'team' | 'anfragen'>('team');

  const teamMembers: User[] = [
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
  ];

  const beitrittsAnfragen: BeitrittsAnfrage[] = [
    {
      id: '1',
      name: 'Tom Fischer',
      email: 'tom@example.com',
      nachricht: 'Ich habe 5 Jahre Erfahrung im Social Media Marketing und würde gerne dem Team beitreten. Meine Spezialität ist Instagram-Akquise im B2B-Bereich.',
      datum: 'vor 2 Std',
    },
    {
      id: '2',
      name: 'Anna Klein',
      email: 'anna@example.com',
      nachricht: 'Möchte gerne dem Team beitreten und meine Skills in TikTok-Marketing einbringen. Habe bereits über 50k Follower auf meinem eigenen Account aufgebaut.',
      datum: 'vor 1 Tag',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Crown size={32} className="text-primary" />
          <h2>Team-Verwaltung</h2>
        </div>
        <p className="text-muted-foreground">Verwalte dein Team und Beitrittsanfragen</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <Button
          onClick={() => setSelectedTab('team')}
          variant={selectedTab === 'team' ? 'default' : 'outline'}
          className={
            selectedTab === 'team'
              ? 'bg-primary hover:bg-primary/90'
              : ''
          }
        >
          <Users size={18} className="mr-2" />
          Team-Mitglieder ({teamMembers.length})
        </Button>
        <Button
          onClick={() => setSelectedTab('anfragen')}
          variant={selectedTab === 'anfragen' ? 'default' : 'outline'}
          className={
            selectedTab === 'anfragen'
              ? 'bg-primary hover:bg-primary/90'
              : ''
          }
        >
          <AlertCircle size={18} className="mr-2" />
          Beitrittsanfragen ({beitrittsAnfragen.length})
        </Button>
      </div>

      {/* Team Members View */}
      {selectedTab === 'team' && (
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground flex-shrink-0">
                    {member.avatar}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-foreground mb-1">{member.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{member.email}</p>
                        <div className="flex items-center gap-3">
                          {member.instagramConnected && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Instagram size={14} />
                              <span>{member.instagramUsername}</span>
                            </div>
                          )}
                          {member.tiktokConnected && (
                            <div className="flex items-center gap-1 text-sm text-slate-700">
                              <span>📱</span>
                              <span>{member.tiktokUsername}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">Beigetreten am</p>
                        <p className="text-sm text-slate-700">{member.joinedDate}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-foreground">{member.stats.neueLeads}</p>
                        <p className="text-muted-foreground text-xs">Neue Leads</p>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-foreground">{member.stats.antworten}</p>
                        <p className="text-muted-foreground text-xs">Antworten</p>
                      </div>
                      <div className="p-3 rounded-xl bg-muted border border-border">
                        <p className="text-foreground">{member.stats.offeneNachrichten}</p>
                        <p className="text-muted-foreground text-xs">Offen</p>
                      </div>
                      <div className="p-3 rounded-xl bg-green-50 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20">
                        <p className="text-foreground">{member.stats.conversionRate}%</p>
                        <p className="text-muted-foreground text-xs">Conv. Rate</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button size="sm" variant="outline" className="border-primary/30 hover:bg-primary/5">
                        <Users size={16} className="mr-2" />
                        Leads ansehen
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                      >
                        <UserX size={16} className="mr-2" />
                        Aus Team entfernen
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Member Placeholder */}
          <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/40 transition-colors">
            <CardContent className="p-12 text-center">
              <Users size={48} className="mx-auto mb-4 text-muted-foreground/40" />
              <p className="text-foreground mb-2">Warte auf neue Beitrittsanfragen</p>
              <p className="text-muted-foreground text-sm">
                Team-Mitglieder können über den "Team beitreten" Button eine Anfrage stellen
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Beitrittsanfragen View */}
      {selectedTab === 'anfragen' && (
        <div className="space-y-4">
          {beitrittsAnfragen.length > 0 ? (
            <>
              {beitrittsAnfragen.map((anfrage) => (
                <Card key={anfrage.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      {/* Avatar */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground flex-shrink-0">
                        {anfrage.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>

                      {/* Anfrage Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-foreground mb-1">{anfrage.name}</h3>
                            <p className="text-muted-foreground text-sm">{anfrage.email}</p>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {anfrage.datum}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                            <CheckCircle size={18} className="mr-2" />
                            Genehmigen
                          </Button>
                          <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                            <XCircle size={18} className="mr-2" />
                            Ablehnen
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-foreground mb-2">Keine offenen Beitrittsanfragen</p>
                <p className="text-muted-foreground text-sm">
                  Neue Anfragen erscheinen hier, sobald jemand dem Team beitreten möchte
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}