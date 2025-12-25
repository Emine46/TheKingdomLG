import { useState } from 'react';
import { BookOpen, Plus, Calendar, TrendingUp, TrendingDown, Target, Smile, Meh, Frown, CheckCircle, XCircle, Clock, Trash2, Edit, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { User } from '../App';

interface TradingJournalProps {
  currentUser: User;
}

interface Trade {
  asset: string;
  type: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  result: 'success' | 'pending' | 'failed';
  notes: string;
  profitLoss?: number;
}

interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  trades: Trade[];
  mood: 'happy' | 'neutral' | 'sad';
  learnings: string;
  goalsForTomorrow: string;
  totalProfitLoss: number;
}

const mockEntries: JournalEntry[] = [
  {
    id: '1',
    userId: 'manager-1',
    date: '2024-01-10',
    trades: [
      {
        asset: 'AAPL',
        type: 'buy',
        quantity: 10,
        entryPrice: 150.00,
        exitPrice: 155.50,
        result: 'success',
        notes: 'Starke Quartalszahlen, guter Zeitpunkt für Entry',
        profitLoss: 55.00,
      },
      {
        asset: 'TSLA',
        type: 'sell',
        quantity: 5,
        entryPrice: 200.00,
        exitPrice: 195.00,
        result: 'failed',
        notes: 'Zu früh ausgestiegen, Markt hat sich erholt',
        profitLoss: -25.00,
      },
    ],
    mood: 'neutral',
    learnings: 'Geduld ist wichtig - nicht zu früh aussteigen bei kurzfristigen Schwankungen',
    goalsForTomorrow: 'Neue Tech-Aktien analysieren und Watchlist erstellen',
    totalProfitLoss: 30.00,
  },
];

const moodIcons = {
  happy: { icon: Smile, color: 'text-green-500', label: 'Gut' },
  neutral: { icon: Meh, color: 'text-primary', label: 'Neutral' },
  sad: { icon: Frown, color: 'text-red-500', label: 'Schlecht' },
};

const resultIcons = {
  success: { icon: CheckCircle, color: 'text-green-500', label: 'Gewinn' },
  pending: { icon: Clock, color: 'text-primary', label: 'Offen' },
  failed: { icon: XCircle, color: 'text-red-500', label: 'Verlust' },
};

