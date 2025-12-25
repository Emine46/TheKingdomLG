import { useState } from 'react';
import { Search, Instagram, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import type { Lead } from '../App';

interface LeadManagerProps {
  onSelectLead: (lead: Lead) => void;
  currentUserId: string;
  isManager: boolean;
}

export function LeadManager({ onSelectLead, currentUserId, isManager }: LeadManagerProps) {
  const [filterRelevanz, setFilterRelevanz] = useState<string>('alle');
  const [filterPlattform, setFilterPlattform] = useState<string>('alle');
  const [filterUser, setFilterUser] = useState<string>(isManager ? 'alle' : currentUserId);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock-Daten - in einer echten App würden diese nach userId gefiltert werden
  const allLeads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Weber',
      username: '@sarahweber_lead',
      platform: 'instagram',
      profileImage: 'SW',
      beschreibung: 'Content Creator & Entrepreneur | 25k Follower',
      relevanz: 'hoch',
      interessen: ['Business', 'Marketing', 'Growth'],
      engagementLevel: 94,
      userId: 'user-1',
    },
    {
      id: '2',
      name: 'Max Müller Lead',
      username: '@maxmueller_lead',
      platform: 'tiktok',
      profileImage: 'MM',
      beschreibung: 'Digital Marketer | 15k Follower',
      relevanz: 'hoch',
      interessen: ['Marketing', 'Tools', 'Automation'],
      engagementLevel: 87,
      userId: 'user-2',
    },
    {
      id: '3',
      name: 'Lisa Schmidt Lead',
      username: '@lisaschmidt_lead',
      platform: 'instagram',
      profileImage: 'LS',
      beschreibung: 'Freelance Designer | 8k Follower',
      relevanz: 'mittel',
      interessen: ['Design', 'Produktivität', 'Kreativität'],
      engagementLevel: 76,
      userId: 'user-3',
    },
  ];

  const userNames: Record<string, string> = {
    'user-1': 'Büsra',
    'user-2': 'Tuana',
    'user-3': 'Emine',
  };

  const filteredLeads = allLeads.filter((lead) => {
    const matchesRelevanz = filterRelevanz === 'alle' || lead.relevanz === filterRelevanz;
    const matchesPlattform = filterPlattform === 'alle' || lead.platform === filterPlattform;
    const matchesUser = filterUser === 'alle' || lead.userId === filterUser;
    const matchesSearch =
      searchTerm === '' ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.username.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRelevanz && matchesPlattform && matchesUser && matchesSearch;
  });

  const getRelevanzColor = (relevanz: string) => {
    switch (relevanz) {
      case 'hoch':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'mittel':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'gering':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground">{isManager ? 'Alle Team-Leads 👥' : 'Meine Leads 👥'}</h2>
        <p className="text-muted-foreground mt-1">
          {isManager ? 'Überblick über alle Leads im Team' : 'Verwalte und kontaktiere deine potenziellen Leads'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Lead suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 rounded-xl border-slate-200"
              />
            </div>
            <div className="flex gap-3">
              {isManager && (
                <select
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  className="px-4 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="alle">Alle Team-Mitglieder</option>
                  {Object.entries(userNames).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              )}
              <select
                value={filterRelevanz}
                onChange={(e) => setFilterRelevanz(e.target.value)}
                className="px-4 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="alle">Alle Relevanzen</option>
                <option value="hoch">Hohe Relevanz</option>
                <option value="mittel">Mittlere Relevanz</option>
                <option value="gering">Geringe Relevanz</option>
              </select>
              <select
                value={filterPlattform}
                onChange={(e) => setFilterPlattform(e.target.value)}
                className="px-4 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="alle">Alle Plattformen</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground flex-shrink-0">
                  {lead.profileImage}
                </div>

                {/* Lead Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-foreground mb-1">{lead.name}</h3>
                      <p className="text-muted-foreground text-sm">{lead.username}</p>
                      {isManager && (
                        <p className="text-primary text-xs mt-1">Lead von: {userNames[lead.userId]}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRelevanzColor(lead.relevanz)}>
                        {lead.relevanz === 'hoch' ? '🔥 Hohe Relevanz' : lead.relevanz === 'mittel' ? '⭐ Mittlere Relevanz' : '📌 Geringe Relevanz'}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                        <Instagram size={16} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3">{lead.beschreibung}</p>

                  <div className="flex items-center gap-6 mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-primary" />
                      <span className="text-sm text-muted-foreground">Engagement: {lead.engagementLevel}%</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lead.interessen.map((interesse, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                        >
                          {interesse}
                        </span>
                      ))}
                    </div>
                  </div>

                  {(!isManager || lead.userId === currentUserId) && (
                    <Button
                      onClick={() => onSelectLead(lead)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Nachrichten-Vorschlag erstellen
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Keine Leads gefunden. Passe deine Filter an.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}