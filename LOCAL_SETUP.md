# Somali Health Equity Collective - Local Setup Guide

## 📋 Project Overview
Healthcare platform for Toronto's Somali community with bilingual support (English/Somali). Features workshops, resources, tools, and community engagement.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Extract the zip file
unzip somali-health-equity-collective.zip
cd somali-health-equity-collective

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## 🏗️ Architecture

### Current Setup (Node.js/Express)
- **Backend**: Express.js with TypeScript
- **Frontend**: React with Vite
- **Database**: In-memory storage with seed data
- **UI**: Tailwind CSS + Radix UI components

### Cloudflare Workers Ready
- **Entry Point**: `src/worker.ts` (Hono framework)
- **Deploy**: `npm run deploy`
- **Configuration**: `wrangler.toml`

## 📁 Key Directories

```
/
├── client/src/          # React frontend
│   ├── pages/          # Main pages (home, resources, workshops, etc.)
│   ├── components/     # Reusable components + tools
│   └── hooks/          # Custom hooks (language, mobile, etc.)
├── server/             # Express.js backend
├── shared/             # Shared data and schemas
├── public/             # Static assets and PDF resources
└── src/worker.ts       # Cloudflare Workers entry point
```

## 🌟 Key Features

### Bilingual Platform (English/Somali)
- Complete language switching
- Cultural context in all content
- Accessibility features

### Resources Page
- **6 Categories**: Health Guides, Nutrition, Videos, Tools, Directory, Forms
- **Real PDFs**: Downloadable health resources
- **5 Interactive Tools**: BMI Calculator, Medication Tracker, Symptom Journal, Appointment Reminder, Health Goals Tracker
- **Search & Filter**: Bilingual search across all content

### Workshop Management
- Community health workshops
- Registration system
- Category-based filtering

### Contact & Community
- Contact forms
- Team member profiles
- Partner information

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start Express server on port 5000
npm run dev:worker       # Test Workers version locally

# Building
npm run build           # Build React frontend
npm run check           # TypeScript check

# Cloudflare Workers
npm run deploy          # Deploy to Cloudflare Workers
npm run deploy:preview  # Deploy to development environment
```

## 🌐 Deployment Options

### 1. Traditional Hosting
- Built for Node.js deployment
- Use `npm run build && npm start`
- Requires server with Node.js support

### 2. Cloudflare Workers
- Serverless deployment
- Use `npm run deploy`
- Global edge deployment
- No server maintenance required

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=5000
```

### Cloudflare Workers
- Configured in `wrangler.toml`
- Asset serving via Workers Assets
- D1 database ready (commented configuration)

## 📖 Content Management

### Adding Resources
1. Add PDF files to `public/resources/`
2. Update `shared/resources-data.ts`
3. Include bilingual titles and descriptions

### Adding Workshops
Update `server/storage.ts` with new workshop data

### Language Support
- Add translations in component files
- Use `useLanguage()` hook
- Follow `getTranslationContent()` pattern

## 🎯 Production Considerations

### Database Migration
- Currently uses in-memory storage
- Ready for D1 (Cloudflare) or PostgreSQL migration
- Schema defined in `shared/schema.ts`

### Asset Management
- PDFs served statically from `public/resources/`
- Consider R2 storage for production scale

### Monitoring
- Health check endpoint: `/health`
- Console logging for form submissions

## 🤝 Contributing

1. Follow the existing bilingual pattern
2. Use TypeScript throughout
3. Test both language modes
4. Ensure mobile responsiveness
5. Follow accessibility guidelines

## 📞 Support

This is a community healthcare platform serving Toronto's Somali community. All features respect cultural context and Islamic principles while providing modern healthcare resources and tools.

---

**Ready to run!** Just `npm install && npm run dev` and visit `http://localhost:5000/resources` to see the fully functional resources page.