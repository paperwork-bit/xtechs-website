# Deploy to Cloudflare Pages from Your Terminal

## Run from the **xtechs-website** folder

Wrangler looks for `.vercel/output/static` **inside the current directory**. If you run the deploy from the parent folder (`xTechs Website`), you get:

```text
ENOENT: no such file or directory, scandir '.../xTechs Website/.vercel/output/static'
```

So always **cd into the app first**:

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
```

## Build + deploy in one go (recommended)

This builds (creating `.vercel/output/static`) then deploys:

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"

CLOUDFLARE_API_TOKEN="your-token" npm run cf:deploy
```

Or with the token in the environment:

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"
export CLOUDFLARE_API_TOKEN="your-token"
npm run cf:deploy
```

## Build and deploy in two steps

If you want to run the deploy command yourself:

```bash
cd "/Users/abcom/Desktop/xTechs Website/xtechs-website"

# 1. Build (creates .vercel/output/static)
npm run build:cloudflare

# 2. Deploy (must run from xtechs-website so .vercel/output/static exists here)
CLOUDFLARE_API_TOKEN="your-token" npx wrangler pages deploy .vercel/output/static --project-name=xtechs-website --branch=master --commit-dirty=true
```

## Checklist

- [ ] Current directory is `xtechs-website` (not the parent `xTechs Website`)
- [ ] Build has been run at least once so `.vercel/output/static` exists
- [ ] `CLOUDFLARE_API_TOKEN` has User → Memberships → Read and Account → Cloudflare Pages → Edit
