import { useState } from 'react';
import { LogIn, UserPlus, Shield, Users } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import logo from 'figma:asset/b146160891c72adfff38db8599fe605b1ee80509.png';
import type { User } from '../App';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showManagerRegister, setShowManagerRegister] = useState(false);
  const [joinName, setJoinName] = useState('');
  const [joinEmail, setJoinEmail] = useState('');
  const [selectedManager, setSelectedManager] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Manager registration
  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');

  // Mock managers - in real app this would be in database
  const [allManagers, setAllManagers] = useState<User[]>([
    {
      id: 'manager-1',
      name: 'Yavuz',
      email: 'yavuz@thekingdom.com',
      role: 'manager',
      avatar: 'Y',
      instagramConnected: true,
      tiktokConnected: true,
      instagramUsername: '@yavuz',
      tiktokUsername: '@yavuz',
      stats: {
        neueLeads: 0,
        antworten: 0,
        offeneNachrichten: 0,
        conversionRate: 0,
      },
      joinedDate: '2024-01-15',
    },
  ]);

  // Mock team members
  const mockTeilnehmer: User[] = [
    {
      id: 'user-1',
      name: 'Büsra',
      email: 'busra@thekingdom.com',
      role: 'teilnehmer',
      avatar: 'B',
      managerId: 'manager-1',
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
      managerId: 'manager-1',
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
      managerId: 'manager-1',
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

  const handleJoinSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowJoinForm(false);
      setShowSuccess(false);
      setJoinName('');
      setJoinEmail('');
      setSelectedManager('');
    }, 2000);
  };

  const handleManagerRegister = () => {
    if (!managerName || !managerEmail) return;

    const newManager: User = {
      id: `manager-${Date.now()}`,
      name: managerName,
      email: managerEmail,
      role: 'manager',
      avatar: managerName.charAt(0).toUpperCase(),
      instagramConnected: false,
      tiktokConnected: false,
      stats: {
        neueLeads: 0,
        antworten: 0,
        offeneNachrichten: 0,
        conversionRate: 0,
      },
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setAllManagers([...allManagers, newManager]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowManagerRegister(false);
      setShowSuccess(false);
      setManagerName('');
      setManagerEmail('');
      // Auto-login as new manager
      onLogin(newManager);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative overflow-hidden transition-colors">
      {/* Background Effects - now subtle for light mode too */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src={logo} 
            alt="The Kingdom" 
            className="w-48 h-auto mx-auto mb-6" 
            style={{ filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))' }} 
          />
          <h1 className="text-foreground mb-4" style={{ textShadow: '0 0 20px rgba(212, 175, 55, 0.2)' }}>
            Social Akquise Pro
          </h1>
          <p className="text-primary text-xl">Team-basierte Instagram & TikTok Akquise</p>
        </div>

        {showManagerRegister ? (
          /* Manager Registrierung */
          <GlassCard glow className="max-w-2xl mx-auto">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield size={24} className="text-primary" />
                <h2 className="text-foreground">Neuer Manager registrieren</h2>
              </div>

              {showSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6"
                       style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}>
                    <span className="text-4xl">✓</span>
                  </div>
                  <h3 className="text-foreground mb-2">Willkommen!</h3>
                  <p className="text-muted-foreground">Dein Manager-Account wurde erstellt.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-primary mb-2 block">Name</label>
                    <Input
                      value={managerName}
                      onChange={(e) => setManagerName(e.target.value)}
                      placeholder="Dein vollständiger Name"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-primary mb-2 block">E-Mail</label>
                    <Input
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      placeholder="deine@email.com"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowManagerRegister(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Abbrechen
                    </Button>
                    <Button
                      onClick={handleManagerRegister}
                      disabled={!managerName || !managerEmail}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground"
                      style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
                    >
                      Registrieren
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        ) : showJoinForm ? (
          /* Beitrittsformular */
          <GlassCard glow className="max-w-2xl mx-auto">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <UserPlus size={24} className="text-primary" />
                <h2 className="text-foreground">Beitrittsanfrage stellen</h2>
              </div>

              {showSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6"
                       style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)' }}>
                    <span className="text-4xl">✓</span>
                  </div>
                  <h3 className="text-foreground mb-2">Anfrage gesendet!</h3>
                  <p className="text-muted-foreground">Der Manager wird deine Anfrage prüfen.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-primary mb-2 block">Manager wählen</label>
                    <select
                      value={selectedManager}
                      onChange={(e) => setSelectedManager(e.target.value)}
                      className="w-full p-3 rounded-xl border border-border bg-input-background text-foreground focus:outline-none focus:border-primary/60"
                    >
                      <option value="">Bitte wählen...</option>
                      {allManagers.map((manager) => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name} ({manager.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-primary mb-2 block">Name</label>
                    <Input
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      placeholder="Dein vollständiger Name"
                      className="rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-primary mb-2 block">E-Mail</label>
                    <Input
                      type="email"
                      value={joinEmail}
                      onChange={(e) => setJoinEmail(e.target.value)}
                      placeholder="deine@email.com"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowJoinForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Abbrechen
                    </Button>
                    <Button
                      onClick={handleJoinSubmit}
                      disabled={!joinName || !joinEmail || !selectedManager}
                      className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground"
                      style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
                    >
                      Anfrage senden
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        ) : (
          /* Login Optionen */
          <div className="grid grid-cols-2 gap-8">
            {/* Manager Login */}
            <GlassCard glow hover>
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6"
                     style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}>
                  <Shield size={36} className="text-primary-foreground" />
                </div>
                <h2 className="text-center text-xl text-foreground mb-6">Manager Login</h2>

                <div className="text-center space-y-3 mb-6">
                  <p className="text-muted-foreground">Als Manager hast du:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Zugriff auf alle Team-Mitglieder</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Performance-Übersicht</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Schulungsvideos hochladen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Beitrittsanfragen genehmigen</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto mb-6">
                  {allManagers.map((manager) => (
                    <button
                      key={manager.id}
                      onClick={() => onLogin(manager)}
                      className="w-full p-3 rounded-xl bg-card/40 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all text-left flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
                           style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>
                        {manager.avatar}
                      </div>
                      <div>
                        <p className="text-foreground text-sm group-hover:text-primary transition-colors">{manager.name}</p>
                        <p className="text-muted-foreground text-xs">{manager.email}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  onClick={() => setShowManagerRegister(true)}
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground"
                  style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
                >
                  <Shield size={18} className="mr-2" />
                  Neuer Manager
                </Button>
              </div>
            </GlassCard>

            {/* Teilnehmer Login */}
            <GlassCard glow hover>
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/80 to-primary rounded-2xl flex items-center justify-center mx-auto mb-6"
                     style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}>
                  <Users size={36} className="text-primary-foreground" />
                </div>
                <h2 className="text-center text-xl text-foreground mb-6">Teilnehmer Login</h2>

                <div className="text-center space-y-3 mb-6">
                  <p className="text-muted-foreground">Als Teilnehmer kannst du:</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Eigene Leads verwalten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Trading Journal führen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Schulungsvideos ansehen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Eigene Performance tracken</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto mb-6">
                  {mockTeilnehmer.map((teilnehmer) => (
                    <button
                      key={teilnehmer.id}
                      onClick={() => onLogin(teilnehmer)}
                      className="w-full p-3 rounded-xl bg-card/40 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all text-left flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
                           style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}>
                        {teilnehmer.avatar}
                      </div>
                      <div>
                        <p className="text-foreground text-sm group-hover:text-primary transition-colors">{teilnehmer.name}</p>
                        <p className="text-muted-foreground text-xs">{teilnehmer.email}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => setShowJoinForm(true)}
                    variant="outline"
                    className="w-full h-12 border-2 border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5"
                  >
                    <UserPlus size={18} className="mr-2" />
                    Team beitreten
                  </Button>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Footer Info */}
        {!showJoinForm && !showManagerRegister && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              💡 Dies ist eine Demo-Version. Wähle einen Account zum Testen oder registriere einen neuen Manager.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
