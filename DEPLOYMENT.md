# Deployment Guide

Complete guide to deploy your Pradhan portfolio to various hosting platforms.

## 🚀 Quick Start (Local Development)

### Using Python
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

### Using Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run from portfolio directory
http-server

# Or use live-server for auto-reload
npm install -g live-server
live-server
```

### Using VS Code
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

---

## 📍 Popular Hosting Platforms

### 1. **Vercel** (Recommended for performance)

Most optimized for modern web apps with zero configuration.

#### Via Git:
```bash
# 1. Push code to GitHub
git add .
git commit -m "Initial portfolio"
git push origin main

# 2. Go to vercel.com and sign up with GitHub
# 3. Click "New Project"
# 4. Import your portfolio repository
# 5. Click "Deploy"
```

#### Via CLI:
```bash
npm i -g vercel
vercel
```

**Pros**: Fast, free tier, automatic SSL, high performance
**Cons**: No backend support (but not needed)

---

### 2. **Netlify** (Great alternative)

Easy Git integration with excellent build options.

#### Via Git:
```bash
# 1. Push to GitHub/GitLab/Bitbucket
# 2. Drop your site folder directly on netlify.com
# OR sign in with git provider
# 3. Auto deploys on push
```

#### Via CLI:
```bash
npm i -g netlify-cli
netlify deploy
```

**Pros**: Great DX, automatic SSL, form handling, free tier
**Cons**: Limited serverless functions on free plan

---

### 3. **GitHub Pages** (Free & Simple)

Perfect for portfolio sites with direct GitHub integration.

#### Steps:
```bash
# 1. Create a GitHub repository named "portfolio"
# 2. Push your code
git push origin main

# 3. Go to Settings → Pages
# 4. Select "main" branch as source
# 5. Your site is live at username.github.io/portfolio
```

**Pros**: Free, no build step, great for portfolios
**Cons**: No custom domain without upgrade

---

### 4. **AWS Amplify**

Full AWS integration with advanced features.

```bash
# 1. Install Amplify CLI
npm install -g @aws-amplify/cli

# 2. Initialize
amplify init

# 3. Add hosting
amplify add hosting

# 4. Publish
amplify publish
```

**Pros**: Powerful features, good integration, scalable
**Cons**: More complex, potential costs

---

### 5. **Cloudflare Pages**

Fast, free tier with global CDN.

```bash
# 1. Connect Git repository to Cloudflare Pages
# 2. Set Build Command: (leave empty)
# 3. Set Build Output Directory: /
# 4. Deploy
```

**Pros**: Fast CDN, free, good security
**Cons**: Limited features vs. Vercel/Netlify

---

### 6. **Traditional Hosting (Bluehost, GoDaddy, etc.)**

If you have existing hosting:

```bash
1. Upload files via FTP/SFTP
2. Ensure index.html is in public_html
3. Update domain DNS (if using custom domain)
4. Your site is live
```

**Tools for uploading**:
- FileZilla (FTP client)
- cPanel File Manager
- SSH/Terminal

---

## 🌐 Custom Domain Setup

### If using Vercel/Netlify/GitHub Pages

1. **Buy domain** from: GoDaddy, Namecheap, Google Domains, etc.
2. **Update DNS settings**:
   - Go to domain registrar
   - Find DNS management
   - Update nameservers or A records to point to your host

3. **Configure in your hosting**:
   - Vercel/Netlify: Add domain in settings
   - GitHub Pages: Add to CNAME file
   - AWS/Cloudflare: Follow their docs

---

## 🔒 SSL Certificate

Most modern hosts provide free SSL automatically. If not:

- **Let's Encrypt**: Free SSL, auto-renewal
- **Cloudflare**: Free universal SSL
- **AWS Certificate Manager**: Free for AWS services

---

## 🚦 Performance Optimization

### Before Deployment

1. **Minify CSS & JS**:
```bash
# Using build tools or online tools
# style.css → style.min.css
# script.js → script.min.js
```

2. **Optimize Images**:
```bash
# Use tools like TinyPNG, ImageOptim
# Reduce file sizes without losing quality
```

3. **Enable Gzip compression**:
```
# Most hosts do this automatically
# Verify in deployment settings
```

### For Lightning Fast Performance

- Use CDN for external libraries (already done with CDNs in HTML)
- Lazy load images (`loading="lazy"`)
- Remove unused CSS/JS
- Minimize external requests

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Automate testing and deployment:

**Create `.github/workflows/deploy.yml`**:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📊 Analytics Setup

### Option 1: Google Analytics

Add to `index.html` in `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtags/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Option 2: Plausible (Privacy-focused)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Option 3: Fathom (Simple & GDPR compliant)

```html
<script src="https://cdn.usefathom.com/script.js" data-site="XXXXX" defer></script>
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] Update contact email and phone numbers
- [ ] Add real project links and descriptions
- [ ] Update social media links
- [ ] Test all forms and buttons
- [ ] Check mobile responsiveness
- [ ] Verify all animations work smoothly
- [ ] Run lighthouse audit
- [ ] Test on multiple browsers
- [ ] Set up analytics
- [ ] Configure custom domain
- [ ] Enable SSL certificate
- [ ] Set up email forwarding (if using custom domain)
- [ ] Create sitemap.xml (already included)
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Add favicon (optional but recommended)

---

## 🚀 Recommended Deployment Flow

1. **Development**: Test locally with `live-server`
2. **Repository**: Push to GitHub
3. **Staging**: Deploy to Vercel/Netlify preview
4. **Production**: Merge to main, auto-deploy
5. **Monitoring**: Use analytics to track visitors

---

## 🆘 Troubleshooting

### "404 Not Found"
- Ensure `index.html` is in root
- Check file naming (case-sensitive)

### "Styles not loading"
- Check CSS file path
- Verify no CSS minification issues
- Clear browser cache

### "Scripts not working"
- Check JavaScript console for errors
- Verify script.js is in root
- Check CDN links are working

### "Slow site"
- Optimize images
- Use CDN for large files
- Enable gzip compression
- Minimize external requests

---

## 📚 Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages Docs**: https://pages.github.com
- **Google Domains**: https://domains.google
- **Let's Encrypt**: https://letsencrypt.org
- **Google Search Console**: https://search.google.com/search-console

---

**Happy Deploying! Your portfolio is ready to impress. 🚀**
