# Project Context

## Current Production Setup

This is a Next.js App Router site for the `siteforclient` project. It was previously deployed on Vercel. Production now runs on a single Cloud.ru Ubuntu VM with Docker Compose, Nginx, and Certbot.

- Repository: `https://github.com/Clu4er/siteforclient`
- Production domain: `techno-comfort.pro`
- WWW domain: `www.techno-comfort.pro`
- Cloud.ru VM IP: `95.174.92.90`
- SSH user: `user1`
- Server project path: `/var/www/siteforclient`
- Docker Compose service/container: `next-app`
- Production branch: `main`
- Development branch: `dev`
- Temporary Docker setup branch: `deploy/docker-setup-clean`

Do not commit private keys, `.pem` files, `.env.production`, passwords, API tokens, or generated server secrets.

## Branch Model

Use `dev` for normal development and content work. Use `main` only as the production branch. The production server deploys from `main`.

The temporary `deploy/docker-setup-clean` branch exists only to introduce Docker, server, CI, and documentation files. After it is merged into `main`, future production deploys should come from `main`.

Do not merge the old mixed PR from `dev` to `main` if it still exists. Close it and use clean PRs instead.

## Server Model

Production uses this simple flow:

```text
GitHub main -> Cloud.ru VM -> Docker Compose -> Next.js container -> Nginx -> Certbot HTTPS
```

The server runs the app on `127.0.0.1:3000` inside Docker and exposes the public site through Nginx on ports `80` and `443`.

`NEXT_PUBLIC_SITE_URL` is needed at Docker build time so `robots.txt`, `sitemap.xml`, and canonical URLs are generated with the production domain.

## How To Verify Production

On the server:

```bash
cd /var/www/siteforclient
docker compose ps
curl -I http://localhost:3000
curl -I https://techno-comfort.pro
curl -I https://www.techno-comfort.pro
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

Expected result: `next-app` is `Up`, both HTTPS domains return `200 OK`, and SEO files use `https://techno-comfort.pro`.

## Automatic Deploy

GitHub Actions workflow: `.github/workflows/deploy.yml`.

Trigger: push to `main`, plus manual `workflow_dispatch`.

Required GitHub Secrets:

- `CLOUDRU_HOST`: `95.174.92.90`
- `CLOUDRU_USER`: `user1`
- `CLOUDRU_SSH_KEY`: private SSH key allowed to connect to the VM
- `CLOUDRU_PROJECT_PATH`: `/var/www/siteforclient`

Use a dedicated deploy SSH key if possible. Add its public key to `/home/user1/.ssh/authorized_keys` on the VM and store only the private key in GitHub Secrets.

## How To Work From Here

1. Make new changes in `dev`.
2. Test locally:

```bash
npm ci
npm run build
```

3. Commit and push `dev`.
4. Open a PR from `dev` to `main`.
5. Merge only production-ready changes into `main`.
6. GitHub Actions deploys `main` to Cloud.ru automatically.
7. Verify `https://techno-comfort.pro` and `https://www.techno-comfort.pro`.

If automatic deploy fails, open GitHub Actions logs and check the SSH/deploy step output.

## Manual Deploy

```bash
ssh user1@95.174.92.90 -i "C:\test\siteforclient\pem\siteforclient-prod.pem"
cd /var/www/siteforclient
git fetch origin main
git checkout main
git pull --ff-only origin main
docker compose up -d --build
docker image prune -f
docker compose ps
curl -I http://localhost:3000
curl -I https://techno-comfort.pro
curl -I https://www.techno-comfort.pro
```

## Rollback

On the server:

```bash
cd /var/www/siteforclient
git log --oneline -10
git checkout <GOOD_COMMIT_HASH>
docker compose up -d --build
```

After the fix is merged:

```bash
git checkout main
git pull origin main
docker compose up -d --build
```

## Restore Work From Scratch

If the local Codex workspace or project folder was deleted:

```bash
git clone https://github.com/Clu4er/siteforclient.git
cd siteforclient
git checkout dev
git pull origin dev
npm ci
npm run dev
```

Before making production-related changes, read:

- `PROJECT_CONTEXT.md`
- `DEPLOY.md`

Work in `dev`, not directly in `main`. Do not store SSH keys or env files in the repository. Production deploy should happen through PR into `main` and GitHub Actions.
