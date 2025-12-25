import { Home, Target, Users, Inbox, Settings, LogOut, Shield, BarChart3, UserCog, GraduationCap, Moon, Sun, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import logo from 'figma:asset/b146160891c72adfff38db8599fe605b1ee80509.png';
import type { Page, User } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  currentUser: User;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, currentUser, onLogout }: NavigationProps) {
  const isManager = currentUser.role === 'manager';
  const { theme, toggleTheme } = useTheme();

  const managerMenuItems = [
    { id: 'dashboard' as Page, label: 'Übersicht', icon: Home },
    { id: 'team' as Page, label: 'Team', icon: UserCog },
    { id: 'performance' as Page, label: 'Performance', icon: BarChart3 },
    { id: 'schulungen' as Page, label: 'Schulungen', icon: GraduationCap },
    { id: 'analyse' as Page, label: 'Analyse', icon: Target },
    { id: 'leads' as Page, label: 'Leads', icon: Users },
    { id: 'inbox' as Page, label: 'Inbox', icon: Inbox },
    { id: 'journal' as Page, label: 'Trading Journal', icon: TrendingUp },
    { id: 'einstellungen' as Page, label: 'Einstellungen', icon: Settings },
  ];

  const teilnehmerMenuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Home },
    { id: 'schulungen' as Page, label: 'Schulungen', icon: GraduationCap },
    { id: 'analyse' as Page, label: 'Analyse', icon: Target },
    { id: 'leads' as Page, label: 'Leads', icon: Users },
    { id: 'inbox' as Page, label: 'Inbox', icon: Inbox },
    { id: 'journal' as Page, label: 'Trading Journal', icon: TrendingUp },
    { id: 'einstellungen' as Page, label: 'Einstellungen', icon: Settings },
  ];

  const menuItems = isManager ? managerMenuItems : teilnehmerMenuItems;

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 flex flex-col transition-colors overflow-visible">
      {/* Logo */}
      <div className="mb-10">
        <img 
          src={logo} 
          alt="The Kingdom" 
          className="w-32 h-auto mb-3" 
          style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))' }} 
        />
        <p className="text-foreground text-xs tracking-wider uppercase">Social Akquise Pro</p>
      </div>

      {/* User Info */}
      <div className="mb-8 p-4 rounded-xl relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.15)' }} />
        
        <div className="relative flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
            isManager ? 'from-primary to-primary/80' : 'from-primary/80 to-primary'
          } flex items-center justify-center text-black flex-shrink-0 font-bold text-lg`}
               style={{ boxShadow: '0 0 25px rgba(212, 175, 55, 0.6)' }}>
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-sm truncate font-medium">{currentUser.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-primary">
              {isManager && <Shield size={11} />}
              <span>{isManager ? 'Manager' : 'Teilnehmer'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1.5 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                isActive
                  ? 'text-black font-bold'
                  : 'text-foreground hover:text-primary font-medium'
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
                       style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)' }} />
                  <div className="absolute inset-0 opacity-40"
                       style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 70%)' }} />
                </>
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' }} />
              )}
              <Icon size={18} className="relative z-10" strokeWidth={2.5} />
              <span className="text-sm relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Theme Toggle & Logout */}
      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <Button
          onClick={toggleTheme}
          variant="outline"
          className="w-full justify-start text-muted-foreground hover:text-primary border-border hover:border-primary/40 hover:bg-primary/5 transition-all h-11"
        >
          {theme === 'light' ? (
            <>
              <Moon size={18} className="mr-3" strokeWidth={2.5} />
              <span className="font-medium">Dunkel</span>
            </>
          ) : (
            <>
              <Sun size={18} className="mr-3" strokeWidth={2.5} />
              <span className="font-medium">Hell</span>
            </>
          )}
        </Button>
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start text-muted-foreground hover:text-destructive border-border hover:border-destructive/40 hover:bg-destructive/5 transition-all h-11"
        >
          <LogOut size={18} className="mr-3" strokeWidth={2.5} />
          <span className="font-medium">Abmelden</span>
        </Button>
      </div>
    </nav>
  );
}