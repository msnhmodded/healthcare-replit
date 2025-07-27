# Migrating to Cloudflare D1 Database

This guide will help you migrate your Somali Health Equity Collective website from the current Neon PostgreSQL setup to Cloudflare D1 (SQLite-based) database.

## Overview

Cloudflare D1 is a serverless SQL database built on SQLite that provides:
- Global edge distribution
- Zero cold starts
- Built-in replication
- Pay-per-use pricing
- Seamless integration with Cloudflare Workers

## Prerequisites

1. Cloudflare account with Workers enabled
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Domain configured with Cloudflare (optional but recommended)

## Step 1: Install Cloudflare Dependencies

```bash
npm install @cloudflare/workers-types wrangler
npm install --save-dev @types/better-sqlite3
```

## Step 2: Create Cloudflare Configuration

Create `wrangler.toml` in your project root:

```toml
name = "shec-website"
main = "dist/server/index.js"
compatibility_date = "2024-01-15"

[env.production]
[[env.production.d1_databases]]
binding = "DB"
database_name = "shec-production"
database_id = "your-database-id-here"

[env.development]
[[env.development.d1_databases]]
binding = "DB"
database_name = "shec-development"
database_id = "your-dev-database-id-here"
```

## Step 3: Create D1 Database

```bash
# Create production database
wrangler d1 create shec-production

# Create development database
wrangler d1 create shec-development
```

Copy the database IDs from the output and update your `wrangler.toml`.

## Step 4: Update Database Schema for SQLite

Create `migrations/001_initial_schema.sql`:

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Workshops table
CREATE TABLE workshops (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL, -- JSON string: {"en": "English title", "so": "Somali title"}
  description TEXT NOT NULL, -- JSON string: {"en": "English desc", "so": "Somali desc"}
  category TEXT NOT NULL,
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
  preferred_language TEXT DEFAULT 'both',
  notes TEXT,
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id)
);

-- Resources table
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL, -- JSON string
  description TEXT NOT NULL, -- JSON string
  category TEXT NOT NULL,
  type TEXT NOT NULL, -- 'pdf', 'video', 'link', 'tool'
  url TEXT,
  file_path TEXT,
  tags TEXT, -- JSON array
  is_featured BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- JSON string
  description TEXT NOT NULL, -- JSON string
  email TEXT,
  phone TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
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
  inquiry_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Community partners table
CREATE TABLE community_partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL, -- JSON string
  website TEXT,
  contact_email TEXT,
  partnership_type TEXT NOT NULL,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Step 5: Run Database Migrations

```bash
# Apply schema to development database
wrangler d1 execute shec-development --file=./migrations/001_initial_schema.sql

# Apply schema to production database
wrangler d1 execute shec-production --file=./migrations/001_initial_schema.sql
```

## Step 6: Update Database Configuration

Create `server/db/cloudflare.ts`:

```typescript
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../shared/schema';

export function createDB(env: any) {
  return drizzle(env.DB, { schema });
}

// For local development with better-sqlite3
export function createLocalDB() {
  if (process.env.NODE_ENV === 'development') {
    const Database = require('better-sqlite3');
    const { drizzle } = require('drizzle-orm/better-sqlite3');
    
    const sqlite = new Database('./local.db');
    return drizzle(sqlite, { schema });
  }
  throw new Error('Local DB only available in development');
}
```

## Step 7: Update Drizzle Configuration

Update `drizzle.config.ts`:

```typescript
import type { Config } from 'drizzle-kit';

export default {
  schema: './shared/schema.ts',
  out: './drizzle',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: './wrangler.toml',
    dbName: 'shec-development',
  },
} satisfies Config;
```

## Step 8: Update Server Code

Update `server/index.ts` to handle both local development and Cloudflare Workers:

```typescript
// Add environment detection
const isCloudflareWorker = typeof globalThis.WorkerGlobalScope !== 'undefined';

let db: any;

if (isCloudflareWorker) {
  // Running on Cloudflare Workers
  db = createDB(env);
} else {
  // Running locally
  db = createLocalDB();
}
```

## Step 9: Seed Initial Data

Create `seeds/initial_data.sql`:

