# Somali Health Equity Collective - Web Application

## Overview

This is a bilingual (English/Somali) web application for the Somali Health Equity Collective (SHEC), designed to address health disparities in Toronto's Somali community through workshops, resources, and community engagement. The application provides a platform for workshop registration, health resource sharing, volunteer coordination, and community outreach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for server state, React Context for language preferences
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful API with conventional HTTP methods
- **Middleware**: Express middleware for JSON parsing, logging, and error handling

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for schema migrations

## Key Components

### Internationalization System
- **Language Support**: English and Somali
- **Storage**: Browser localStorage for language preference
- **Implementation**: Custom React Context with translation utilities
- **Content Structure**: JSON-based translation objects with nested keys

### Workshop Management
- **Features**: Workshop listing, registration, category filtering
- **Registration**: Form validation with Zod schemas
- **Capacity Management**: Tracks current vs maximum attendees
- **Multilingual Content**: Workshop titles and descriptions in both languages

### Resource Library
- **Categories**: Health guides, nutrition resources, videos, tools, directory, forms
- **Content Types**: PDFs, videos, external links, downloadable tools
- **Search & Filter**: Category-based filtering with search functionality
- **Accessibility**: Screen reader friendly with proper ARIA labels

### Community Engagement
- **Volunteer Opportunities**: Role-based volunteer coordination
- **Team Directory**: Staff and volunteer profiles with contact information
- **Contact System**: Multi-channel contact form with inquiry categorization
- **Partnership Management**: Community partner listings and collaboration

## Data Flow

### Client-Side Data Flow
1. User interactions trigger React state updates
2. TanStack Query manages API calls and caching
3. Language context provides real-time translation switching
4. Form submissions use React Hook Form with Zod validation

### Server-Side Data Flow
1. Express routes handle incoming API requests
2. Request validation using Zod schemas
3. Drizzle ORM executes database operations
4. Response formatting with consistent error handling
5. Logging middleware tracks API performance

### Database Schema
- **Users**: Authentication and user management
- **Workshops**: Event scheduling and capacity management
- **Workshop Registrations**: Participant tracking and preferences
- **Resources**: Content management with multilingual support
- **Contacts**: Community inquiries and communication
- **Partners**: External organization relationships
- **Team Members**: Staff and volunteer directory

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state and validation
- **Zod**: Runtime type validation and schema definition
- **Date-fns**: Date manipulation and formatting

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Development server and build tool
- **ESBuild**: Production bundling
- **TSX**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Server**: TSX for hot reloading TypeScript execution
- **Client**: Vite development server with HMR
- **Database**: Neon serverless PostgreSQL
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
1. **Client Build**: Vite compiles React app to static assets
2. **Server Build**: ESBuild bundles Express server for Node.js
3. **Database**: Drizzle migrations apply schema changes
4. **Static Serving**: Express serves built client assets

### Key Build Commands
- `npm run dev`: Start development servers
- `npm run build`: Build for production
- `npm run start`: Run production server
- `npm run db:push`: Apply database schema changes

### Architecture Benefits
- **Accessibility**: Radix UI ensures WCAG compliance
- **Performance**: TanStack Query provides efficient caching
- **Maintainability**: TypeScript and Zod provide type safety
- **Scalability**: Serverless database handles variable loads
- **Cultural Responsiveness**: Bilingual support with proper RTL considerations