import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notes?: string;
}

export function MedicationTracker() {
  const { language } = useLanguage();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "daily",
    time: "",
    notes: ""
  });

  const addMedication = () => {
    if (newMed.name && newMed.dosage && newMed.time) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMed.name,
        dosage: newMed.dosage,
        frequency: newMed.frequency,
        time: newMed.time,
        notes: newMed.notes
      };
      setMedications([...medications, medication]);
      setNewMed({ name: "", dosage: "", frequency: "daily", time: "", notes: "" });
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const getFrequencyLabel = (freq: string) => {
    const labels = {
      daily: { en: "Daily", so: "Maalin kasta" },
      twice: { en: "Twice daily", so: "Laba mar maalinti" },
      three: { en: "Three times daily", so: "Saddex mar maalinti" },
      weekly: { en: "Weekly", so: "Usbuuc kasta" },
      asNeeded: { en: "As needed", so: "Marka loo baahdo" }
    };
    return labels[freq as keyof typeof labels]?.[language] || freq;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? "Medication Tracker" : "Raadraaca Daawooyinka"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new medication form */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">
            {language === 'en' ? "Add New Medication" : "Ku dar Dawo Cusub"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label htmlFor="medName">
                {language === 'en' ? "Medication Name" : "Magaca Dawada"}
              </Label>
              <Input
                id="medName"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                placeholder={language === 'en' ? "e.g., Metformin" : "tusaale: Metformin"}
              />
            </div>
            
            <div>
              <Label htmlFor="dosage">
                {language === 'en' ? "Dosage" : "Qadarka"}
              </Label>
              <Input
                id="dosage"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                placeholder={language === 'en' ? "e.g., 500mg" : "tusaale: 500mg"}
              />
            </div>
            
            <div>
              <Label htmlFor="frequency">
                {language === 'en' ? "Frequency" : "Inta jeer"}
              </Label>
              <Select value={newMed.frequency} onValueChange={(value) => setNewMed({ ...newMed, frequency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{getFrequencyLabel("daily")}</SelectItem>
                  <SelectItem value="twice">{getFrequencyLabel("twice")}</SelectItem>
                  <SelectItem value="three">{getFrequencyLabel("three")}</SelectItem>
                  <SelectItem value="weekly">{getFrequencyLabel("weekly")}</SelectItem>
                  <SelectItem value="asNeeded">{getFrequencyLabel("asNeeded")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time">
                {language === 'en' ? "Time" : "Waqtiga"}
              </Label>
              <Input
                id="time"
                type="time"
                value={newMed.time}
                onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">
              {language === 'en' ? "Notes (optional)" : "Qoraallo (ikhtiyaari)"}
            </Label>
            <Input
              id="notes"
              value={newMed.notes}
              onChange={(e) => setNewMed({ ...newMed, notes: e.target.value })}
              placeholder={language === 'en' ? "Take with food, etc." : "Cunto la cun, iwm."}
            />
          </div>
          
          <Button onClick={addMedication} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? "Add Medication" : "Ku dar Dawada"}
          </Button>
        </div>

        {/* Medications list */}
        <div className="space-y-3">
          <h3 className="font-semibold">
            {language === 'en' ? "Your Medications" : "Daawooyinkaaga"}
          </h3>
          
          {medications.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {language === 'en' 
                ? "No medications added yet. Add your first medication above."
                : "Weli lama darin daawooyin. Ku dar dawadaada ugu horreysa kore."
              }
            </div>
          ) : (
            medications.map((med) => (
              <div key={med.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{med.name}</span>
                    <span className="text-sm text-gray-600">({med.dosage})</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{getFrequencyLabel(med.frequency)}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{med.time}</span>
                    </div>
                  </div>
                  {med.notes && (
                    <div className="text-xs text-gray-500 mt-1">{med.notes}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMedication(med.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}