export function TradingJournal({ currentUser }: TradingJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>(
    mockEntries.filter(e => e.userId === currentUser.id)
  );
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    learnings: '',
    goalsForTomorrow: '',
  });

  const [trades, setTrades] = useState<Trade[]>([
    {
      asset: '',
      type: 'buy' as const,
      quantity: 0,
      entryPrice: 0,
      exitPrice: undefined,
      result: 'pending' as const,
      notes: '',
      profitLoss: 0,
    },
  ]);

  const handleAddTrade = () => {
    setTrades([
      ...trades,
      {
        asset: '',
        type: 'buy' as const,
        quantity: 0,
        entryPrice: 0,
        exitPrice: undefined,
        result: 'pending' as const,
        notes: '',
        profitLoss: 0,
      },
    ]);
  };

  const handleRemoveTrade = (index: number) => {
    setTrades(trades.filter((_, i) => i !== index));
  };

  const handleUpdateTrade = (index: number, field: string, value: any) => {
    const newTrades = [...trades];
    newTrades[index] = { ...newTrades[index], [field]: value };
    
    // Calculate profit/loss if both prices are available
    if (field === 'entryPrice' || field === 'exitPrice' || field === 'quantity') {
      const trade = newTrades[index];
      if (trade.exitPrice && trade.entryPrice && trade.quantity) {
        const diff = trade.type === 'buy' 
          ? trade.exitPrice - trade.entryPrice 
          : trade.entryPrice - trade.exitPrice;
        trade.profitLoss = diff * trade.quantity;
        trade.result = trade.profitLoss >= 0 ? 'success' : 'failed';
      }
    }
    
    setTrades(newTrades);
  };

  const handleSaveEntry = () => {
    const totalProfitLoss = trades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      userId: currentUser.id,
      date: newEntry.date,
      trades: trades,
      mood: newEntry.mood as 'happy' | 'neutral' | 'sad',
      learnings: newEntry.learnings,
      goalsForTomorrow: newEntry.goalsForTomorrow,
      totalProfitLoss,
    };

    setEntries([entry, ...entries]);
    setIsNewEntryDialogOpen(false);
    
    // Reset form
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mood: 'neutral',
      learnings: '',
      goalsForTomorrow: '',
    });
    setTrades([
      {
        asset: '',
        type: 'buy',
        quantity: 0,
        entryPrice: 0,
        exitPrice: undefined,
        result: 'pending',
        notes: '',
        profitLoss: 0,
      },
    ]);
  };

  const totalStats = {
    totalTrades: entries.reduce((sum, e) => sum + e.trades.length, 0),
    successfulTrades: entries.reduce(
      (sum, e) => sum + e.trades.filter(t => t.result === 'success').length,
      0
    ),
    totalProfit: entries.reduce((sum, e) => sum + e.totalProfitLoss, 0),
  };

  const winRate = totalStats.totalTrades > 0 
    ? Math.round((totalStats.successfulTrades / totalStats.totalTrades) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={32} className="text-primary" />
            <h2 className="text-foreground">Trading Journal</h2>
          </div>
          <p className="text-muted-foreground">
            Dokumentiere deine Börsen-Trades und analysiere deine Performance
          </p>
        </div>
        <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              Neuer Eintrag
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Neuer Trading-Eintrag</DialogTitle>
              <DialogDescription>
                Dokumentiere deine heutigen Trades und Erkenntnisse
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Date and Mood */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Datum</Label>
                  <Input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Stimmung</Label>
                  <Select
                    value={newEntry.mood}
                    onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="happy">😊 Gut</SelectItem>
                      <SelectItem value="neutral">😐 Neutral</SelectItem>
                      <SelectItem value="sad">😔 Schlecht</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Trades */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Trades des Tages</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddTrade}>
                    <Plus size={16} className="mr-2" />
                    Trade hinzufügen
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {trades.map((trade, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Asset (z.B. AAPL, BTC)</Label>
                              <Input
                                placeholder="z.B. AAPL"
                                value={trade.asset}
                                onChange={(e) => handleUpdateTrade(index, 'asset', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Typ</Label>
                              <Select
                                value={trade.type}
                                onValueChange={(value) => handleUpdateTrade(index, 'type', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="buy">Kauf (Long)</SelectItem>
                                  <SelectItem value="sell">Verkauf (Short)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <Label className="text-xs">Menge</Label>
                              <Input
                                type="number"
                                placeholder="0"
                                value={trade.quantity || ''}
                                onChange={(e) => handleUpdateTrade(index, 'quantity', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Einstiegspreis ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={trade.entryPrice || ''}
                                onChange={(e) => handleUpdateTrade(index, 'entryPrice', parseFloat(e.target.value) || 0)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Ausstiegspreis ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={trade.exitPrice || ''}
                                onChange={(e) => handleUpdateTrade(index, 'exitPrice', parseFloat(e.target.value) || undefined)}
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs">Notizen</Label>
                            <Textarea
                              placeholder="Strategie, Grund für Entry/Exit, Learnings..."
                              value={trade.notes}
                              onChange={(e) => handleUpdateTrade(index, 'notes', e.target.value)}
                              rows={2}
                            />
                          </div>

                          {trade.profitLoss !== undefined && trade.profitLoss !== 0 && (
                            <div className={`p-2 rounded-lg ${trade.profitLoss >= 0 ? 'bg-green-50 border border-green-200 dark:bg-green-500/10 dark:border-green-500/20' : 'bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20'}`}>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {trade.profitLoss >= 0 ? 'Gewinn' : 'Verlust'}:
                                </span>
                                <span className={`font-bold ${trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)} $
                                </span>
                              </div>
                            </div>
                          )}

                          {trades.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveTrade(index)}
                              className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Trade entfernen
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Learnings & Goals */}
              <div>
                <Label>Was habe ich heute gelernt?</Label>
                <Textarea
                  placeholder="Erkenntnisse, Fehler, Verbesserungen..."
                  value={newEntry.learnings}
                  onChange={(e) => setNewEntry({ ...newEntry, learnings: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label>Ziele für morgen</Label>
                <Textarea
                  placeholder="Trading-Ziele, Analysen, Strategien..."
                  value={newEntry.goalsForTomorrow}
                  onChange={(e) => setNewEntry({ ...newEntry, goalsForTomorrow: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveEntry} className="w-full bg-primary hover:bg-primary/90">
                Eintrag speichern
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Gesamt Trades</p>
                <p className="text-3xl font-bold text-foreground">{totalStats.totalTrades}</p>
              </div>
              <BarChart3 size={32} className="text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Win Rate</p>
                <p className="text-3xl font-bold text-foreground">{winRate}%</p>
              </div>
              <Target size={32} className="text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Erfolgreiche Trades</p>
                <p className="text-3xl font-bold text-green-600">{totalStats.successfulTrades}</p>
              </div>
              <TrendingUp size={32} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Gesamt P&L</p>
                <p className={`text-3xl font-bold ${totalStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalStats.totalProfit >= 0 ? '+' : ''}{totalStats.totalProfit.toFixed(2)} $
                </p>
              </div>
              <DollarSign size={32} className={totalStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-foreground mb-2">Noch keine Einträge vorhanden</p>
              <p className="text-muted-foreground text-sm mb-4">
                Starte dein erstes Trading Journal und dokumentiere deine Trades
              </p>
              <Button onClick={() => setIsNewEntryDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus size={18} className="mr-2" />
                Ersten Eintrag erstellen
              </Button>
            </CardContent>
          </Card>
        ) : (
          entries.map((entry) => {
            const MoodIcon = moodIcons[entry.mood].icon;
            
            return (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-primary" />
                      <div>
                        <CardTitle>{new Date(entry.date).toLocaleDateString('de-DE', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MoodIcon size={16} className={moodIcons[entry.mood].color} />
                          <span>Stimmung: {moodIcons[entry.mood].label}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${entry.totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {entry.totalProfitLoss >= 0 ? '+' : ''}{entry.totalProfitLoss.toFixed(2)} $
                      </div>
                      <p className="text-sm text-muted-foreground">{entry.trades.length} Trades</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Trades */}
                  <div className="space-y-3 mb-4">
                    {entry.trades.map((trade, idx) => {
                      const ResultIcon = resultIcons[trade.result].icon;
                      
                      return (
                        <div key={idx} className="p-4 rounded-xl bg-muted border border-border">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${trade.type === 'buy' ? 'bg-green-100 dark:bg-green-500/10' : 'bg-red-100 dark:bg-red-500/10'}`}>
                                {trade.type === 'buy' ? (
                                  <TrendingUp size={16} className="text-green-600" />
                                ) : (
                                  <TrendingDown size={16} className="text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{trade.asset}</p>
                                <p className="text-sm text-muted-foreground">
                                  {trade.type === 'buy' ? 'Kauf' : 'Verkauf'} • {trade.quantity} Stück
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <ResultIcon size={16} className={resultIcons[trade.result].color} />
                                <span className="text-sm">{resultIcons[trade.result].label}</span>
                              </div>
                              {trade.profitLoss !== undefined && (
                                <p className={`font-bold ${trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {trade.profitLoss >= 0 ? '+' : ''}{trade.profitLoss.toFixed(2)} $
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div className="text-muted-foreground">
                              Entry: <span className="text-foreground font-medium">{trade.entryPrice.toFixed(2)} $</span>
                            </div>
                            {trade.exitPrice && (
                              <div className="text-muted-foreground">
                                Exit: <span className="text-foreground font-medium">{trade.exitPrice.toFixed(2)} $</span>
                              </div>
                            )}
                          </div>
                          
                          {trade.notes && (
                            <p className="text-sm text-muted-foreground border-t border-border pt-2 mt-2">
                              {trade.notes}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Learnings & Goals */}
                  {(entry.learnings || entry.goalsForTomorrow) && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      {entry.learnings && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">💡 Learnings:</p>
                          <p className="text-sm text-muted-foreground">{entry.learnings}</p>
                        </div>
                      )}
                      {entry.goalsForTomorrow && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">🎯 Ziele:</p>
                          <p className="text-sm text-muted-foreground">{entry.goalsForTomorrow}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
