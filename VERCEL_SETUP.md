# Vercel Deployment Setup Guide

This guide will help you deploy your Synergies4 application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your Supabase project credentials
3. API keys for the services you plan to use

## Step 1: Configure Environment Variables

Before deploying, you need to set up environment variables in Vercel. Go to your Vercel project settings:

1. Navigate to your project on Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Variables

These are **REQUIRED** for the application to build and run:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_URL=https://your-vercel-app.vercel.app
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

> **Important**: Replace the URL values with your actual Vercel deployment URL after the first deployment.

### Stripe Configuration (Required for Payment Features)

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### AI Provider Keys (At Least One Required)

Choose at least one AI provider:

**Anthropic (Claude)**
```
ANTHROPIC_API_KEY=your_anthropic_api_key
```

**OpenAI (GPT)**
```
OPENAI_API_KEY=your_openai_api_key
```

**Google AI (Gemini)**
```
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

### Optional Variables

These are optional and only needed if you're using specific features:

```
# Meeting Recording
RECALL_API_KEY=your_recall_api_key
FIREFLIES_API_KEY=your_fireflies_api_key
ZOOM_JWT_TOKEN=your_zoom_jwt_token
ZOOM_LEAVE_URL=https://your-app.vercel.app/meetings

# OCR for Resume Parsing
OCR_SPACE_API_KEY=your_ocr_space_api_key

# Miro Integration
MIRO_ACCESS_TOKEN=your_miro_access_token

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret

# Environment
NODE_ENV=production
```

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add all environment variables (from Step 1)
7. Click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

## Step 3: Update URLs

After your first deployment:

1. Copy your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
2. Update these environment variables in Vercel:
   - `NEXT_PUBLIC_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXTAUTH_URL` (if using)
   - `ZOOM_LEAVE_URL` (if using)
3. Redeploy the application

## Step 4: Configure Supabase

Update your Supabase project settings:

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Vercel URL to:
   - Site URL: `https://your-app.vercel.app`
   - Redirect URLs: `https://your-app.vercel.app/**`

## Step 5: Configure Stripe Webhooks

If you're using Stripe payments:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Set endpoint URL: `https://your-app.vercel.app/api/stripe/webhooks`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Webhook Signing Secret** and add it to Vercel as `STRIPE_WEBHOOK_SECRET`

## Troubleshooting

### Build Fails with "Neither apiKey nor config.authenticator provided"

This means Stripe environment variables are not set. Make sure `STRIPE_SECRET_KEY` is configured in Vercel.

### "Supabase URL not defined" Error

Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in Vercel.

### AI Features Not Working

Ensure at least one of these is set:
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `GOOGLE_AI_API_KEY`

### Check Environment Variables

You can verify your environment variables are set by:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all required variables are present
3. Redeploy if you added new variables

## Getting API Keys

- **Supabase**: https://app.supabase.com → Your Project → Settings → API
- **Stripe**: https://dashboard.stripe.com/apikeys
- **Anthropic**: https://console.anthropic.com/
- **OpenAI**: https://platform.openai.com/api-keys
- **Google AI**: https://makersuite.google.com/app/apikey
- **Recall.ai**: https://recall.ai/docs
- **OCR Space**: https://ocr.space/ocrapi

## Need Help?

If you encounter any issues:
1. Check the Vercel deployment logs
2. Verify all environment variables are correctly set
3. Make sure your Supabase database is properly configured
4. Check that your API keys are valid and have the correct permissions

