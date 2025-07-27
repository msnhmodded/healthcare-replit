import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertWorkshopRegistrationSchema, 
  insertContactSchema,
  insertWorkshopSchema,
  insertResourceSchema,
  insertPartnerSchema,
  insertTeamMemberSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Workshops
  app.get("/api/workshops", async (req, res) => {
    try {
      const workshops = await storage.getActiveWorkshops();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshops" });
    }
  });

  app.get("/api/workshops/:id", async (req, res) => {
    try {
      const workshop = await storage.getWorkshop(req.params.id);
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }
      res.json(workshop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch workshop" });
    }
  });

  app.post("/api/workshops", async (req, res) => {
    try {
      const validatedData = insertWorkshopSchema.parse(req.body);
      const workshop = await storage.createWorkshop(validatedData);
      res.status(201).json(workshop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid workshop data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create workshop" });
    }
  });

  // Workshop registrations
  app.post("/api/workshops/:id/register", async (req, res) => {
    try {
      const workshopId = req.params.id;
      const workshop = await storage.getWorkshop(workshopId);
      
      if (!workshop) {
        return res.status(404).json({ message: "Workshop not found" });
      }

      if (workshop.currentAttendees >= workshop.maxAttendees) {
        return res.status(400).json({ message: "Workshop is full" });
      }

      const validatedData = insertWorkshopRegistrationSchema.parse({
        ...req.body,
        workshopId
      });
      
      const registration = await storage.createWorkshopRegistration(validatedData);
      res.status(201).json(registration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to register for workshop" });
    }
  });

  // Resources
  app.get("/api/resources", async (req, res) => {
    try {
      const category = req.query.category as string;
      let resources;
      
      if (category) {
        resources = await storage.getResourcesByCategory(category);
      } else {
        resources = await storage.getActiveResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validatedData = insertResourceSchema.parse(req.body);
      const resource = await storage.createResource(validatedData);
      res.status(201).json(resource);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid resource data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  // Contacts
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ message: "Message sent successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Partners
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getActivePartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  app.post("/api/partners", async (req, res) => {
    try {
      const validatedData = insertPartnerSchema.parse(req.body);
      const partner = await storage.createPartner(validatedData);
      res.status(201).json(partner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid partner data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create partner" });
    }
  });

  // Team members
  app.get("/api/team", async (req, res) => {
    try {
      const teamMembers = await storage.getActiveTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.post("/api/team", async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const member = await storage.createTeamMember(validatedData);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid team member data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create team member" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
