# Deploy

Production runs on a Cloud.ru Ubuntu VM with Docker Compose, Nginx, and Certbot.

- Domain: `techno-comfort.pro`
- WWW domain: `www.techno-comfort.pro`
- Server IP: `95.174.92.90`
- SSH user: `user1`
- Server path: `/var/www/siteforclient`
- Docker service/container: `next-app`
- Production branch: `main`
- Development branch: `dev`
- Workflow: `.github/workflows/deploy.yml`

Do not commit `.env.production`, `.env.local`, `.pem`, passwords, tokens, or private keys.

## Cloud.ru Security Group

The VM needs inbound access:

- TCP `80` from `0.0.0.0/0`
- TCP `443` from `0.0.0.0/0`
- TCP `22` for SSH, ideally restricted to the owner's IP

The Ubuntu firewall can be checked with:

```bash
sudo ufw status
```

Cloud.ru security group rules must be checked in the Cloud.ru panel.

## Server Preparation

Install base packages:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl nginx certbot python3-certbot-nginx ca-certificates
```

Install Docker and Compose on Ubuntu 22.04:

```bash
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

Log out and back in after `usermod`, then verify:

```bash
docker --version
docker compose version
```

## Initial Clone

Production should use `main`:

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone -b main https://github.com/Clu4er/siteforclient.git
cd siteforclient
```

During the first Docker migration only, the server may temporarily run `deploy/docker-setup-clean`.

## Production Env

Create the env file on the server only:

```bash
cd /var/www/siteforclient
cp .env.example .env.production
chmod 600 .env.production
nano .env.production
```

Minimum production values:

```env
NEXT_PUBLIC_SITE_URL=https://techno-comfort.pro
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_YANDEX_METRIKA_ID=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
ADMIN_PASSWORD=change-me-now
ADMIN_SESSION_SECRET=<generate-with-openssl-rand-hex-32>
```

Generate a session secret:

```bash
openssl rand -hex 32
```

Replace `ADMIN_PASSWORD` with a real strong password before handing the admin panel to users.

## Docker Deploy

```bash
cd /var/www/siteforclient
docker compose up -d --build
docker compose ps
curl -I http://localhost:3000
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

`robots.txt` and `sitemap.xml` must use `https://techno-comfort.pro`, not `localhost`.

`NEXT_PUBLIC_SITE_URL` is also passed as a Docker build argument in `docker-compose.yml`, because Next.js prerenders `robots.txt` and `sitemap.xml` during `next build`. If the production domain changes, update both `.env.production` on the server and the Docker build default in `docker-compose.yml`.

## Nginx

Config path:

```bash
/etc/nginx/sites-available/siteforclient
```

HTTP config before Certbot:

```nginx
server {
    listen 80;
    server_name 95.174.92.90 techno-comfort.pro www.techno-comfort.pro;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable and reload:

```bash
sudo ln -sfn /etc/nginx/sites-available/siteforclient /etc/nginx/sites-enabled/siteforclient
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS

Run Certbot only after DNS points to `95.174.92.90` and ports `80` and `443` are open:

```bash
sudo certbot --nginx -d techno-comfort.pro -d www.techno-comfort.pro
sudo certbot renew --dry-run
```

Choose HTTP to HTTPS redirect if Certbot asks.

Verify:

```bash
curl -I https://techno-comfort.pro
curl -I https://www.techno-comfort.pro
curl -I http://techno-comfort.pro
curl -I http://www.techno-comfort.pro
```

Expected:

- HTTPS returns the site.
- HTTP redirects to HTTPS.
- Certificate is valid for both names.

## Automatic Deploy Through GitHub Actions

Workflow file:

```text
.github/workflows/deploy.yml
```

Required GitHub Secrets:

```text
CLOUDRU_HOST=95.174.92.90
CLOUDRU_USER=user1
CLOUDRU_PROJECT_PATH=/var/www/siteforclient
CLOUDRU_SSH_KEY=<private deploy SSH key>
```

Prefer a dedicated deploy key:

1. Generate a new SSH key for GitHub Actions.
2. Add the public key to `/home/user1/.ssh/authorized_keys` on the VM.
3. Add the private key to GitHub Secrets as `CLOUDRU_SSH_KEY`.
4. Do not commit the key to the repository.

The workflow runs on push to `main` and executes:

```bash
cd "$CLOUDRU_PROJECT_PATH"
git fetch origin main
git checkout main
git pull --ff-only origin main
docker compose up -d --build
docker image prune -f
docker compose ps
curl -fsS -I http://localhost:3000
```

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

```bash
cd /var/www/siteforclient
git log --oneline -10
git checkout <GOOD_COMMIT_HASH>
docker compose up -d --build
```

Return to production after the fix:

```bash
git checkout main
git pull origin main
docker compose up -d --build
```

## Future Work Flow

1. Work in `dev`.
2. Test locally:

```bash
npm ci
npm run build
```

3. Commit and push `dev`.
4. Open PR from `dev` to `main`.
5. Merge into `main`.
6. GitHub Actions deploys production automatically.
7. Verify `https://techno-comfort.pro` and `https://www.techno-comfort.pro`.
