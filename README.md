# Alert Engine Service

A comprehensive alert management system with backend API (Express.js) and frontend UI (Angular), designed to receive alerts from various monitoring sources (Grafana, Dynatrace, Elastic, etc.) and route them to configured destinations (Telegram, Slack, Email).

---

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Production Deployment (VM)](#production-deployment-vm)
- [Client Setup Guide](#client-setup-guide)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)

---

## ⚠️ Important: Port Configuration

**This project uses DIFFERENT ports for development and production:**

- **Development (localhost)**: Frontend: `4200`, Backend: `5001`, Database: `5432`
- **Production**: Frontend: `14200`, Backend: `35012`, Database: `25432`

**For Production Team:**

- 📄 See [PORT-CONFIG.md](./PORT-CONFIG.md) for detailed port configuration guide
- 📄 See [PRODUCTION-DEPLOYMENT.md](./PRODUCTION-DEPLOYMENT.md) for deployment without rebuilds
- ✅ You can change tokens, secrets, and port via `.env` **WITHOUT rebuilding**!

---

## 🏗️ System Architecture

```
[Monitoring Sources]          [Alert Engine]           [Destinations]
     (Grafana)                                             (Telegram)
     (Dynatrace)      →→→     [Backend API]      →→→      (Slack)
     (Elastic)                [Frontend UI]                (Email)
```

### Components:

- **Backend (poc-komi-alert-service-be)**: Express.js REST API with PostgreSQL database
- **Frontend (poc-komi-alert-service-fe)**: Angular 19 web application with PrimeNG UI

---

## 📦 Prerequisites

### Required Software

#### 1. **Node.js & npm**

```bash
# Download and install Node.js 18.x or 20.x LTS
# Visit: https://nodejs.org/

# Verify installation
node -v   # Should show v18.x.x or v20.x.x
npm -v    # Should show v9.x.x or v10.x.x
```

#### 2. **PostgreSQL Database**

```bash
# Windows - Download installer from:
# https://www.postgresql.org/download/windows/

# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Verify installation
psql --version   # Should show PostgreSQL 14.x or higher
```

#### 3. **Angular CLI** (for frontend development)

```bash
npm install -g @angular/cli

# Verify installation
ng version   # Should show Angular CLI 19.x.x
```

#### 4. **PM2** (for production deployment)

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 -v
```

---

## 🚀 Local Development Setup

### Step 1: Database Setup

#### Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE alert_engine;

# Exit psql
\q
```

#### Configure Database Connection

**Backend**: Edit `poc-komi-alert-service-be/src/config-dev.json`

```json
{
  "db": "postgres",
  "port": 25432,
  "dbConfig": {
    "db": {
      "host": "localhost",
      "database": "alert_engine",
      "user": "postgres",
      "password": "your_postgres_password"
    }
  }
}
```

#### Run Database Migrations

```bash
cd poc-komi-alert-service-be

# Install dependencies (if not done yet)
npm install

# Run migrations to create tables
npm run build
npx knex migrate:latest --knexfile build/connection/knexfile.js
```

### Step 2: Backend Setup

```bash
cd poc-komi-alert-service-be

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your settings:
# - TELEGRAM_BOT_TOKEN (obtain from @BotFather on Telegram)
# - JWT_SECRET (for authentication)
# - PORT (default: 35012)

# Start development server
npm run serve

# Backend will run on http://localhost:35012
```

### Step 3: Frontend Setup

```bash
cd poc-komi-alert-service-fe

# Install dependencies
npm install

# Start development server
npm start

# Frontend will run on http://localhost:14200
```

### Step 4: Access the Application

- **Frontend UI**: http://localhost:14200
- **Backend API**: http://localhost:35012
- **Default Login**:
  - Create user via backend API or database directly
  - Use `/auth/login` endpoint

---

## Production Deployment (VM)

> **💡 Production Quick Start**: For production deployment with ports 14200 (FE), 35012 (BE), and 25432 (DB),
> see **[PRODUCTION-DEPLOYMENT.md](./PRODUCTION-DEPLOYMENT.md)** and **[PORT-CONFIG.md](./PORT-CONFIG.md)**.
>
> The instructions below are for general VM setup. Production uses different ports and configuration files.

### Step 1: Prepare VM Environment

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2

# Install Nginx (for serving frontend)
sudo apt install nginx
```

### Step 2: Setup PostgreSQL Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE alert_engine;
CREATE USER alert_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE alert_engine TO alert_user;
\q
```

### Step 3: Deploy Backend

```bash
# Clone or upload your code to VM
example:
`cd /var/www/poc-komi-alert-service-be`

# Install dependencies
npm install

# Setup production environment
cp .env.production .env

# Edit .env file with your configuration
nano .env
# Set: PORT=35012
# Set: TELEGRAM_BOT_TOKEN=your_actual_token
# Set: Database credentials

# Edit production config
nano src/config-prod.json
# Update database host, credentials, and port (25432)

# Build the application
npm run build

# Run migrations
npx knex migrate:latest --knexfile build/connection/knexfile.js

# Start with PM2 using production config
DEV_CONFIG=prod pm2 start build/app.js --name alert-engine-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### Step 4: Deploy Frontend

```bash
# Build frontend for production
cd /var/www/poc-komi-alert-service-fe

# Ensure production config is set
# Edit src/environments/environment.config.ts
# Set: IS_DEVELOPMENT = false (for production ports)

npm install
npm run build

# Production build outputs to: dist/gardafds/browser/
```

### Step 5: PM2 Management Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs alert-engine-api

# Restart application
pm2 restart alert-engine-api

# Stop application
pm2 stop alert-engine-api

# Monitor resources
pm2 monit
```

---

## Client Setup Guide

Follow these steps in order to set up the alert engine for a new client:

### Prerequisites (Client Side)

1. ✅ Telegram account
2. ✅ Access permissions for the bot to send messages to groups (Invite the bot to the group)

### Step-by-Step Setup

#### 1. **Create Telegram Bot**

```
1. Open Telegram and search for @BotFather
2. Send command: /newbot
3. Follow instructions to name your bot
4. Save the bot token (e.g., 8392189297:AAGNZwRZBi8NPPZWwAtHoMOa8zpQU-WE53s)
```

#### 2. **Create Telegram Groups/Channels**

Create separate groups for different alert severities:

```
- Critical Alerts (high priority)
- Warning Alerts (medium priority)
- Info Alerts (low priority)
- General Monitoring
- Other Groups as you like
```

#### 3. **Configure Groups**

For each group:

```
1. Add your bot to the group
2. Make the bot an admin (to post messages)
3. Get the chat ID:
   - Method 1: Use @userinfobot in the group
   - Method 2: Send a message and check bot API
   - Method 3: Use web.telegram.org/a/ and check URL
4. (Optional) Get thread_id if using topics/forums
```

#### 4. **Provide VM Access to MII Team**

```
Provide the following information to MII deployment team:
- VM IP address
- SSH credentials (username/password or SSH key)
- Firewall rules (open ports 80, 443, 5001)
- PostgreSQL database credentials
- Bot token for .env configuration
```

#### 5. **MII Deploys Alert Service**

MII team will:

```
✓ Deploy backend and frontend to VM
✓ Configure database
✓ Set up PM2 and Nginx
✓ Configure environment variables
✓ Run database migrations
✓ Verify service is running
```

#### 6. **Client Configures Destinations**

Login to Alert Engine UI and:

```
1. Navigate to "Destination Management"
2. Click "Create New Destination"
3. Fill in:
   - Name: "Critical Alerts Telegram"
   - Type: "telegram"
   - Config:
     {
       "chat_id": "-1001234567890",
       "thread_id": "123" (optional)
     }
4. Repeat for all alert groups
```

#### 7. **Client Configures Sources (Listeners)**

Setup monitoring sources:

```
1. Navigate to "Source Management"
2. Click "Create New Source"
3. Fill in:
   - Name: "Grafana Production"
   - Type: "grafana" (or dynatrace, elastic, etc.)
   - Secret Key: (optional, for webhook verification)
4. Save and copy the webhook URL
5. Configure webhook in monitoring tool (Grafana/Dynatrace)
```

#### 8. **Client Configures Rules**

Create routing rules to match alerts to destinations:

```
1. Navigate to "Rule Management"
2. Click "Create New Rule"
3. Configure:
   - Name: "Critical Grafana Alerts"
   - Sources: Select "Grafana Production"
   - Destinations: Select "Critical Alerts Telegram"
   - Filter Criteria:
     {
       "severity": "critical"
     }
   - Message Template:
     "🔴 CRITICAL: {alert_name}\nSource: {source}\nSeverity: {severity}"
4. Save rule
5. Repeat for different alert types
```

#### 9. **Test Alert Flow**

```
1. Send test alert from monitoring source
2. Verify it reaches the correct Telegram group
3. Check Alert Logs in UI for delivery status
4. Adjust rules/filters as needed
```

#### 10. **Monitor and Maintain**

```
Regular tasks:
- Review alert logs for delivery issues
- Update bot tokens if rotated
- Adjust message templates
- Add new sources/destinations as needed
- Monitor PM2 process health
```

---

## 🗄️ Database Schema

The alert engine uses PostgreSQL with the following tables:

### Core Tables

#### `ae_users`

```sql
id            SERIAL PRIMARY KEY
username      VARCHAR NOT NULL UNIQUE
password      VARCHAR NOT NULL (encrypted)
email         VARCHAR
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

#### `ae_sources`

Monitoring sources that send alerts (Grafana, Dynatrace, etc.)

```sql
id            SERIAL PRIMARY KEY
name          VARCHAR NOT NULL
type          VARCHAR NOT NULL (grafana, dynatrace, elastic)
secret_key    VARCHAR (for webhook verification)
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

#### `ae_destinations`

Alert destinations (Telegram, Slack, Email)

```sql
id            SERIAL PRIMARY KEY
name          VARCHAR NOT NULL
type          VARCHAR NOT NULL (telegram, slack, email)
config        JSONB NOT NULL
              Example: {"chat_id": "-123", "thread_id": "456"}
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

#### `ae_rules`

Rules to route alerts from sources to destinations

```sql
id                SERIAL PRIMARY KEY
name              VARCHAR
filter_criteria   JSONB (JSON logic for filtering)
                  Example: {"severity": "critical"}
message_template  TEXT (template for alert formatting)
created_at        TIMESTAMP
updated_at        TIMESTAMP
```

### Junction Tables (Many-to-Many)

#### `ae_rule_sources`

Links rules to sources

```sql
id            SERIAL PRIMARY KEY
rule_id       INTEGER REFERENCES ae_rules(id) ON DELETE CASCADE
source_id     INTEGER REFERENCES ae_sources(id) ON DELETE CASCADE
created_at    TIMESTAMP
updated_at    TIMESTAMP
UNIQUE(rule_id, source_id)
```

#### `ae_rule_destinations`

Links rules to destinations

```sql
id              SERIAL PRIMARY KEY
rule_id         INTEGER REFERENCES ae_rules(id) ON DELETE CASCADE
destination_id  INTEGER REFERENCES ae_destinations(id) ON DELETE CASCADE
created_at      TIMESTAMP
updated_at      TIMESTAMP
UNIQUE(rule_id, destination_id)
```

---

## 📚 API Documentation

### Authentication

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}

Response:
{
  "token": "jwt_token_here",
  "user": { "id": 1, "username": "admin" }
}
```

### Sources Management

#### Get All Sources

```http
GET /sources
Authorization: Bearer {token}
```

#### Create Source

```http
POST /sources
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Grafana Production",
  "type": "grafana",
  "secret_key": "optional_secret"
}
```

### Destinations Management

#### Get All Destinations

```http
GET /destinations
Authorization: Bearer {token}
```

#### Create Destination

```http
POST /destinations
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Telegram Critical",
  "type": "telegram",
  "config": {
    "chat_id": "-1001234567890",
    "thread_id": "123"
  }
}
```

### Rules Management

#### Get All Rules

```http
GET /rules
Authorization: Bearer {token}
```

#### Create Rule

```http
POST /rules
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Critical Alerts",
  "source_ids": [1, 2],
  "destination_ids": [1],
  "filter_criteria": {
    "severity": "critical"
  },
  "message_template": "🔴 {alert_name}: {message}"
}
```

### Alert Ingestion (Webhook)

#### Receive Alert

```http
POST /webhook/alert/:source_id
Content-Type: application/json

{
  "alert_name": "High CPU Usage",
  "severity": "critical",
  "message": "CPU usage is above 90%",
  "timestamp": "2024-01-20T10:30:00Z"
}
```

---

## 🔧 Configuration Files

### Backend Environment Variables (`.env`)

```env
NODE_ENV=production
DEV_CONFIG=prod  # Use config-prod.json with production ports
PORT=35012       # Production port (dev uses 5001)
JWT_SECRET=your_secret_key_here

# Telegram Bot
TELEGRAM_BOT_TOKEN=8392189297:AAGNZwRZBi8NPPZWwAtHoMOa8zpQU-WE53s

# Encryption
ENCRYPTION_MASTER_KEY=your_encryption_key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=alerts@yourdomain.com
SMTP_PASSWORD=your_email_password

# Slack (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### Frontend Environment

Frontend uses Angular environments in `src/environments/`:

- `environment.ts` - Development
- `environment.prod.ts` - Production

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection settings in config-dev.json
# Verify database exists
psql -U postgres -l
```

**PM2 Process Not Starting**

```bash
# Check logs
pm2 logs alert-engine-api

# Check if port is already in use
sudo lsof -i :35012

# Restart process
pm2 restart alert-engine-api
```

### Frontend Issues

**Build Fails**

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node -v  # Should be 18.x or 20.x
```

**Cannot Connect to Backend**

```bash
# Check backend is running
curl http://localhost:35012/health

# Check CORS settings in backend config
# Verify API proxy configuration in Angular
```

### Telegram Bot Issues

**Bot Not Sending Messages**

```bash
# Verify bot token is correct
# Check bot is admin in Telegram group
# Verify chat_id is correct (include negative sign for groups)
# Check backend logs for error messages
```

## 📄 License

Internal MII Project - All Rights Reserved
