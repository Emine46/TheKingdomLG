import { TrendingUp, Award, Target, MessageSquare, Users, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import type { User } from '../App';

export function PerformanceView() {
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

  const performanceCategories = [
    { title: 'Meiste Leads', winner: teamMembers[0], metric: 'neueLeads', icon: Users, color: 'from-blue-500 to-blue-600' },
    { title: 'Beste Conversion Rate', winner: teamMembers[0], metric: 'conversionRate', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { title: 'Meiste Antworten', winner: teamMembers[0], metric: 'antworten', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
  ];

  const getMetricValue = (member: User, metric: keyof User['stats']) => {
    const value = member.stats[metric];
    return metric === 'conversionRate' ? `${value}%` : value.toString();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2>Performance-Übersicht 📊</h2>
        <p className="text-slate-600 mt-1">Vergleiche die Leistung deines Teams</p>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-3 gap-6">
        {performanceCategories.map((category, index) => {
          const Icon = category.icon;
          const metric = category.metric as keyof User['stats'];
          
          return (
            <Card key={category.title} className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon size={20} className="text-blue-600" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="relative inline-block mb-3">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                      <span className="text-2xl">{category.winner.avatar}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown size={16} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-slate-900 mb-1">{category.winner.name}</h3>
                  <p className="text-slate-900 mb-1">{getMetricValue(category.winner, metric)}</p>
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    🏆 Top Performer
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detaillierte Rangliste */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award size={20} className="text-purple-600" />
            Team-Rangliste (nach Conversion Rate)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`p-6 rounded-xl transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-primary/10 to-transparent border-2 border-primary'
                    : 'bg-muted border border-border'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === 0
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
                          : index === 1
                          ? 'bg-gradient-to-r from-muted-foreground to-muted-foreground/80 text-foreground'
                          : index === 2
                          ? 'bg-gradient-to-r from-primary/60 to-primary/80 text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-slate-500 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center">
                      <p className="text-slate-900 mb-1">{member.stats.neueLeads}</p>
                      <p className="text-slate-500 text-xs">Leads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-900 mb-1">{member.stats.antworten}</p>
                      <p className="text-slate-500 text-xs">Antworten</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-900 mb-1">{member.stats.offeneNachrichten}</p>
                      <p className="text-slate-500 text-xs">Offen</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp size={16} className="text-green-600" />
                        <p className="text-green-600">{member.stats.conversionRate}%</p>
                      </div>
                      <p className="text-slate-500 text-xs">Conv. Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target size={20} className="text-blue-600" />
            Team-Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-slate-900 mb-3">Was funktioniert gut:</h4>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Tuana nutzt beide Plattformen (Instagram + TikTok) und hat die beste Conversion Rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Emine hat eine sehr gute Balance zwischen Leads und Antworten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Durchschnittliche Team-Conversion Rate liegt bei 42% - über dem Branchenschnitt!</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 mb-3">Verbesserungspotential:</h4>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">!</span>
                  <span>Büsra könnte TikTok als zusätzliche Plattform nutzen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">!</span>
                  <span>Alle Team-Mitglieder könnten von Tuana's Strategie lernen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">!</span>
                  <span>Audio-Antworten könnten häufiger genutzt werden</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}