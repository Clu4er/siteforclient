# Deployment Manual

This repository keeps only two permanent working branches:

- `main` is production. It must represent the latest deployed stable site.
- `dev` is the working branch for all upcoming changes.

Publication history is tracked with Git tags and, when needed, GitHub Releases.
Do not create long-lived deployment history branches for production snapshots.

## Normal Workflow

1. Start changes on `dev`.
2. Run local validation:

```bash
npm run build
```

3. Push `dev`.
4. Open a pull request from `dev` to `main`.
5. Merge the pull request into `main`.
6. GitHub Actions deploys `main` to production.
7. Verify production:

```bash
curl -I https://techno-comfort.pro
curl -I https://www.techno-comfort.pro
```

8. Create a production tag on the deployed `main` commit:

```bash
git fetch origin
git rev-parse --short origin/main
git tag -a prod-YYYY-MM-DD-<short-sha> origin/main -m "Production deploy YYYY-MM-DD: <summary>"
git push origin prod-YYYY-MM-DD-<short-sha>
```

## Branch Rules

`main`:

- production only;
- update through pull requests;
- no force-push;
- every successful production deploy gets a tag.

`dev`:

- working branch;
- new work starts here;
- regularly sync it back to `main` after production deploys.

`backup/*` and `deploy/*`:

- temporary branches only;
- keep them until all useful work has been moved to `main` or `dev`;
- delete only after explicit confirmation.

## Production Infrastructure

Cloud.ru, Docker, Nginx, Certbot, and DNS are already configured. Ordinary
content, UI, and favicon changes must not touch DNS, Nginx, Certbot, or server
firewall settings.

Production deploy runs through GitHub Actions after `main` changes.

## Emergency Rollback

Rollback through a tag is an emergency measure. The normal state of the server
should return to `main` after the incident is fixed.

1. Find the latest known-good production tag:

```bash
git tag --sort=-creatordate
```

2. On the server, temporarily check out that tag and rebuild:

```bash
ssh user1@95.174.92.90 -i "C:\test\siteforclient\pem\siteforclient-prod.pem"
cd /var/www/siteforclient
git fetch --tags origin
git checkout <prod-tag>
docker compose up -d --build
docker compose ps
curl -I https://techno-comfort.pro
curl -I https://www.techno-comfort.pro
```

3. After the emergency rollback, create a normal GitHub fix:

- either revert the bad commit;
- or open a pull request with a fix;
- merge to `main`;
- wait for GitHub Actions deploy;
- create a new production tag.
