### Updated `README.md`

```markdown
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
- Replace `yourdomain.com` with your actual domain.

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

### 4. Configure Environment Variables

Update the environment variables in the `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0.37
    container_name: mysql_container
    environment:
      MYSQL_ROOT_PASSWORD: 111111112
      MYSQL_DATABASE: myDB
      MYSQL_USER: user1
      MYSQL_PASSWORD: 111111112
    ports:
      - "3307:3306"
    volumes:
      - db_data:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - mynetwork
    mem_limit: 400m  # Memory allocation for MySQL (400 MB)

  app:
    build: .
    container_name: node_app_container
    environment:
      DB_HOST: db
      DB_USER: user1
      DB_PASSWORD: 111111112
      DB_NAME: myDB
      AWS_S3_REGION: "your-aws-region"
      AWS_ACCESS_KEY_ID: "your-aws-access-key-id"
      AWS_SECRET_ACCESS_KEY: "your-aws-secret-access-key"
      BUCKET_NAME: "your-bucket-name"
    ports:
      - "3000:3000"
    depends_on:
      - db
    networks:
      - mynetwork
    mem_limit: 150m  # Memory allocation for Node Server (150 MB)

  nginx:
    image: nginx:latest
    container_name: nginx_container
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    depends_on:
      - app
    networks:
      - mynetwork
    mem_limit: 41m  # Memory allocation for Nginx Proxy (41 MB)

networks:
  mynetwork:

volumes:
  db_data:
```

**Environment Variables Explained:**

- **AWS_S3_REGION**: The AWS region where your S3 bucket is located (e.g., `us-east-1`).
- **AWS_ACCESS_KEY_ID**: Your AWS access key ID.
- **AWS_SECRET_ACCESS_KEY**: Your AWS secret access key.
- **BUCKET_NAME**: The name of your S3 bucket.

Make sure to replace `your-aws-region`, `your-aws-access-key-id`, `your-aws-secret-access-key`, and `your-bucket-name` with your actual AWS credentials and bucket name.

### 5. Build and Run the Docker Containers

From the main folder of the project, build and start the containers:

```bash
docker-compose build
docker-compose up -d
```

### 6. Access the Application

If everything is set up correctly, your server should be running on your domain.

**Note:** Ensure that the ports 80 and 443 are open and accessible for the server to respond to HTTP and HTTPS requests.

### Additional Notes

- **Memory Limits**: The memory limits set in the `docker-compose.yml` file (`mem_limit`) ensure that each service does not exceed the specified memory usage. Adjust these values as needed based on your server's capacity and application requirements.
- **SSL Certificates**: The Certbot certificates are stored in `/etc/letsencrypt`. Ensure that this path is correctly referenced in your `nginx.conf` file.
- **Database Initialization**: The `init.sql` script is executed when the MySQL container is first created. Make sure this script is correctly placed and contains the necessary SQL commands to initialize your database.

