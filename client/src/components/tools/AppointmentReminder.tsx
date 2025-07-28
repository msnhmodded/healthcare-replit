import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Trash2, Plus, Bell } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  location: string;
  notes: string;
  reminderSet: boolean;
}

export function AppointmentReminder() {
  const { language } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    doctor: "",
    type: "checkup",
    location: "",
    notes: "",
    reminderSet: false
  });

  const addAppointment = () => {
    if (newAppointment.date && newAppointment.time && newAppointment.doctor) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        date: newAppointment.date,
        time: newAppointment.time,
        doctor: newAppointment.doctor,
        type: newAppointment.type,
        location: newAppointment.location,
        notes: newAppointment.notes,
        reminderSet: newAppointment.reminderSet
      };
      setAppointments([...appointments, appointment].sort((a, b) => 
        new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()
      ));
      setNewAppointment({
        date: "",
        time: "",
        doctor: "",
        type: "checkup",
        location: "",
        notes: "",
        reminderSet: false
      });
    }
  };

  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const toggleReminder = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, reminderSet: !apt.reminderSet } : apt
    ));
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      checkup: { en: "Regular Checkup", so: "Baaris Caadi ah" },
      specialist: { en: "Specialist Visit", so: "Takhaasus Socdaal" },
      followup: { en: "Follow-up", so: "Raadraac" },
      emergency: { en: "Emergency", so: "Degdeg" },
      screening: { en: "Screening", so: "Baaritaan" },
      vaccination: { en: "Vaccination", so: "Tallaal" }
    };
    return labels[type as keyof typeof labels]?.[language] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en' 
      ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('so-SO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isUpcoming = (date: string, time: string) => {
    const appointmentDateTime = new Date(date + ' ' + time);
    return appointmentDateTime > new Date();
  };

  const upcomingAppointments = appointments.filter(apt => isUpcoming(apt.date, apt.time));
  const pastAppointments = appointments.filter(apt => !isUpcoming(apt.date, apt.time));

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? "Appointment Reminder" : "Xusuusinta Ballaanta"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new appointment form */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold">
            {language === 'en' ? "Schedule New Appointment" : "Jadwal Ballaan Cusub"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">
                {language === 'en' ? "Date" : "Taariikhda"}
              </Label>
              <Input
                id="date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="time">
                {language === 'en' ? "Time" : "Waqtiga"}
              </Label>
              <Input
                id="time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="type">
                {language === 'en' ? "Appointment Type" : "Nooca Ballaanta"}
              </Label>
              <Select value={newAppointment.type} onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkup">{getTypeLabel("checkup")}</SelectItem>
                  <SelectItem value="specialist">{getTypeLabel("specialist")}</SelectItem>
                  <SelectItem value="followup">{getTypeLabel("followup")}</SelectItem>
                  <SelectItem value="screening">{getTypeLabel("screening")}</SelectItem>
                  <SelectItem value="vaccination">{getTypeLabel("vaccination")}</SelectItem>
                  <SelectItem value="emergency">{getTypeLabel("emergency")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctor">
                {language === 'en' ? "Doctor/Provider" : "Takhaatiir/Bixiye"}
              </Label>
              <Input
                id="doctor"
                value={newAppointment.doctor}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                placeholder={language === 'en' ? "Dr. Smith" : "Dr. Ahmed"}
              />
            </div>
            
            <div>
              <Label htmlFor="location">
                {language === 'en' ? "Location/Clinic" : "Goobta/Cisbitaalka"}
              </Label>
              <Input
                id="location"
                value={newAppointment.location}
                onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                placeholder={language === 'en' ? "Toronto General Hospital" : "Cisbitaalka Guud ee Toronto"}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">
              {language === 'en' ? "Notes & Preparation" : "Qoraallo iyo Diyaargarow"}
            </Label>
            <Textarea
              id="notes"
              value={newAppointment.notes}
              onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
              placeholder={language === 'en' 
                ? "Bring medication list, insurance card, questions to ask..."
                : "Keena liiska daawooyinka, kaardka caymiska, su'aalaha aad weydiin lahayd..."
              }
              rows={3}
            />
          </div>
          
          <Button onClick={addAppointment} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? "Add Appointment" : "Ku dar Ballaanta"}
          </Button>
        </div>

        {/* Upcoming appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-green-700">
              {language === 'en' ? "Upcoming Appointments" : "Ballaannada Soo socda"}
            </h3>
            
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-lg">{apt.doctor}</h4>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {getTypeLabel(apt.type)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(apt.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                    
                    {apt.location && (
                      <div className="text-sm text-gray-600 mb-2">
                        📍 {apt.location}
                      </div>
                    )}
                    
                    {apt.notes && (
                      <div className="text-sm text-gray-700 bg-white p-2 rounded border">
                        {apt.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReminder(apt.id)}
                      className={apt.reminderSet ? "text-blue-600" : "text-gray-400"}
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAppointment(apt.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past appointments */}
        {pastAppointments.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-600">
              {language === 'en' ? "Past Appointments" : "Ballaannada Hore"}
            </h3>
            
            {pastAppointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-medium">{apt.doctor}</span>
                      <span className="text-xs text-gray-500">
                        {getTypeLabel(apt.type)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(apt.date)} at {apt.time}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAppointment(apt.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {appointments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {language === 'en' 
              ? "No appointments scheduled. Add your first appointment above."
              : "Weli lama jadwalin ballaan. Ku dar ballaantaada ugu horreysa kore."
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
}