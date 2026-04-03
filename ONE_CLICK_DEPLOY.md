# THE ARENA - One-Click Deployment

**Deploy THE ARENA to production in 5 minutes with one command.**

---

## Prerequisites (Get These First)

Before running the deployment script, you need:

### 1. GitHub Account
- Create account at https://github.com
- Generate Personal Access Token:
  - Go to https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select scopes: `repo`, `workflow`
  - Copy the token

### 2. Fly.io Account
- Create account at https://fly.io
- Generate API Token:
  - Go to https://fly.io/user/personal_access_tokens
  - Click "Create API Token"
  - Copy the token

### 3. Vercel Account
- Create account at https://vercel.com
- Generate API Token:
  - Go to https://vercel.com/account/tokens
  - Click "Create"
  - Copy the token

### 4. API Keys (Get These)
- **Gemini**: https://ai.google.dev → "Get API Key"
- **OpenAI**: https://platform.openai.com/api-keys → "Create new secret key"
- **Anthropic**: https://console.anthropic.com/keys → "Create Key"
- **xAI**: https://x.ai → Request API access
- **Twitter**: https://developer.twitter.com → Create project → Generate Bearer Token
- **Substack**: https://substack.com/api → Generate API key
- **SendGrid**: https://sendgrid.com → Create API key

---

## One-Click Deployment

### Step 1: Open Terminal

```bash
cd /home/ubuntu/the-arena-website
```

### Step 2: Run Deployment Script

```bash
./deploy.sh
```

### Step 3: Follow Prompts

The script will ask you for:
1. GitHub username
2. GitHub token (paste the one you created)
3. Fly.io token (paste the one you created)
4. Vercel token (paste the one you created)
5. All API keys (one by one)

### Step 4: Wait for Deployment

The script will:
1. ✅ Push code to GitHub
2. ✅ Deploy backend to Fly.io
3. ✅ Deploy frontend to Vercel
4. ✅ Configure environment variables
5. ✅ Verify everything is working

**Total time: ~5-10 minutes**

---

## After Deployment

Your app will be live at:

- **Frontend**: https://the-arena.vercel.app
- **Backend**: https://the-arena-api.fly.dev
- **GitHub**: https://github.com/YOUR_USERNAME/the-arena

---

## What Gets Deployed

### Frontend (Vercel)
- Beautiful landing page
- Feature showcase
- System overview
- Call-to-action sections
- Responsive design

### Backend (Fly.io)
- Quad-exposure API (4 AI models)
- Publishing API (Twitter, Substack, Email)
- Blockchain API (Solana, Base)
- Health checks and monitoring

---

## Troubleshooting

### Script Won't Run
```bash
chmod +x deploy.sh
./deploy.sh
```

### Missing Tools
```bash
# Install Node.js
curl https://nodejs.org/dist/v20.0.0/node-v20.0.0-linux-x64.tar.xz | tar xJ

# Install git
sudo apt-get install git

# Install Fly CLI
curl -L https://fly.io/install.sh | sh
```

### Tokens Not Working
- Verify token has correct scopes
- Check token hasn't expired
- Generate new token if needed

### API Keys Invalid
- Double-check each key is correct
- Verify API provider account is active
- Check for rate limits

---

## Manual Deployment (If Script Fails)

### Push to GitHub
```bash
cd /home/ubuntu/the-arena-website
git remote add origin https://github.com/YOUR_USERNAME/the-arena.git
git branch -M main
git push -u origin main
```

### Deploy Backend
```bash
fly auth login
cd backend
fly launch --name the-arena-api
fly secrets set GEMINI_API_KEY="..." [etc]
fly deploy
```

### Deploy Frontend
1. Go to https://vercel.com/new
2. Import GitHub repository
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Click Deploy

---

## Verify Deployment

### Check Backend
```bash
curl https://the-arena-api.fly.dev/health
```

Expected response:
```json
{"status":"ok","timestamp":"..."}
```

### Check Frontend
Visit: https://the-arena.vercel.app

Should see THE ARENA landing page.

---

## Costs

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | Free | Generous free tier |
| Fly.io | $5-50/mo | Pay as you go |
| AI APIs | $10-100/mo | Usage-based |
| **Total** | **$15-150/mo** | Highly scalable |

---

## Support

If deployment fails:

1. Check logs:
   ```bash
   fly logs
   ```

2. Check Vercel dashboard:
   - https://vercel.com/dashboard

3. Review error messages in script output

4. See DEPLOY.md for detailed instructions

---

## Next Steps

1. ✅ Run `./deploy.sh`
2. ✅ Wait for deployment
3. ✅ Visit https://the-arena.vercel.app
4. ✅ Test quad-exposure feature
5. ✅ Share with users!

---

**Built by NO_GAS_LABS™**

*The future of thought is collaborative. The future of collaboration is cognitive.*

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `./deploy.sh` | Deploy everything |
| `fly logs` | View backend logs |
| `vercel logs` | View frontend logs |
| `fly status` | Check backend status |
| `vercel status` | Check frontend status |

---

**Ready to deploy? Run: `./deploy.sh`**
