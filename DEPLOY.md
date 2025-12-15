# Deployment Guide

This guide explains how to deploy the Motion Mechanics Investment Simulator to GitHub Pages.

## 🚀 Quick Start

The site automatically deploys to GitHub Pages when you push to the `gh-pages` branch. The deployment is handled by GitHub Actions.

**Live URL**: `https://<your-username>.github.io/<repository-name>/`

---

## 📋 One-Time Setup

Before your first deployment, you need to enable GitHub Pages in your repository:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`
4. Click **Save**

That's it! The GitHub Actions workflow is already configured.

### 2. Verify Workflow Permissions

Ensure the workflow has proper permissions:

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

---

## 🔄 Automatic Deployment

Every push to the `gh-pages` branch triggers an automatic deployment:

```bash
git add .
git commit -m "Your commit message"
git push origin gh-pages
```

**What happens:**
1. GitHub Actions builds your application
2. TypeScript compiles and validates all code
3. Vite builds the production bundle
4. Assets are deployed to GitHub Pages
5. Your site goes live at `https://<your-username>.github.io/<repository-name>/`

**Monitor deployment:**
- Go to **Actions** tab in your repository
- Click on the latest workflow run
- Watch the build and deploy progress

---

## 🎯 Manual Deployment

You can manually trigger a deployment without pushing code:

1. Go to **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the `gh-pages` branch
5. Click **Run workflow**

---

## 🌐 Custom Domain (Optional)

To use a custom domain like `calculator.yourdomain.com`:

### 1. Configure DNS

Add a CNAME record with your DNS provider:

```
Type:  CNAME
Name:  calculator (or your subdomain)
Value: <your-username>.github.io
```

### 2. Update Repository Settings

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `calculator.yourdomain.com`
3. Check **Enforce HTTPS**
4. Click **Save**

### 3. Add CNAME File

Create a file named `CNAME` in the `public` folder:

```bash
echo "calculator.yourdomain.com" > public/CNAME
```

Commit and push:

```bash
git add public/CNAME
git commit -m "Add custom domain"
git push origin gh-pages
```

### 4. Update Vite Config

If using a custom domain at the root path, update `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/', // Use root path for custom domain
})
```

---

## 🧪 Local Preview

Test the production build locally before deploying:

```bash
# Build the production bundle
npm run build

# Preview the production build
npm run preview
```

Open `http://localhost:4173` to see the production build.

---

## 🔍 Troubleshooting

### Blank Page After Deployment

**Problem**: The site loads but shows a blank page.

**Solution**: The base path might be incorrect. Verify in `vite.config.ts`:
- For `<username>.github.io/<repo-name>/`: Base should be `/<repo-name>/`
- For custom domain: Base should be `/`

### 404 on Page Refresh

**Problem**: Direct navigation to routes (e.g., `/about`) shows 404.

**Solution**: GitHub Pages doesn't support SPA routing by default. Add a `404.html` that redirects to `index.html`:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

Then in `index.html`, add this script before other scripts:

```html
<script>
  (function(){
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      history.replaceState(null, null, redirect);
    }
  })();
</script>
```

### Build Fails

**Problem**: GitHub Actions workflow fails during build.

**Solution**: 
1. Check the Actions log for specific errors
2. Run `npm run build` locally to reproduce
3. Ensure all dependencies are in `package.json`
4. Verify TypeScript has no errors: `npm run lint`

### Assets Not Loading

**Problem**: CSS/JS files return 404.

**Solution**: 
1. Verify the base path in `vite.config.ts` matches your deployment URL
2. Check that assets are referenced with relative paths
3. Clear browser cache and hard refresh (Ctrl+Shift+R)

---

## 📊 Monitoring Deployments

### Check Deployment Status

```bash
# View recent deployments
gh run list --workflow=deploy.yml

# View specific deployment details
gh run view <run-id>

# Watch live deployment
gh run watch
```

### Rollback to Previous Version

If a deployment breaks:

1. Go to **Actions** tab
2. Find the last successful deployment
3. Click **Re-run all jobs**

Or revert the commit:

```bash
git revert HEAD
git push origin gh-pages
```

---

## 🎨 Build Optimization

### Analyzing Bundle Size

```bash
# Install analyzer
npm install --save-dev rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
})

# Build and analyze
npm run build
```

### Reducing Bundle Size

- Use dynamic imports for large dependencies
- Enable code splitting in Vite
- Optimize images (WebP format, lazy loading)
- Remove unused Tailwind classes with purge

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] Build completes without errors: `npm run build`
- [ ] Preview works correctly: `npm run preview`
- [ ] No console errors in browser
- [ ] All features tested in production build
- [ ] Meta tags and SEO are configured
- [ ] Analytics tracking is set up (if needed)
- [ ] Environment variables are configured
- [ ] Custom domain DNS is configured (if applicable)

---

## 🆘 Getting Help

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
3. Check [Actions workflow logs](https://github.com/<username>/<repo>/actions)
4. Open an issue in the repository

---

## 🔐 Security Notes

- Never commit API keys or secrets to the repository
- Use GitHub Secrets for sensitive environment variables
- Enable **Enforce HTTPS** in GitHub Pages settings
- Keep dependencies updated: `npm audit fix`

---

**Next Steps**: Push your changes to `gh-pages` branch and watch your site go live! 🎉
