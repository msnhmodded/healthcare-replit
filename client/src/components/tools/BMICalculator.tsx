import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

interface BMICalculatorProps {
  onClose?: () => void;
}

export function BMICalculator({ onClose }: BMICalculatorProps) {
  const { language } = useLanguage();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters > 0 && weightInKg > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(Math.round(bmiValue * 10) / 10);
      
      if (bmiValue < 18.5) {
        setCategory(language === 'en' ? "Underweight" : "Dheeraan yar");
      } else if (bmiValue < 25) {
        setCategory(language === 'en' ? "Normal weight" : "Miisaan caadi ah");
      } else if (bmiValue < 30) {
        setCategory(language === 'en' ? "Overweight" : "Miisaan dheeraad ah");
      } else {
        setCategory(language === 'en' ? "Obese" : "Miisaan aad u badan");
      }
    }
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === 'en' ? "BMI Calculator" : "Xisaabiyaha BMI"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="height">
            {language === 'en' ? "Height (cm)" : "Dhererka (cm)"}
          </Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder={language === 'en' ? "Enter height in cm" : "Geli dhererka cm"}
          />
        </div>
        
        <div>
          <Label htmlFor="weight">
            {language === 'en' ? "Weight (kg)" : "Miisaanka (kg)"}
          </Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder={language === 'en' ? "Enter weight in kg" : "Geli miisaanka kg"}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateBMI} className="flex-1">
            {language === 'en' ? "Calculate" : "Xisaabi"}
          </Button>
          <Button onClick={reset} variant="outline">
            {language === 'en' ? "Reset" : "Dib u bilow"}
          </Button>
        </div>

        {bmi && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary mb-2">
              BMI: {bmi}
            </div>
            <div className="text-sm text-gray-700">
              {category}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              {language === 'en' 
                ? "Consult with your healthcare provider for personalized advice"
                : "La tasho takhaatiirkaaga si aad u hesho talo gaara ah"
              }
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}