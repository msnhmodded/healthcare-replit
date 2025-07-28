// Cloudflare Workers entry point
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';

const app = new Hono();

// CORS for preview/production
app.use('*', cors());

// Serve static files
app.use('/resources/*', serveStatic({ root: './public' }));

// API routes - convert from Express routes
app.get('/api/workshops', async (c) => {
  // Workshop data - same as current /server/storage.ts
  const workshops = [
    {
      id: "1",
      title: { en: "Diabetes Management for Families", so: "Maaraynta Sonkorowga Qoysaska" },
      description: { en: "Learn practical strategies for managing diabetes", so: "Baro xeeladaha wax ku ool ah ee maaraynta sonkorowga" },
      category: "chronic-disease",
      date: "2025-08-15T19:00:00.000Z",
      location: "Abu Hurairah Centre",
      facilitator: "Dr. Amina Hassan"
    }
    // ... rest of workshop data
  ];
  return c.json(workshops);
});

app.get('/api/resources', async (c) => {
  // Resources data from shared/resources-data.ts
  const resources = [
    {
      id: "diabetes-guide",
      title: { en: "Diabetes Management Guide", so: "Hagaha Maaraynta Sonkorowga" },
      type: "pdf",
      category: "health-guides",
      fileUrl: "/resources/diabetes-guide.pdf"
    }
    // ... rest of resources
  ];
  return c.json(resources);
});

// Serve React app for all other routes
app.get('*', serveStatic({ path: './dist/index.html' }));

export default app;