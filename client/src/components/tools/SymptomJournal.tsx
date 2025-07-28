import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Trash2, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface SymptomEntry {
  id: string;
  date: string;
  time: string;
  symptom: string;
  severity: string;
  notes: string;
  duration?: string;
}

export function SymptomJournal() {
  const { language } = useLanguage();
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    symptom: "",
    severity: "mild",
    notes: "",
    duration: ""
  });

  const addEntry = () => {
    if (newEntry.symptom) {
      const entry: SymptomEntry = {
        id: Date.now().toString(),
        date: newEntry.date,
        time: newEntry.time,
        symptom: newEntry.symptom,
        severity: newEntry.severity,
        notes: newEntry.notes,
        duration: newEntry.duration
      };
      setEntries([entry, ...entries]);
      setNewEntry({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
        symptom: "",
        severity: "mild",
        notes: "",
        duration: ""
      });
    }
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      mild: { en: "Mild", so: "Fudud" },
      moderate: { en: "Moderate", so: "Dhexdhexaad" },
      severe: { en: "Severe", so: "Daran" },
      extreme: { en: "Extreme", so: "Aad u daran" }
    };
    return labels[severity as keyof typeof labels]?.[language] || severity;
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      mild: "bg-green-100 text-green-800",
      moderate: "bg-yellow-100 text-yellow-800",
      severe: "bg-orange-100 text-orange-800",
      extreme: "bg-red-100 text-red-800"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en' 
      ? date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
      : date.toLocaleDateString('so-SO', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? "Symptom Journal" : "Buugga Calaamadaha"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new entry form */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold">
            {language === 'en' ? "Record New Symptom" : "Diiwaan geli Calaamad Cusub"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">
                {language === 'en' ? "Date" : "Taariikhda"}
              </Label>
              <Input
                id="date"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="time">
                {language === 'en' ? "Time" : "Waqtiga"}
              </Label>
              <Input
                id="time"
                type="time"
                value={newEntry.time}
                onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="duration">
                {language === 'en' ? "Duration" : "Muddada"}
              </Label>
              <Input
                id="duration"
                value={newEntry.duration}
                onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                placeholder={language === 'en' ? "e.g., 2 hours" : "tusaale: 2 saac"}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="symptom">
                {language === 'en' ? "Symptom" : "Calaamadda"}
              </Label>
              <Input
                id="symptom"
                value={newEntry.symptom}
                onChange={(e) => setNewEntry({ ...newEntry, symptom: e.target.value })}
                placeholder={language === 'en' ? "e.g., Headache, Fatigue" : "tusaale: Madax xanuun, Daaal"}
              />
            </div>
            
            <div>
              <Label htmlFor="severity">
                {language === 'en' ? "Severity" : "Darajo"}
              </Label>
              <Select value={newEntry.severity} onValueChange={(value) => setNewEntry({ ...newEntry, severity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">{getSeverityLabel("mild")}</SelectItem>
                  <SelectItem value="moderate">{getSeverityLabel("moderate")}</SelectItem>
                  <SelectItem value="severe">{getSeverityLabel("severe")}</SelectItem>
                  <SelectItem value="extreme">{getSeverityLabel("extreme")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">
              {language === 'en' ? "Notes & Context" : "Qoraallo & Macluumaad dheeraad ah"}
            </Label>
            <Textarea
              id="notes"
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              placeholder={language === 'en' 
                ? "What triggered it? What helped? Any other details..."
                : "Maxaa keenay? Maxaa caawiyay? Macluumaad kale..."
              }
              rows={3}
            />
          </div>
          
          <Button onClick={addEntry} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? "Add Entry" : "Ku dar Diiwaanka"}
          </Button>
        </div>

        {/* Entries list */}
        <div className="space-y-4">
          <h3 className="font-semibold">
            {language === 'en' ? "Recent Entries" : "Diiwaannada Dhowaan"}
          </h3>
          
          {entries.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {language === 'en' 
                ? "No symptoms recorded yet. Add your first entry above."
                : "Weli lama diiwaangelin calaamadaha. Ku dar diiwaankaaga ugu horreeyay kore."
              }
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(entry.date)}</span>
                      <span>{entry.time}</span>
                      {entry.duration && (
                        <span className="text-xs">({entry.duration})</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-lg">{entry.symptom}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(entry.severity)}`}>
                    {getSeverityLabel(entry.severity)}
                  </span>
                </div>
                
                {entry.notes && (
                  <p className="text-gray-700 text-sm">{entry.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}