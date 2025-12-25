import { useState } from 'react';
import { Search, TrendingUp, Users, Heart, Target, Instagram, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { Page } from '../App';

interface ZielgruppenAnalyseProps {
  onNavigate: (page: Page) => void;
}

interface Profile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  engagement: number;
  interests: string[];
  platform: 'instagram' | 'tiktok';
}

const allProfiles: Profile[] = [
  {
    id: '1',
    name: 'Anna Müller',
    username: '@anna.fitness',
    avatar: 'AM',
    bio: 'Personal Trainer • Ernährungsberaterin • Sport ist meine Leidenschaft 💪',
    followers: 24500,
    engagement: 8.5,
    interests: ['Sport', 'Fitness', 'Ernährung', 'Gesundheit'],
    platform: 'instagram',
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    username: '@anna.lifestyle',
    avatar: 'AS',
    bio: 'Lifestyle Blogger • Coffee Lover ☕ • Travel Addict ✈️',
    followers: 18200,
    engagement: 6.2,
    interests: ['Lifestyle', 'Reisen', 'Mode'],
    platform: 'instagram',
  },
  {
    id: '3',
    name: 'Max Sport',
    username: '@maxfit_coach',
    avatar: 'MS',
    bio: 'Fitness Coach • Bodybuilding • Transformation Expert 🏋️',
    followers: 45000,
    engagement: 12.3,
    interests: ['Sport', 'Fitness', 'Bodybuilding'],
    platform: 'instagram',
  },
  {
    id: '4',
    name: 'Laura Sportlife',
    username: '@laura.sports',
    avatar: 'LS',
    bio: 'Yoga Teacher • Mindfulness • Sport & Balance 🧘‍♀️',
    followers: 32100,
    engagement: 9.7,
    interests: ['Sport', 'Yoga', 'Wellness', 'Gesundheit'],
    platform: 'instagram',
  },
  {
    id: '5',
    name: 'Tom Fitness',
    username: '@tom.training',
    avatar: 'TF',
    bio: 'Athletic Trainer • HIIT Specialist • Sports Nutrition 💪',
    followers: 28900,
    engagement: 10.2,
    interests: ['Sport', 'Fitness', 'Training', 'Ernährung'],
    platform: 'tiktok',
  },
  {
    id: '6',
    name: 'Sarah Sport',
    username: '@sarah_active',
    avatar: 'SS',
    bio: 'Runner • Marathon Training • Sports Enthusiast 🏃‍♀️',
    followers: 19500,
    engagement: 7.8,
    interests: ['Sport', 'Laufen', 'Marathon', 'Fitness'],
    platform: 'instagram',
  },
  {
    id: '7',
    name: 'Anna Wagner',
    username: '@anna.daily',
    avatar: 'AW',
    bio: 'Mompreneur • Family Life • DIY Projects 👨‍👩‍👧‍👦',
    followers: 15600,
    engagement: 5.4,
    interests: ['Familie', 'DIY', 'Lifestyle'],
    platform: 'instagram',
  },
  {
    id: '8',
    name: 'Sophie Anna',
    username: '@sophie.anna',
    avatar: 'SA',
    bio: 'Fashion & Beauty • Style Inspiration • Shopping Addict 👗',
    followers: 22400,
    engagement: 6.9,
    interests: ['Mode', 'Beauty', 'Shopping'],
    platform: 'tiktok',
  },
];

export function ZielgruppenAnalyse({ onNavigate }: ZielgruppenAnalyseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyse = () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      setFilteredProfiles([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Filter profiles based on search query
    const results = allProfiles.filter(profile => {
      const matchesName = profile.name.toLowerCase().includes(query);
      const matchesUsername = profile.username.toLowerCase().includes(query);
      const matchesBio = profile.bio.toLowerCase().includes(query);
      const matchesInterests = profile.interests.some(interest => 
        interest.toLowerCase().includes(query)
      );
      
      return matchesName || matchesUsername || matchesBio || matchesInterests;
    });

    setFilteredProfiles(results);
    setShowResults(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyse();
    }
  };

  const stats = {
    totalProfiles: filteredProfiles.length,
    avgEngagement: filteredProfiles.length > 0 
      ? (filteredProfiles.reduce((sum, p) => sum + p.engagement, 0) / filteredProfiles.length).toFixed(1)
      : 0,
    totalReach: filteredProfiles.reduce((sum, p) => sum + p.followers, 0),
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground">Zielgruppen-Analyse 🎯</h2>
        <p className="text-muted-foreground mt-1">Analysiere Profile basierend auf Namen, Interessen und Themen</p>
      </div>

      {/* Eingabebereich */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder='Suche nach Namen oder Interessen (z.B. "Anna" oder "Sport")'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-12 h-14 rounded-xl bg-background text-foreground"
              />
            </div>
            <Button
              onClick={handleAnalyse}
              className="h-14 px-8 bg-primary hover:bg-primary/90"
            >
              <Target size={20} className="mr-2" />
              Analysieren
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Beispiele:</span>
            <button
              onClick={() => { setSearchQuery('Sport'); handleAnalyse(); }}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              Sport
            </button>
            <button
              onClick={() => { setSearchQuery('Anna'); handleAnalyse(); }}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              Anna
            </button>
            <button
              onClick={() => { setSearchQuery('Fitness'); handleAnalyse(); }}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              Fitness
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Analyse-Ergebnisse */}
      {showResults && (
        <>
          {/* Statistiken */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Users size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold text-foreground mb-1">{stats.totalProfiles}</p>
                <p className="text-muted-foreground text-sm">Profile gefunden</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Heart size={32} className="mx-auto mb-3 text-green-600" />
                <p className="text-3xl font-bold text-foreground mb-1">{stats.avgEngagement}%</p>
                <p className="text-muted-foreground text-sm">Ø Engagement</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <TrendingUp size={32} className="mx-auto mb-3 text-primary" />
                <p className="text-3xl font-bold text-foreground mb-1">{(stats.totalReach / 1000).toFixed(1)}k</p>
                <p className="text-muted-foreground text-sm">Gesamt Reichweite</p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Grid */}
          {filteredProfiles.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground flex-shrink-0">
                          {profile.avatar}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-foreground mb-1">{profile.name}</CardTitle>
                          <p className="text-muted-foreground text-sm flex items-center gap-2">
                            {profile.platform === 'instagram' ? (
                              <Instagram size={14} />
                            ) : (
                              <span>📱</span>
                            )}
                            {profile.username}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 rounded-xl bg-background text-foreground text-sm">
                        {profile.bio}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 rounded-xl bg-muted">
                          <p className="text-foreground font-bold">{(profile.followers / 1000).toFixed(1)}k</p>
                          <p className="text-muted-foreground text-xs">Follower</p>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-500/10">
                          <p className="text-foreground font-bold">{profile.engagement}%</p>
                          <p className="text-muted-foreground text-xs">Engagement</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Interessen</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interesse, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20"
                            >
                              {interesse}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => onNavigate('leads')}
                      >
                        <User size={16} className="mr-2" />
                        Als Lead hinzufügen
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('leads')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 px-8"
                >
                  <Users size={20} className="mr-2" />
                  Alle zu Leads hinzufügen
                </Button>
              </div>
            </>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-foreground mb-2">Keine Profile gefunden</p>
                <p className="text-muted-foreground text-sm">
                  Versuche eine andere Suchanfrage wie "Sport", "Anna" oder "Fitness"
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
