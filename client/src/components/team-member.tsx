import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { TeamMember } from "@shared/schema";
import { useLanguage } from "@/hooks/use-language";
import { getTranslationContent } from "@/lib/i18n";

interface TeamMemberProps {
  member: TeamMember;
  onContact: (memberId: string) => void;
}

export function TeamMemberCard({ member, onContact }: TeamMemberProps) {
  const { language } = useLanguage();

  return (
    <Card className="bg-gray-50 hover:shadow-lg transition-shadow hover-lift animate-fade-in">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <img 
            src={member.photoUrl || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400`}
            alt={member.name}
            className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
          />
        </div>
        <h3 className="text-lg font-bold text-charcoal mb-2">{member.name}</h3>
        <p className="font-semibold mb-3" style={{
          color: member.order === 1 ? 'hsl(var(--primary))' : 
                member.order === 2 ? 'hsl(var(--secondary))' : 
                member.order === 3 ? 'hsl(var(--accent))' : 
                'hsl(var(--warning))'
        }}>
          {getTranslationContent(member.role as any, language)}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          {getTranslationContent(member.description as any, language)}
        </p>
        {member.email && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onContact(member.id)}
            className="text-primary hover:text-primary/80 hover-glow transition-all duration-300"
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
