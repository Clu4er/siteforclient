# Деплой Next.js через Docker на Ubuntu VM в Cloud.ru

Эта инструкция описывает простой production-деплой на одной Ubuntu VM: сервер клонирует Git-репозиторий, запускает Next.js через Docker Compose, а Nginx проксирует домен на контейнер `next-app` на `127.0.0.1:3000`.

Не нужны Kubernetes, Container Registry, CI/CD или Cloud.ru Container Apps.

## A. Подготовка сервера

Обновите пакеты и установите базовые инструменты:

```bash
sudo apt update
sudo apt install -y git curl nginx certbot python3-certbot-nginx ca-certificates
```

Установите Docker и Docker Compose plugin:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Включите Docker:

```bash
sudo systemctl enable docker
sudo systemctl start docker
sudo docker --version
sudo docker compose version
```

Чтобы запускать Docker без `sudo`, добавьте пользователя в группу `docker`, затем перелогиньтесь:

```bash
sudo usermod -aG docker $USER
```

## B. Клонирование репозитория

```bash
cd /var/www
git clone <REPO_URL>
cd <PROJECT_DIR>
```

Замените `<REPO_URL>` на URL Git-репозитория, а `<PROJECT_DIR>` на имя папки проекта.

## C. Настройка env

Создайте production env-файл из шаблона:

```bash
cp .env.example .env.production
nano .env.production
```

Реальные секреты вводятся только на сервере в `.env.production`. Не коммитьте `.env`, `.env.local` и `.env.production` в Git.

Нужно заполнить:

- `NEXT_PUBLIC_SITE_URL` - публичный URL сайта, например `https://example.com`
- `NEXT_PUBLIC_GA_ID` - ID Google Analytics / GA4, если используется
- `NEXT_PUBLIC_YANDEX_METRIKA_ID` - ID Яндекс Метрики, если используется
- `TELEGRAM_BOT_TOKEN` - токен Telegram-бота для заявок, если используется
- `TELEGRAM_CHAT_ID` - чат для отправки заявок, если используется
- `ADMIN_PASSWORD` - пароль админ-панели
- `ADMIN_SESSION_SECRET` - длинная случайная строка для подписи сессий

## D. Первый запуск

```bash
docker compose build
docker compose up -d
docker ps
curl http://localhost:3000
```

Если `curl` возвращает HTML-страницу, контейнер Next.js запущен корректно.

## E. Nginx reverse proxy

Создайте конфиг Nginx:

```bash
sudo nano /etc/nginx/sites-available/<PROJECT_DIR>
```

Пример конфига:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

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

Активируйте сайт:

```bash
sudo ln -s /etc/nginx/sites-available/<PROJECT_DIR> /etc/nginx/sites-enabled/<PROJECT_DIR>
sudo rm -f /etc/nginx/sites-enabled/default
```

## F. Проверка Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## G. Домен

В DNS панели домена добавьте записи:

- `A` record `@ -> SERVER_IP`
- `A` record `www -> SERVER_IP`

Замените `SERVER_IP` на публичный IP сервера Cloud.ru.

## H. HTTPS

После того как DNS указывает на сервер, выпустите сертификат:

```bash
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot renew --dry-run
```

Замените `example.com` и `www.example.com` на реальные домены.

## I. Как обновлять сайт после изменений

Для обычных последующих деплоев новую ветку создавать не нужно.

Сервер всегда берет актуальный код из `main`. Ветки нужны только для разработки изменений или крупных правок. После merge в `main` сервер обновляется через `git pull`.

Команды для обновления:

```bash
cd /var/www/<PROJECT_DIR>
git pull origin main
docker compose up -d --build
docker image prune -f
```

## J. Если сайт не открывается

Проверьте контейнер, логи, локальный ответ Next.js, Nginx и Git-состояние:

```bash
docker ps
docker logs next-app
docker compose logs -f
curl http://localhost:3000
sudo nginx -t
sudo systemctl status nginx
sudo ss -tulpn | grep -E '80|443|3000'
git status
git log --oneline -5
```

## K. Откат

Посмотрите последние коммиты:

```bash
git log --oneline -5
```

Временно откатитесь на предыдущий коммит и пересоберите контейнер:

```bash
git checkout <COMMIT_HASH>
docker compose up -d --build
```

После исправления вернитесь на `main`:

```bash
git checkout main
git pull origin main
docker compose up -d --build
```
