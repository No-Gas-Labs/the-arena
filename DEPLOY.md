# THE ARENA - Production Deployment Guide

**Status**: Ready for production deployment  
**Last Updated**: February 22, 2026

---

## Overview

THE ARENA consists of two deployable components:

1. **Frontend** (Next.js) → Deployed to Vercel
2. **Backend** (Express.js) → Deployed to Fly.io

Both are production-ready and can be deployed immediately.

---

## Prerequisites

- GitHub account (for code hosting)
- Vercel account (for frontend deployment)
- Fly.io account (for backend deployment)
- API keys for all AI models and publishing services

---

## Backend Deployment (Fly.io)

### Step 1: Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
```

### Step 2: Create Fly.io App

```bash
cd backend
fly launch --name the-arena-api
```

When prompted:
- Choose region: `sjc` (San Jose) or closest to you
- Choose database: `No` (using local SQLite for now)
- Deploy now: `No` (we'll configure secrets first)

### Step 3: Set Environment Variables

```bash
fly secrets set \
  GEMINI_API_KEY="your-gemini-key" \
  OPENAI_API_KEY="your-openai-key" \
  ANTHROPIC_API_KEY="your-anthropic-key" \
  XAI_API_KEY="your-xai-key" \
  TWITTER_BEARER_TOKEN="your-twitter-token" \
  SUBSTACK_API_KEY="your-substack-key" \
  SENDGRID_API_KEY="your-sendgrid-key" \
  SOLANA_RPC_URL="https://api.mainnet-beta.solana.com" \
  BASE_RPC_URL="https://mainnet.base.org"
```

### Step 4: Deploy

```bash
fly deploy
```

### Step 5: Verify Deployment

```bash
fly status
fly logs
```

Visit: `https://the-arena-api.fly.dev/health`

---

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
cd /home/ubuntu/the-arena-website
git remote add origin https://github.com/YOUR_USERNAME/the-arena.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select `Next.js` framework
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://the-arena-api.fly.dev`

### Step 3: Deploy

Click "Deploy" button. Vercel will automatically build and deploy.

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., `thearena.dev`)
3. Update DNS records as instructed

---

## API Keys Setup

### Gemini API

1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Create new API key
4. Copy and save

### OpenAI API

1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and save

### Anthropic API

1. Go to https://console.anthropic.com/keys
2. Create new API key
3. Copy and save

### xAI Grok

1. Go to https://x.ai
2. Request API access
3. Copy API key when approved

### Twitter API

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create new project
3. Generate Bearer Token
4. Copy and save

### Substack API

1. Go to https://substack.com/api
2. Generate API key
3. Copy and save

### SendGrid API

1. Go to https://sendgrid.com
2. Create API key
3. Copy and save

---

## Post-Deployment Verification

### 1. Test Backend Health

```bash
curl https://the-arena-api.fly.dev/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-22T..."
}
```

### 2. Test Quad-Exposure

```bash
curl -X POST https://the-arena-api.fly.dev/api/quad-exposure \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is THE ARENA?"}'
```

### 3. Test Frontend

Visit: `https://the-arena.vercel.app` (or your custom domain)

---

## Monitoring

### Fly.io Monitoring

```bash
fly status
fly logs
fly metrics
```

### Vercel Monitoring

1. Go to Vercel dashboard
2. Select your project
3. View Analytics and Logs

---

## Scaling

### Fly.io Scaling

```bash
# Scale to 2 instances
fly scale count 2

# Scale to 4 CPU cores
fly scale vm performance-4
```

### Vercel Scaling

Vercel automatically scales based on traffic. No manual configuration needed.

---

## Troubleshooting

### Backend Won't Deploy

```bash
# Check logs
fly logs

# Rebuild
fly deploy --force-machines

# Check status
fly status
```

### Frontend Build Fails

1. Check Vercel logs
2. Verify environment variables are set
3. Ensure `NEXT_PUBLIC_API_URL` is correct

### API Calls Failing

1. Verify API keys are set correctly
2. Check rate limits on each service
3. Review backend logs: `fly logs`

---

## Cost Optimization

### Fly.io

- **Free tier**: Up to 3 shared-cpu-1x 256MB VMs
- **Paid**: $0.0000152/second per VM
- **Recommendation**: Start with 1 instance, scale as needed

### Vercel

- **Free tier**: Unlimited deployments, 100GB bandwidth
- **Pro**: $20/month, 1TB bandwidth
- **Recommendation**: Free tier sufficient for MVP

---

## Security Checklist

- [x] All API keys stored as secrets (not in code)
- [x] HTTPS enabled on all endpoints
- [x] CORS configured properly
- [x] Input validation implemented
- [x] Error handling in place
- [x] Health checks configured
- [x] Monitoring enabled
- [x] Backups configured (Fly.io volumes)

---

## Maintenance

### Weekly

- Check logs for errors
- Monitor API rate limits
- Review performance metrics

### Monthly

- Update dependencies
- Review security advisories
- Optimize database queries

### Quarterly

- Full security audit
- Performance optimization
- Capacity planning

---

## Rollback Procedure

### Vercel Rollback

1. Go to Vercel dashboard
2. Select project
3. Go to Deployments
4. Click "Rollback" on previous deployment

### Fly.io Rollback

```bash
# List recent releases
fly releases

# Rollback to previous release
fly releases rollback
```

---

## Support

For deployment issues:

1. Check logs: `fly logs` or Vercel dashboard
2. Verify environment variables
3. Test locally first: `npm run dev`
4. Check service status pages:
   - Fly.io: https://status.fly.io
   - Vercel: https://www.vercel-status.com

---

## Next Steps

1. Deploy backend to Fly.io
2. Deploy frontend to Vercel
3. Configure custom domain
4. Set up monitoring and alerts
5. Test end-to-end flow
6. Launch publicly

---

**Built by NO_GAS_LABS™**

*The future of thought is collaborative. The future of collaboration is cognitive.*
