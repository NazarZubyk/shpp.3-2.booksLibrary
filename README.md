# NodeServer - Books Library

This project is a Node.js server for a book library application, running in Docker containers with Nginx, MySQL, and Certbot for SSL certification.

## Prerequisites

- **Domain Name:** Purchase a domain name (e.g., from Namecheap).
- **Certbot:** Install Certbot on your local Linux machine.
- **Ports:** Ensure ports 80 and 443 are open on your machine.
- **Docker and Docker Compose:** Install Docker and Docker Compose.

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/NazarZubyk/shpp.3-2.booksLibrary.git
cd shpp.3-2.booksLibrary
```

### 2. Certbot Certification

Run Certbot to generate SSL certificates. Replace `yourdomain.com` with your actual domain.

```bash
sudo certbot certonly --webroot --webroot-path=/var/www/certbot --email your-email@example.com --agree-tos --no-eff-email -d yourdomain.com -d www.yourdomain.com
```

### 3. Configure Nginx

Edit `nginx.conf`:

- Update paths for SSL certificates if necessary.
- Replace `nazarzo.site` with your actual domain.

```nginx
user nginx;
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    upstream node_app {
        server app:3000;
    }

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        location / {
            return 301 https://$host$request_uri;
        }

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
    }

    server {
        listen 443 ssl;
        server_name yourdomain.com www.yourdomain.com;

        ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

        location / {
            proxy_pass http://node_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### 4. Build and Run the Docker Containers

From the main folder of the project, build and start the containers:

```bash
docker-compose build
docker-compose up -d
```

### 5. Access the Application

If everything is set up correctly, your server should be running on your domain.

