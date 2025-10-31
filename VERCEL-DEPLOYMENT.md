# Vercel Deployment Guide

## 🚨 Issue: 404 NOT_FOUND Error

**Problem**: You were trying to deploy the entire repository root, but the Next.js app is in the `restaurant-template/` subdirectory.

**Solution**: Configure Vercel to use `restaurant-template` as the root directory.

## ✅ Fix Applied

Created `vercel.json` in the repository root with:

```json
{
  "buildCommand": "cd restaurant-template && npm run build",
  "devCommand": "cd restaurant-template && npm run dev",
  "installCommand": "cd restaurant-template && npm install",
  "framework": "nextjs",
  "outputDirectory": "restaurant-template/.next",
  "rootDirectory": "restaurant-template"
}
```

This tells Vercel:
- The Next.js app is in the `restaurant-template/` folder
- All build commands should run from that directory
- The output is in `restaurant-template/.next`

## 🚀 Deployment Steps

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Import Your GitHub Repository**:
   - Click "Add New" → "Project"
   - Select your GitHub repository: `Lordsisodia/restaurant-template`
   - Vercel will automatically detect the `vercel.json` configuration

3. **Configure Environment Variables**:
   Add these in the Vercel dashboard under "Environment Variables":

   ```bash
   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dshngtiww
   CLOUDINARY_API_KEY=724254789351712
   CLOUDINARY_API_SECRET=0S1bLHETwbRGvMI3bma-NVy36Fo
   CLOUDINARY_URL=cloudinary://724254789351712:0S1bLHETwbRGvMI3bma-NVy36Fo@dshngtiww

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://ntrklmkzyfnrtfbpdypd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTgxOTgsImV4cCI6MjA3NjQ3NDE5OH0._hp302cCRB7eVtbOy0hAtZLTLOgFi79tFnYDBFN2KEY
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cmtsbWt6eWZucnRmYnBkeXBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDg5ODE5OCwiZXhwIjoyMDc2NDc0MTk4fQ.n89iQYpvla361d5DT9b9D3fbZxcmqx20RNNd4vP5fcg

   # Restaurant Config
   DEFAULT_RESTAURANT_ID=00000000-0000-0000-0000-000000000003
   DEFAULT_RESTAURANT_SLUG=draco-coffee
   DEFAULT_TENANT_GROUP=pod-alpha
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build from the `restaurant-template` directory
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# Deploy from repository root
vercel

# Follow prompts:
# - Link to existing project or create new
# - Vercel will auto-detect vercel.json configuration
# - Confirm settings

# Deploy to production
vercel --prod
```

## 🔍 Verification

After deployment, verify:

1. **Build Logs**: Check that build runs from `restaurant-template/`
2. **Environment Variables**: Ensure all variables are set
3. **App Functionality**: Test key features:
   - Homepage loads
   - Menu page works
   - Blog posts render
   - Supabase connection works
   - Cloudinary images load

## 🐛 Troubleshooting

### Issue: Still getting 404

**Check**:
1. Verify `vercel.json` is in the **root** of your repository
2. Ensure `rootDirectory: "restaurant-template"` is set
3. Check Vercel dashboard → Project Settings → Root Directory

### Issue: Build Fails

**Check**:
1. Environment variables are set correctly
2. All dependencies in `restaurant-template/package.json` are correct
3. Check build logs for specific errors

### Issue: Environment Variables Not Working

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add ALL variables from `.env.local`
3. Select which environments (Production, Preview, Development)
4. Redeploy after adding variables

## 📋 Deployment Checklist

Before deploying:

- [x] `vercel.json` created in repository root
- [ ] All environment variables added to Vercel dashboard
- [ ] GitHub repository pushed with latest changes
- [ ] Database migrations run (if any)
- [ ] Cloudinary assets uploaded
- [ ] Domain configured (optional)

After deploying:

- [ ] Test homepage
- [ ] Test menu page
- [ ] Test blog posts
- [ ] Test Supabase queries
- [ ] Test image loading
- [ ] Check console for errors
- [ ] Verify mobile responsiveness

## 🌐 Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (5-30 minutes)

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Every push to `main`** triggers a production deployment
- **Every pull request** gets a preview deployment
- No manual deployment needed!

## 📞 Support

If issues persist:
- Check Vercel logs: Dashboard → Your Project → Deployments → Click deployment → Logs
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Summary**: The `vercel.json` file now tells Vercel to deploy from the `restaurant-template/` directory instead of the repository root. This fixes the 404 NOT_FOUND error.
