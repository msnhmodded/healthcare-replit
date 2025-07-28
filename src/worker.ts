import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Type for Cloudflare Workers environment
interface Env {
  ASSETS: Fetcher;
  ENVIRONMENT?: string;
}

// Import data (in production, this would come from D1 database)
const workshopsData = [
  {
    id: "1",
    title: { en: "Diabetes Management for Families", so: "Maaraynta Sonkorowga Qoysaska" },
    description: { en: "Learn practical strategies for managing diabetes while maintaining traditional dietary practices", so: "Baro xeeladaha wax ku ool ah ee maaraynta sonkorowga halka aad ku dhawrayso dhaqanka cuntada dhaqameedka" },
    category: "chronic-disease",
    date: "2025-08-15T19:00:00.000Z",
    endDate: "2025-08-15T21:00:00.000Z",
    location: "Abu Hurairah Centre",
    maxAttendees: 30,
    currentAttendees: 12,
    isActive: true,
    facilitator: "Dr. Amina Hassan",
    createdAt: "2025-07-28T01:27:09.509Z"
  },
  {
    id: "2", 
    title: { en: "Women's Health Discussion Circle", so: "Goobta Wadahadalka Caafimaadka Haweenka" },
    description: { en: "Safe space for women to discuss health concerns with cultural sensitivity", so: "Meel ammaan ah oo haweenku ku wadahadlaan arrimaha caafimaadka iyagoo tixgaliyay dhaqanka" },
    category: "mental-health",
    date: "2025-08-17T18:30:00.000Z",
    endDate: "2025-08-17T20:30:00.000Z",
    location: "Khalid bin Waleed Centre",
    maxAttendees: 25,
    currentAttendees: 8,
    isActive: true,
    facilitator: "Fadumo Ali, RN",
    createdAt: "2025-07-28T01:27:09.509Z"
  }
];

const resourcesData = [
  {
    id: "diabetes-guide",
    title: { en: "Diabetes Management Guide", so: "Hagaha Maaraynta Sonkorowga" },
    description: { en: "Comprehensive guide for managing diabetes while maintaining traditional dietary practices", so: "Hage shaafici ah oo loogu talagalay maaraynta sonkorowga halka aad ku dhawrayso dhaqanka cuntada dhaqameedka" },
    type: "pdf",
    category: "health-guides", 
    fileUrl: "/resources/diabetes-guide.pdf",
    tags: ["diabetes", "sonkorowga", "management", "diet"]
  },
  {
    id: "healthy-somali-recipes",
    title: { en: "Healthy Somali Recipes", so: "Cuntooyinka Caafimaadka leh ee Soomaalida" },
    description: { en: "Traditional recipes adapted for better health outcomes", so: "Cuntooyinka dhaqameedka oo loo habeeyay natiijooyin caafimaad oo fiican" },
    type: "pdf",
    category: "nutrition",
    fileUrl: "/resources/healthy-recipes.pdf", 
    tags: ["recipes", "cuntooyinka", "nutrition", "traditional"]
  },
  {
    id: "bmi-calculator",
    title: { en: "BMI Calculator", so: "Xisaabiyaha BMI" },
    description: { en: "Calculate your Body Mass Index with cultural context", so: "Xisaabi tirada miisaanka jidhkaaga iyadoo la eegayo dhaqanka" },
    type: "tool",
    category: "tools",
    toolKey: "bmi-calculator",
    tags: ["BMI", "calculator", "weight", "health"]
  }
];

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// Static assets handler
app.get('/resources/*', async (c) => {
  const url = new URL(c.req.url);
  const assetResponse = await c.env.ASSETS.fetch(url.toString());
  return assetResponse;
});

// API Routes  
app.get('/api/workshops', async (c) => {
  return c.json(workshopsData);
});

app.get('/api/resources', async (c) => {
  const category = c.req.query('category');
  let filtered = resourcesData;
  
  if (category && category !== 'all') {
    filtered = resourcesData.filter(r => r.category === category);
  }
  
  return c.json(filtered);
});

app.post('/api/contacts', async (c) => {
  try {
    const body = await c.req.json();
    // In production, this would save to D1 database
    console.log('Contact form submission:', body);
    return c.json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to submit contact form' }, 500);
  }
});

app.post('/api/workshop-registrations', async (c) => {
  try {
    const body = await c.req.json();
    // In production, this would save to D1 database  
    console.log('Workshop registration:', body);
    return c.json({ success: true, message: 'Workshop registration successful' });
  } catch (error) {
    return c.json({ success: false, message: 'Failed to register for workshop' }, 500);
  }
});

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', async (c) => {
  const url = new URL(c.req.url);
  url.pathname = '/index.html';
  const assetResponse = await c.env.ASSETS.fetch(url.toString());
  return assetResponse;
});

export default app;