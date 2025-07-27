import { 
  type User, 
  type InsertUser, 
  type Workshop, 
  type InsertWorkshop,
  type WorkshopRegistration,
  type InsertWorkshopRegistration,
  type Resource,
  type InsertResource,
  type Contact,
  type InsertContact,
  type Partner,
  type InsertPartner,
  type TeamMember,
  type InsertTeamMember
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Workshops
  getWorkshops(): Promise<Workshop[]>;
  getWorkshop(id: string): Promise<Workshop | undefined>;
  getActiveWorkshops(): Promise<Workshop[]>;
  createWorkshop(workshop: InsertWorkshop): Promise<Workshop>;
  updateWorkshop(id: string, workshop: Partial<InsertWorkshop>): Promise<Workshop | undefined>;
  incrementWorkshopAttendees(id: string): Promise<void>;

  // Workshop Registrations
  createWorkshopRegistration(registration: InsertWorkshopRegistration): Promise<WorkshopRegistration>;
  getWorkshopRegistrations(workshopId: string): Promise<WorkshopRegistration[]>;

  // Resources
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getActiveResources(): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  markContactAsRead(id: string): Promise<void>;

  // Partners
  getPartners(): Promise<Partner[]>;
  getActivePartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;

  // Team Members
  getTeamMembers(): Promise<TeamMember[]>;
  getActiveTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private workshops: Map<string, Workshop>;
  private workshopRegistrations: Map<string, WorkshopRegistration>;
  private resources: Map<string, Resource>;
  private contacts: Map<string, Contact>;
  private partners: Map<string, Partner>;
  private teamMembers: Map<string, TeamMember>;

  constructor() {
    this.users = new Map();
    this.workshops = new Map();
    this.workshopRegistrations = new Map();
    this.resources = new Map();
    this.contacts = new Map();
    this.partners = new Map();
    this.teamMembers = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed workshops
    const workshops: Workshop[] = [
      {
        id: "1",
        title: { en: "Diabetes Management for Families", so: "Maaraynta Sonkorowga Qoysaska" },
        description: { 
          en: "Learn practical strategies for managing diabetes while maintaining traditional dietary practices",
          so: "Baro xeeladaha wax ku ool ah ee maaraynta sonkorowga halka aad ku dhawrayso dhaqanka cuntada dhaqameedka"
        },
        category: "chronic-disease",
        date: new Date("2025-08-15T19:00:00"),
        endDate: new Date("2025-08-15T21:00:00"),
        location: "Abu Hurairah Centre",
        maxAttendees: 30,
        currentAttendees: 12,
        isActive: true,
        facilitator: "Dr. Amina Hassan",
        createdAt: new Date()
      },
      {
        id: "2",
        title: { en: "Women's Health Discussion Circle", so: "Goobta Wadahadalka Caafimaadka Haweenka" },
        description: { 
          en: "Safe space for women to discuss health concerns with cultural sensitivity",
          so: "Meel ammaan ah oo haweenku ku wadahadlaan arrimaha caafimaadka iyagoo tixgaliyay dhaqanka"
        },
        category: "mental-health",
        date: new Date("2025-08-17T18:30:00"),
        endDate: new Date("2025-08-17T20:30:00"),
        location: "Khalid bin Waleed Centre",
        maxAttendees: 25,
        currentAttendees: 8,
        isActive: true,
        facilitator: "Fadumo Ali, RN",
        createdAt: new Date()
      }
    ];

    workshops.forEach(workshop => this.workshops.set(workshop.id, workshop));

    // Seed resources
    const resources: Resource[] = [
      {
        id: "1",
        title: { en: "Diabetes Management Guide", so: "Hagaha Maaraynta Sonkorowga" },
        description: { 
          en: "Comprehensive guide for managing diabetes in Somali families",
          so: "Hage shaafici ah oo loogu talagalay maaraynta sonkorowga qoysaska Soomaalida"
        },
        category: "health-guides",
        type: "pdf",
        downloadUrl: "/resources/diabetes-guide.pdf",
        thumbnailUrl: "/images/diabetes-guide-thumb.jpg",
        isActive: true,
        createdAt: new Date()
      },
      {
        id: "2",
        title: { en: "Healthy Somali Recipes", so: "Cuntooyinka Caafimaadka leh ee Soomaalida" },
        description: { 
          en: "Traditional recipes adapted for better health outcomes",
          so: "Cuntooyinka dhaqameedka oo loo habeeyay natiijooyin caafimaad oo fiican"
        },
        category: "nutrition",
        type: "pdf",
        downloadUrl: "/resources/healthy-recipes.pdf",
        thumbnailUrl: "/images/recipes-thumb.jpg",
        isActive: true,
        createdAt: new Date()
      }
    ];

    resources.forEach(resource => this.resources.set(resource.id, resource));

    // Seed partners
    const partners: Partner[] = [
      {
        id: "1",
        name: "Abu Hurairah Centre",
        description: { 
          en: "Primary venue partner providing space for workshops and community engagement",
          so: "Saaxiibka ugu muhiimsan ee bixiya goobaha tababarrada iyo wadashaqeynta bulshada"
        },
        type: "primary",
        logoUrl: "/images/abu-hurairah-logo.jpg",
        websiteUrl: "http://abuhurairah.ca",
        services: ["Workshop hosting", "Community outreach", "Translation services"],
        isActive: true
      },
      {
        id: "2",
        name: "Khalid bin Waleed Centre",
        description: { 
          en: "Women's programming partner focusing on culturally-appropriate health discussions",
          so: "Saaxiibka barnaamijyada haweenka ee diiradda saara wadahadalada caafimaadka ee ku haboon dhaqanka"
        },
        type: "primary",
        logoUrl: "/images/khalid-centre-logo.jpg",
        websiteUrl: "http://khalidcentre.ca",
        services: ["Women's workshops", "Mental health support", "Family programs"],
        isActive: true
      }
    ];

    partners.forEach(partner => this.partners.set(partner.id, partner));

    // Seed team members
    const teamMembers: TeamMember[] = [
      {
        id: "1",
        name: "Ifrah Ismail",
        role: { en: "Project Lead", so: "Hogaamiyaha Mashruuca" },
        description: { 
          en: "Coordinates program direction, manages partnerships, and ensures responsiveness to community feedback",
          so: "Waxay isku dubaridda jihada barnaamijka, maamusho iskaashiga, oo dammacdo inay ka jawaabto ra'yiga bulshada"
        },
        photoUrl: "/images/ifrah-ismail.jpg",
        email: "ifrah@somalichealth.ca",
        order: 1,
        isActive: true
      },
      {
        id: "2",
        name: "Munira Ahmed",
        role: { en: "Communication/Surveying", so: "Isgaarsiinta/Sahan-raadinta" },
        description: { 
          en: "Manages communication strategies, conducts community surveys, and produces impact reports",
          so: "Waxay maamusho xeeladaha isgaarsiinta, samaysa sahan-raadinta bulshada, oo soo saarta warbixinno saameyn"
        },
        photoUrl: "/images/munira-ahmed.jpg",
        email: "munira@somalichealth.ca",
        order: 2,
        isActive: true
      },
      {
        id: "3",
        name: "Maqdis Ali",
        role: { en: "Healthcare Coordinator", so: "Isku-dubbaridaha Caafimaadka" },
        description: { 
          en: "Ensures clinical accuracy and connects participants with culturally competent healthcare resources",
          so: "Waxay hubisaa saxnaanta caafimaadka oo ku xidha ka-qaybgalayaasha khayraadka caafimaadka ee ku haboon dhaqanka"
        },
        photoUrl: "/images/maqdis-ali.jpg",
        email: "maqdis@somalichealth.ca",
        order: 3,
        isActive: true
      },
      {
        id: "4",
        name: "Muadh",
        role: { en: "Information Technician", so: "Takhasoska Macluumaadka" },
        description: { 
          en: "Handles website development, design, and ensures digital accessibility across all platforms",
          so: "Wuxuu maamusho horumarinta websaydhka, naqshadaynta, oo hubiya gelitaanka dhijitaalka ah dhammaan goobaha"
        },
        photoUrl: "/images/muadh.jpg",
        email: "muadh@somalichealth.ca",
        order: 4,
        isActive: true
      }
    ];

    teamMembers.forEach(member => this.teamMembers.set(member.id, member));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Workshop methods
  async getWorkshops(): Promise<Workshop[]> {
    return Array.from(this.workshops.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getWorkshop(id: string): Promise<Workshop | undefined> {
    return this.workshops.get(id);
  }

  async getActiveWorkshops(): Promise<Workshop[]> {
    return Array.from(this.workshops.values())
      .filter(w => w.isActive && w.date > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async createWorkshop(insertWorkshop: InsertWorkshop): Promise<Workshop> {
    const id = randomUUID();
    const workshop: Workshop = { 
      ...insertWorkshop, 
      id, 
      currentAttendees: 0, 
      createdAt: new Date() 
    };
    this.workshops.set(id, workshop);
    return workshop;
  }

  async updateWorkshop(id: string, updates: Partial<InsertWorkshop>): Promise<Workshop | undefined> {
    const workshop = this.workshops.get(id);
    if (!workshop) return undefined;
    
    const updated = { ...workshop, ...updates };
    this.workshops.set(id, updated);
    return updated;
  }

  async incrementWorkshopAttendees(id: string): Promise<void> {
    const workshop = this.workshops.get(id);
    if (workshop && workshop.currentAttendees < workshop.maxAttendees) {
      workshop.currentAttendees += 1;
      this.workshops.set(id, workshop);
    }
  }

  // Workshop registration methods
  async createWorkshopRegistration(insertRegistration: InsertWorkshopRegistration): Promise<WorkshopRegistration> {
    const id = randomUUID();
    const registration: WorkshopRegistration = { 
      ...insertRegistration, 
      id, 
      createdAt: new Date() 
    };
    this.workshopRegistrations.set(id, registration);
    await this.incrementWorkshopAttendees(insertRegistration.workshopId);
    return registration;
  }

  async getWorkshopRegistrations(workshopId: string): Promise<WorkshopRegistration[]> {
    return Array.from(this.workshopRegistrations.values())
      .filter(r => r.workshopId === workshopId);
  }

  // Resource methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values())
      .filter(r => r.category === category && r.isActive);
  }

  async getActiveResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(r => r.isActive);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = randomUUID();
    const resource: Resource = { 
      ...insertResource, 
      id, 
      createdAt: new Date() 
    };
    this.resources.set(id, resource);
    return resource;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      isRead: false, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async markContactAsRead(id: string): Promise<void> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.isRead = true;
      this.contacts.set(id, contact);
    }
  }

  // Partner methods
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async getActivePartners(): Promise<Partner[]> {
    return Array.from(this.partners.values()).filter(p => p.isActive);
  }

  async createPartner(insertPartner: InsertPartner): Promise<Partner> {
    const id = randomUUID();
    const partner: Partner = { ...insertPartner, id };
    this.partners.set(id, partner);
    return partner;
  }

  // Team member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).sort((a, b) => a.order - b.order);
  }

  async getActiveTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values())
      .filter(m => m.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async createTeamMember(insertMember: InsertTeamMember): Promise<TeamMember> {
    const id = randomUUID();
    const member: TeamMember = { ...insertMember, id };
    this.teamMembers.set(id, member);
    return member;
  }
}

export const storage = new MemStorage();
