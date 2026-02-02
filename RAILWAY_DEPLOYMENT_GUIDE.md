# Railway Deployment Guide for Beginners

## ✅ Pre-Deployment Checklist

Your project is **ready to deploy**! The build errors are fixed and your code is committed locally.

## 🚂 Step-by-Step Railway Deployment

### Step 1: Install Railway CLI (Optional but Recommended)

```powershell
npm install -g @railway/cli
```

### Step 2: Login to Railway

```powershell
railway login
```

This will open your browser for authentication.

### Step 3: Initialize Railway Project

From your project directory:

```powershell
cd C:\Users\Pranav N J\Downloads\suraksha666\suraksha6
railway init
```

Choose:
- Create a new project
- Give it a name (e.g., "suraksha-app")

### Step 4: Link Your GitHub Repository

**Option A: Using Railway CLI**
```powershell
railway link
```

**Option B: Using Railway Dashboard (Easier for Beginners)**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account
5. Select your repository (suraksha4)
6. Railway will automatically detect your configuration

### Step 5: Add Environment Variables

In Railway Dashboard:

1. Go to your project
2. Click on "Variables" tab
3. Add these required variables:

```
DATABASE_URL=<your-database-url>
SESSION_SECRET=<random-secret-string>
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-token>
TWILIO_WHATSAPP_NUMBER=<your-whatsapp-number>
ASSEMBLYAI_API_KEY=<your-assemblyai-key>
SENDGRID_API_KEY=<your-sendgrid-key>
NODE_ENV=production
PORT=3000
```

### Step 6: Add PostgreSQL Database (If Needed)

1. In Railway Dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create `DATABASE_URL` variable

### Step 7: Deploy

**Automatic Deployment:**
- Push to GitHub: `git push origin main`
- Railway will automatically detect and deploy

**Manual Deployment via CLI:**
```powershell
railway up
```

### Step 8: Monitor Deployment

1. In Railway Dashboard, click on your service
2. Go to "Deployments" tab
3. Watch the build logs
4. Once complete, click "View Logs" to see runtime logs

### Step 9: Get Your App URL

1. In Railway Dashboard, go to "Settings"
2. Click "Generate Domain"
3. Your app will be available at `https://your-app.railway.app`

## 🔧 Important Configuration Files

Your project already has these configured:

- ✅ `railway.json` - Railway deployment config
- ✅ `Procfile` - Process definition
- ✅ `package.json` - Build and start scripts

## 📱 Environment Variables You'll Need

Before deploying, make sure you have:

1. **Twilio Account** (for SMS/WhatsApp)
   - Sign up at [twilio.com](https://twilio.com)
   - Get Account SID and Auth Token

2. **AssemblyAI** (for speech recognition)
   - Sign up at [assemblyai.com](https://assemblyai.com)
   - Get API key

3. **SendGrid** (for emails)
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Get API key

## 🐛 Troubleshooting

### Build Fails
- Check Railway logs in Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### App Crashes on Start
- Check environment variables are set correctly
- Review runtime logs in Railway Dashboard
- Ensure `DATABASE_URL` is valid

### Database Connection Issues
- Verify PostgreSQL is provisioned in Railway
- Check `DATABASE_URL` format
- Ensure database migrations ran successfully

## 🎯 Quick Start (Fastest Method)

If you just want to deploy quickly:

1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Add PostgreSQL database
6. Add environment variables
7. Click "Deploy"

That's it! Railway handles everything else automatically.

## 📞 Next Steps After Deployment

1. Test your app URL
2. Set up custom domain (optional)
3. Configure webhooks for Twilio
4. Test emergency features
5. Monitor logs and metrics

## 💡 Tips for Beginners

- **Free Tier**: Railway offers $5 free credit monthly
- **Auto-deploys**: Every git push triggers a new deployment
- **Rollbacks**: Easy to rollback to previous deployments
- **Logs**: Always check logs if something goes wrong
- **Environment**: Use Railway's environment variables, never commit secrets

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Your Railway Dashboard](https://railway.app/dashboard)
