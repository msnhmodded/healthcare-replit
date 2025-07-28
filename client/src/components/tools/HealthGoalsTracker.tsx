import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Target, Trash2, Plus, CheckCircle, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface HealthGoal {
  id: string;
  title: string;
  description: string;
  category: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  targetDate: string;
  createdDate: string;
  completed: boolean;
}

export function HealthGoalsTracker() {
  const { language } = useLanguage();
  const [goals, setGoals] = useState<HealthGoal[]>([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "fitness",
    targetValue: 0,
    currentValue: 0,
    unit: "",
    targetDate: ""
  });

  const addGoal = () => {
    if (newGoal.title && newGoal.targetValue > 0 && newGoal.targetDate) {
      const goal: HealthGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        targetValue: newGoal.targetValue,
        currentValue: newGoal.currentValue,
        unit: newGoal.unit,
        targetDate: newGoal.targetDate,
        createdDate: new Date().toISOString().split('T')[0],
        completed: false
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: "",
        description: "",
        category: "fitness",
        targetValue: 0,
        currentValue: 0,
        unit: "",
        targetDate: ""
      });
    }
  };

  const updateProgress = (id: string, newValue: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const completed = newValue >= goal.targetValue;
        return { ...goal, currentValue: newValue, completed };
      }
      return goal;
    }));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      fitness: { en: "Fitness", so: "Jimicsi" },
      nutrition: { en: "Nutrition", so: "Nafaqo" },
      weight: { en: "Weight Management", so: "Maaraynta Miisaanka" },
      mental: { en: "Mental Health", so: "Caafimaadka Maskaxda" },
      medical: { en: "Medical", so: "Caafimaad" },
      habits: { en: "Healthy Habits", so: "Caadooyin Caafimaad leh" }
    };
    return labels[category as keyof typeof labels]?.[language] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      fitness: "bg-blue-100 text-blue-800",
      nutrition: "bg-green-100 text-green-800",
      weight: "bg-purple-100 text-purple-800",
      mental: "bg-pink-100 text-pink-800",
      medical: "bg-red-100 text-red-800",
      habits: "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'en' 
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : date.toLocaleDateString('so-SO', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? "Health Goals Tracker" : "Raadraaca Yoolalka Caafimaadka"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new goal form */}
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="font-semibold">
            {language === 'en' ? "Set New Health Goal" : "Dhig Yool Caafimaad Cusub"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">
                {language === 'en' ? "Goal Title" : "Magaca Yoolka"}
              </Label>
              <Input
                id="title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder={language === 'en' ? "e.g., Walk 10,000 steps daily" : "tusaale: 10,000 tallaaboyin maalinti"}
              />
            </div>
            
            <div>
              <Label htmlFor="category">
                {language === 'en' ? "Category" : "Qaybta"}
              </Label>
              <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fitness">{getCategoryLabel("fitness")}</SelectItem>
                  <SelectItem value="nutrition">{getCategoryLabel("nutrition")}</SelectItem>
                  <SelectItem value="weight">{getCategoryLabel("weight")}</SelectItem>
                  <SelectItem value="mental">{getCategoryLabel("mental")}</SelectItem>
                  <SelectItem value="medical">{getCategoryLabel("medical")}</SelectItem>
                  <SelectItem value="habits">{getCategoryLabel("habits")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">
              {language === 'en' ? "Description" : "Sharaxaad"}
            </Label>
            <Textarea
              id="description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder={language === 'en' 
                ? "Why is this goal important to you?"
                : "Maxaa yoolkaan kuu muhiim u ah?"
              }
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="currentValue">
                {language === 'en' ? "Current Value" : "Qiimaha Hadda"}
              </Label>
              <Input
                id="currentValue"
                type="number"
                value={newGoal.currentValue}
                onChange={(e) => setNewGoal({ ...newGoal, currentValue: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            
            <div>
              <Label htmlFor="targetValue">
                {language === 'en' ? "Target Value" : "Qiimaha Ujeeddada"}
              </Label>
              <Input
                id="targetValue"
                type="number"
                value={newGoal.targetValue}
                onChange={(e) => setNewGoal({ ...newGoal, targetValue: parseFloat(e.target.value) || 0 })}
                placeholder="100"
              />
            </div>
            
            <div>
              <Label htmlFor="unit">
                {language === 'en' ? "Unit" : "Culeyska"}
              </Label>
              <Input
                id="unit"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                placeholder={language === 'en' ? "steps, kg, minutes" : "tallaabooyin, kg, daqiiqado"}
              />
            </div>
            
            <div>
              <Label htmlFor="targetDate">
                {language === 'en' ? "Target Date" : "Taariikhda Ujeeddada"}
              </Label>
              <Input
                id="targetDate"
                type="date"
                value={newGoal.targetDate}
                onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              />
            </div>
          </div>
          
          <Button onClick={addGoal} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? "Add Goal" : "Ku dar Yoolka"}
          </Button>
        </div>

        {/* Active goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">
              {language === 'en' ? "Active Goals" : "Yoolalka Firfircoon"}
            </h3>
            
            {activeGoals.map((goal) => {
              const progress = Math.min((goal.currentValue / goal.targetValue) * 100, 100);
              const daysRemaining = getDaysRemaining(goal.targetDate);
              
              return (
                <div key={goal.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{goal.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(goal.category)}`}>
                          {getCategoryLabel(goal.category)}
                        </span>
                      </div>
                      
                      {goal.description && (
                        <p className="text-gray-700 text-sm mb-3">{goal.description}</p>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                          <span className="font-semibold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {language === 'en' ? "Target: " : "Ujeeddo: "}
                            {formatDate(goal.targetDate)}
                          </span>
                        </div>
                        <span>
                          {daysRemaining > 0 
                            ? `${daysRemaining} ${language === 'en' ? 'days left' : 'maalin dhiman'}`
                            : language === 'en' ? 'Overdue' : 'Dhammaadday'
                          }
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Input
                          type="number"
                          value={goal.currentValue}
                          onChange={(e) => updateProgress(goal.id, parseFloat(e.target.value) || 0)}
                          className="w-24 h-8 text-sm"
                        />
                        <span className="text-sm text-gray-600">{goal.unit}</span>
                        {progress >= 100 && (
                          <div className="flex items-center gap-1 text-green-600 ml-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {language === 'en' ? 'Completed!' : 'Dhammaystay!'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGoal(goal.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Completed goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-green-600">
              {language === 'en' ? "Completed Goals" : "Yoolalka la Dhammaystay"}
            </h3>
            
            {completedGoals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="border border-green-200 rounded-lg p-3 bg-green-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium">{goal.title}</span>
                      <div className="text-sm text-gray-600">
                        {goal.targetValue} {goal.unit} - {formatDate(goal.targetDate)}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGoal(goal.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {goals.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <div>
              {language === 'en' 
                ? "No health goals set yet. Create your first goal above to start your journey!"
                : "Weli lama dhigin yoolal caafimaad. Abuur yoolkaaga ugu horreeyay kore si aad u bilowdo socdaalkaaga!"
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}