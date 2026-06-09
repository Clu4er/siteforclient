# siteforclient

Next.js App Router project for the Techno Comfort commercial site.

## Local Development

Use the `dev` branch for normal work.

```bash
npm ci
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

Production build check:

```bash
npm run build
```

## Branches

- `dev` - development and content work
- `main` - production branch
- `deploy/docker-setup-clean` - temporary Docker migration branch

Do not work directly in `main` unless it is an urgent production hotfix.

## Production

Production runs on a Cloud.ru VM.

- Domain: `techno-comfort.pro`
- WWW domain: `www.techno-comfort.pro`
- Server IP: `95.174.92.90`
- Server path: `/var/www/siteforclient`
- Docker service/container: `next-app`
- Deployment docs: `DEPLOY.md`
- Project handoff context: `PROJECT_CONTEXT.md`

The production flow is:

```text
dev -> PR -> main -> GitHub Actions -> Cloud.ru VM -> Docker Compose -> Nginx -> Certbot HTTPS
```

## Deployment

Manual and automatic deployment instructions are in `DEPLOY.md`.

Automatic deploy uses:

```text
.github/workflows/deploy.yml
```

Required GitHub Secrets:

- `CLOUDRU_HOST`
- `CLOUDRU_USER`
- `CLOUDRU_SSH_KEY`
- `CLOUDRU_PROJECT_PATH`

Never commit `.env.production`, `.env.local`, `.pem` files, passwords, tokens, or private keys.

## Recovery

If the local workspace is deleted:

```bash
git clone https://github.com/Clu4er/siteforclient.git
cd siteforclient
git checkout dev
git pull origin dev
npm ci
npm run dev
```

Read `PROJECT_CONTEXT.md` and `DEPLOY.md` before production work.
