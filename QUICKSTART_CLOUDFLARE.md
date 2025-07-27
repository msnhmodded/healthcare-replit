# Quick Start: Deploying SHEC Website to Cloudflare

This is a simplified guide to get your Somali Health Equity Collective website running on Cloudflare D1 in just a few steps.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com) (free tier is fine)
2. **Node.js**: Already installed in your Replit environment

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

## Step 3: Run the Migration Script

```bash
./scripts/migrate-to-d1.sh
```

This script will:
- Create development and production databases
- Set up your configuration
- Apply the database schema
- Add sample data

## Step 4: Install Cloudflare Dependencies

```bash
npm install @cloudflare/workers-types wrangler
```

## Step 5: Test Your Setup

```bash
# Check your databases
wrangler d1 list

# Query your development database to verify data
wrangler d1 execute shec-development --command="SELECT * FROM workshops LIMIT 3"
```

## Step 6: Deploy to Cloudflare Workers

```bash
# Build your application
npm run build

# Deploy to Cloudflare
wrangler deploy
```

## Step 7: Access Your Live Website

After deployment, Wrangler will provide you with a URL like:
`https://shec-website.your-subdomain.workers.dev`

## Configuration Files Created

The migration script creates these files:
- `wrangler.toml` - Main Cloudflare configuration
- Database schema applied to both dev and production
- Sample data loaded into development database

## Managing Your Database

### View Data
```bash
# Development database
wrangler d1 execute shec-development --command="SELECT * FROM workshops"

# Production database  
wrangler d1 execute shec-production --command="SELECT * FROM team_members"
```

### Add Data
```bash
# Add workshop to production
wrangler d1 execute shec-production --command="INSERT INTO workshops (id, title, description, category, date, location, instructor, max_attendees) VALUES ('5', '{\"en\":\"New Workshop\",\"so\":\"Tababar Cusub\"}', '{\"en\":\"Description\",\"so\":\"Sharax\"}', 'chronic-disease', '2024-03-01 14:00:00', 'Community Center', 'Dr. Smith', 30)"
```

### Backup Data
```bash
# Export all data from production
wrangler d1 export shec-production --output=backup.sql
```

## Updating Your Website

1. Make changes to your code
2. Build: `npm run build`
3. Deploy: `wrangler deploy`

## Domain Setup (Optional)

To use your own domain:

1. Add your domain to Cloudflare
2. Update `wrangler.toml`:
   ```toml
   [env.production.routes]
   pattern = "yourdomain.com/*"
   zone_name = "yourdomain.com"
   ```
3. Deploy: `wrangler deploy`

## Cost Estimates

Cloudflare D1 pricing (free tier includes):
- 5 million reads/month
- 100,000 writes/month
- 5 GB storage

For a community website, this is typically sufficient and free.

## Support Resources

- **Cloudflare D1 Docs**: https://developers.cloudflare.com/d1/
- **Wrangler CLI Docs**: https://developers.cloudflare.com/workers/wrangler/
- **Drizzle D1 Guide**: https://orm.drizzle.team/docs/get-started-sqlite#cloudflare-d1

## Troubleshooting

### Common Issues

1. **Authentication Error**: Run `wrangler login` again
2. **Database Not Found**: Check `wrangler.toml` database IDs
3. **Build Fails**: Ensure all dependencies are installed: `npm install`
4. **Deploy Fails**: Check your account has Workers enabled

### Getting Help

1. Check Cloudflare dashboard for error logs
2. View deployment logs: `wrangler tail`
3. Test locally first: `npm run dev`

## Next Steps

Once deployed, you can:
- Add more workshops through the admin interface
- Update team member information
- Monitor usage in Cloudflare dashboard
- Set up custom domains
- Add analytics and monitoring

Your SHEC website is now running on Cloudflare's global edge network with improved performance and reliability!