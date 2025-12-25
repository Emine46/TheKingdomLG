import { Instagram, CheckCircle, Settings as SettingsIcon, Bell, Database, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function Einstellungen() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-foreground">Einstellungen ⚙️</h2>
        <p className="text-muted-foreground mt-1">Verwalte deine Plattform-Verbindungen und Präferenzen</p>
      </div>

      {/* Plattform-Verbindungen */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon size={20} className="text-blue-600" />
            Plattform-Verbindungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Instagram */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-foreground mb-1">Instagram</p>
                  <p className="text-muted-foreground text-sm">Verbunden als @dein_account</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={18} />
                  <span className="text-sm">Verbunden</span>
                </div>
                <Button variant="outline" size="sm">
                  Trennen
                </Button>
              </div>
            </div>
          </div>

          {/* TikTok */}
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 flex items-center justify-center">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <p className="text-foreground mb-1">TikTok</p>
                  <p className="text-muted-foreground text-sm">Nicht verbunden</p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                Verbinden
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zielgruppen-Voreinstellungen */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database size={20} className="text-purple-600" />
            Zielgruppen-Voreinstellungen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="default-interests">Standard-Interessensgebiete</Label>
              <Input
                id="default-interests"
                placeholder="z.B. Business, Marketing, Entrepreneurship"
                className="mt-2 rounded-xl border-slate-200"
              />
            </div>

            <div>
              <Label htmlFor="min-followers">Minimale Follower-Anzahl</Label>
              <Input
                id="min-followers"
                type="number"
                placeholder="1000"
                className="mt-2 rounded-xl border-slate-200"
              />
            </div>

            <div>
              <Label htmlFor="min-engagement">Minimales Engagement-Level (%)</Label>
              <Input
                id="min-engagement"
                type="number"
                placeholder="50"
                className="mt-2 rounded-xl border-slate-200"
              />
            </div>
          </div>

          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            Einstellungen speichern
          </Button>
        </CardContent>
      </Card>

      {/* Nachrichtenvorlagen */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} className="text-blue-600" />
            Benachrichtigungen & Automatisierung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <p className="text-foreground mb-1">Benachrichtigung bei neuen Antworten</p>
              <p className="text-muted-foreground text-sm">Erhalte Push-Benachrichtigungen für neue Nachrichten</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <p className="text-foreground mb-1">Täglicher Lead-Report</p>
              <p className="text-muted-foreground text-sm">Täglich um 9:00 Uhr eine Zusammenfassung erhalten</p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <p className="text-foreground mb-1">Follow-up Erinnerungen</p>
              <p className="text-muted-foreground text-sm">Erinnere mich, wenn ich nachfassen sollte</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <p className="text-foreground mb-1">Auto-Analyse neuer Follower</p>
              <p className="text-muted-foreground text-sm">Neue Follower automatisch als potenzielle Leads analysieren</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Datenschutz */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock size={20} className="text-slate-600" />
            Datenschutz & Sicherheit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 mb-3">
              🔒 <strong>Deine Daten sind sicher:</strong> Alle Informationen werden verschlüsselt gespeichert und niemals
              mit Dritten geteilt.
            </p>
            <p className="text-sm text-blue-800">
              Diese Anwendung ist nicht für das Sammeln von personenbezogenen Daten (PII) oder sensiblen Informationen
              gedacht.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              Daten exportieren
            </Button>
            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
              Alle Daten löschen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}