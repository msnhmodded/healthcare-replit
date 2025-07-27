-- Somali Health Equity Collective Database Schema for Cloudflare D1
-- This schema is optimized for SQLite/D1

-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Workshops table - stores bilingual content as JSON strings
CREATE TABLE workshops (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL, -- JSON: {"en": "English title", "so": "Somali title"}
  description TEXT NOT NULL, -- JSON: {"en": "English desc", "so": "Somali desc"}
  category TEXT NOT NULL, -- 'chronic-disease', 'mental-health', 'navigation'
  date DATETIME NOT NULL,
  location TEXT NOT NULL,
  instructor TEXT NOT NULL,
  max_attendees INTEGER NOT NULL,
  current_attendees INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Workshop registrations table
CREATE TABLE workshop_registrations (
  id TEXT PRIMARY KEY,
  workshop_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_language TEXT DEFAULT 'both', -- 'english', 'somali', 'both'
  notes TEXT,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
);

-- Resources table - health resources and materials
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL, -- JSON: {"en": "English title", "so": "Somali title"}
  description TEXT NOT NULL, -- JSON: {"en": "English desc", "so": "Somali desc"}
  category TEXT NOT NULL, -- 'guides', 'nutrition', 'videos', 'tools', 'directory', 'forms'
  type TEXT NOT NULL, -- 'pdf', 'video', 'link', 'tool'
  url TEXT,
  file_path TEXT,
  tags TEXT, -- JSON array of tags
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- JSON: {"en": "English role", "so": "Somali role"}
  description TEXT NOT NULL, -- JSON: {"en": "English desc", "so": "Somali desc"}
  email TEXT,
  phone TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0, -- For display ordering
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact inquiries table
CREATE TABLE contact_inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'general', -- 'general', 'workshop', 'partnership', 'volunteer'
  status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'resolved'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Community partners table
CREATE TABLE community_partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL, -- JSON: {"en": "English desc", "so": "Somali desc"}
  website TEXT,
  contact_email TEXT,
  partnership_type TEXT NOT NULL, -- 'healthcare', 'community', 'educational'
  logo_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_workshops_category ON workshops(category);
CREATE INDEX idx_workshops_date ON workshops(date);
CREATE INDEX idx_workshops_active ON workshops(is_active);
CREATE INDEX idx_registrations_workshop ON workshop_registrations(workshop_id);
CREATE INDEX idx_registrations_email ON workshop_registrations(email);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_featured ON resources(is_featured);
CREATE INDEX idx_team_order ON team_members(order_index);
CREATE INDEX idx_team_active ON team_members(is_active);
CREATE INDEX idx_contacts_type ON contact_inquiries(inquiry_type);
CREATE INDEX idx_contacts_status ON contact_inquiries(status);
CREATE INDEX idx_partners_type ON community_partners(partnership_type);
CREATE INDEX idx_partners_active ON community_partners(is_active);