```sql
-- Insert sample workshops
INSERT INTO workshops (id, title, description, category, date, location, instructor, max_attendees) VALUES
('1', '{"en":"Diabetes Management Workshop","so":"Tababarka Maaraynta Diabeetada"}', '{"en":"Learn essential diabetes management techniques","so":"Baro farsamooyinka muhiimka ah ee maaraynta sonkorowga"}', 'chronic-disease', '2024-02-15 14:00:00', 'Community Center', 'Dr. Amina Hassan', 25),
('2', '{"en":"Mental Health First Aid","so":"Caawinta Dadka Caafimaad Xumo"}', '{"en":"Basic mental health support skills","so":"Xirfadaha aasaasiga ah ee taageerada caafimaadka maskaxda"}', 'mental-health', '2024-02-20 18:30:00', 'Health Clinic', 'Sarah Mohamed', 30);

-- Insert sample team members
INSERT INTO team_members (id, name, role, description, email, order_index) VALUES
('1', 'Ifrah Ismail', '{"en":"Project Director","so":"Agaasimaha Mashruuca"}', '{"en":"Leading healthcare equity initiatives","so":"Hoggaaminta hindisaha sinnaanta daryeelka caafimaadka"}', 'ifrah@shec.org', 1),
('2', 'Ahmed Osman', '{"en":"Community Outreach Coordinator","so":"Isku-duubaridda Bulshada"}', '{"en":"Building community partnerships","so":"Dhisidda iskaashiga bulshada"}', 'ahmed@shec.org', 2);

-- Insert sample resources
INSERT INTO resources (id, title, description, category, type, url) VALUES
('1', '{"en":"Diabetes Management Guide","so":"Tilmaamaha Maaraynta Diabeetada"}', '{"en":"Comprehensive guide to managing diabetes","so":"Tilmaame dhamaystiran oo ku saabsan maaraynta sonkorowga"}', 'guides', 'pdf', 'https://example.com/diabetes-guide.pdf'),
('2', '{"en":"Healthy Eating for Somali Families","so":"Cunto Caafimaad leh Qoysaska Soomaalida"}', '{"en":"Nutrition guide tailored for Somali community","so":"Tilmaamaha nafaqada ee loogu talagalay bulshada Soomaalida"}', 'nutrition', 'pdf', 'https://example.com/nutrition-guide.pdf');
```

Apply the seed data:

```bash
wrangler d1 execute shec-development --file=./seeds/initial_data.sql
```

## Step 10: Deploy to Cloudflare Workers

```bash
# Build the project
npm run build

# Deploy to Cloudflare Workers
wrangler deploy
```

## Step 11: Environment Variables

Set up environment variables in Cloudflare Workers dashboard or via CLI:

```bash
wrangler secret put DATABASE_URL # Leave empty for D1
wrangler secret put NODE_ENV # Set to 'production'
```

## Benefits of Cloudflare D1 Migration

1. **Performance**: Edge-distributed database with sub-10ms query times
2. **Scalability**: Automatically scales with your application
3. **Cost**: Pay only for what you use, no idle time charges
4. **Reliability**: Built-in replication and backup
5. **Integration**: Seamless with Cloudflare ecosystem

## Development Workflow

### Local Development
```bash
# Start local development with SQLite
npm run dev

# Apply database changes locally
npm run db:push
```

### Production Deployment
```bash
# Build and deploy
npm run build
wrangler deploy

# Apply database migrations
wrangler d1 execute shec-production --file=./migrations/new_migration.sql
```

## Data Migration from Neon

To migrate existing data from Neon PostgreSQL:

1. Export data from Neon:
```sql
COPY (SELECT * FROM workshops) TO '/tmp/workshops.csv' WITH CSV HEADER;
COPY (SELECT * FROM team_members) TO '/tmp/team_members.csv' WITH CSV HEADER;
-- Repeat for all tables
```

2. Convert and import to D1:
```bash
# Convert CSV to SQL INSERT statements
# Then apply to D1
wrangler d1 execute shec-production --file=./migration_data.sql
```

## Troubleshooting

### Common Issues

1. **Schema Differences**: SQLite uses different data types than PostgreSQL
   - Use TEXT for JSON columns
   - Use INTEGER for boolean values (0/1)
   - Use DATETIME for timestamps

2. **Query Syntax**: Some PostgreSQL-specific syntax needs adjustment
   - JSONB operations need to be handled in application code
   - Use SQLite date functions

3. **Local Development**: Use better-sqlite3 for local SQLite database

## Support

For issues with this migration:
1. Check Cloudflare D1 documentation
2. Review Drizzle ORM D1 adapter docs
3. Test thoroughly in development environment before production deployment
