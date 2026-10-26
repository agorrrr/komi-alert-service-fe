# Frontend Environment Configuration Guide

## 🎯 Overview

The frontend uses a **single-flag switching system** to toggle between development and production environments.

## 🚀 Quick Start: How to Switch Environments

### **EASIEST WAY: One-Flag Switch**

1. Open **`src/environments/environment.config.ts`**
2. Find this line:
   ```typescript
   export const IS_DEVELOPMENT = true; // Set to false for production
   ```
3. Change it:
   - `true` = Development mode
   - `false` = Production mode
4. Save and restart your development server

**That's it!** No need to edit multiple files or change configs.

---

## 📊 Environment Configurations

### 🛠️ Development Environment (`IS_DEVELOPMENT = true`)

```typescript
{
  production: false,
  environmentName: 'local',
  localMode: true,

  apiUrl: 'http://localhost:5001/mgm',  // Connects to backend dev1
  baseUrl: 'http://localhost:5001/fds',
  socketUrl: 'http://localhost:5001',
  pageUrl: 'http://localhost:4200',

  // External services disabled in development
  reportUrl: null,
  kibanaUrl: null,
  apiUrlSSO: null,
  baseUrlSSO: null,
}
```

**Use this when:**

- Running locally
- Testing with local backend (dev1 on port 5001)
- No external services needed

---

### 🏭 Production Environment (`IS_DEVELOPMENT = false`)

```typescript
{
  production: true,
  environmentName: 'general-apps',
  localMode: false,

  apiUrl: 'http://localhost:5012/mgm',  // Production backend
  baseUrl: 'http://localhost:5012/fds',
  socketUrl: 'http://localhost:5012',

  // All production services enabled
  reportUrl: 'http://report-agent.fds.mii.labs',
  kibanaUrl: 'http://184.169.41.109:5611',
  apiUrlSSO: 'https://192.168.175.5:45415/mgm',
  baseUrlSSO: 'https://192.168.175.5:45415/smartva',

  // Production API keys
  keyApp: '82fb4e99468560d7752555b97618294a',
  keyKibana: { ... }
}
```

**Use this when:**

- Deploying to production
- Testing with production backend
- Full integration with external services

---

## 🔧 Advanced: Using Development Environment 2

If you're running **two backend instances** (dev1 and dev2), you can switch the frontend to connect to dev2:

### Option 1: Temporarily Use Dev2

In `environment.config.ts`, import and use `development2Config`:

```typescript
import { development2Config } from "./environment.config";

export const IS_DEVELOPMENT = true;

// Temporarily override for dev2 testing
export const activeEnvironment = IS_DEVELOPMENT
  ? development2Config // <-- Use dev2
  : productionConfig;
```

### Option 2: Create Package Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "start:dev1": "ng serve --configuration development",
    "start:dev2": "ng serve --port 4201 --configuration development",
    "build:dev": "ng build --configuration development",
    "build:prod": "ng build --configuration production"
  }
}
```

---

## 📝 File Structure

```
src/
├── environments/
│   ├── environment.config.ts      ← CHANGE THIS FILE TO SWITCH
│   ├── environment.ts              ← Auto-imports from config
│   └── environment.development.ts  ← Legacy (not used)
└── app/
    └── services/
        └── env/
            └── env.service.ts      ← Uses environment.ts
```

---

## ⚙️ Backend Connection Matrix

| Frontend Mode                         | Backend Port | Backend Config            |
| ------------------------------------- | ------------ | ------------------------- |
| Development (`IS_DEVELOPMENT = true`) | 5001         | `config-dev.json` (dev1)  |
| Development2 (manual)                 | 5002         | `config-dev2.json` (dev2) |
| Production (`IS_DEVELOPMENT = false`) | 5012         | `config.json`             |

---

## 🔄 Deployment Workflow

### For Development Deployment:

1. Set `IS_DEVELOPMENT = true` in `environment.config.ts`
2. Build: `npm run build`
3. Deploy the `dist/` folder

### For Production Deployment:

1. Set `IS_DEVELOPMENT = false` in `environment.config.ts`
2. Build: `npm run build --configuration production`
3. Deploy the `dist/` folder

---

## 🎨 Environment-Specific Features

The `EnvService` exposes all environment variables to your Angular components:

```typescript
import { EnvService } from 'src/app/services/env/env.service';

constructor(private env: EnvService) {}

ngOnInit() {
  console.log('API URL:', this.env.apiUrl);
  console.log('Is Local Mode:', this.env.localMode);
  console.log('Kibana URL:', this.env.kibanaUrl);
}
```

---

## 🔒 Security Notes

- **Never commit sensitive production keys** to version control
- Keep production API keys in a secure location
- Use environment variables for CI/CD pipelines
- Review `environment.config.ts` before each production deployment

---

## ✅ Quick Checklist Before Deployment

- [ ] Open `src/environments/environment.config.ts`
- [ ] Set `IS_DEVELOPMENT` to appropriate value
  - `true` for development/staging
  - `false` for production
- [ ] Verify API URLs match your backend environment
- [ ] Check that API keys are correct
- [ ] Test build: `npm run build`
- [ ] Verify production build: `npm run build --configuration production`

---

## 🆘 Troubleshooting

### "Cannot connect to API"

- Check `IS_DEVELOPMENT` flag matches your backend environment
- Verify backend is running on the expected port (5001 for dev, 5012 for prod)
- Check CORS settings on backend

### "Kibana dashboard not loading"

- Ensure `IS_DEVELOPMENT = false` for production (Kibana only in prod)
- Verify `kibanaUrl` in production config
- Check network access to Kibana server

### "Changes not taking effect"

- Restart development server after changing `environment.config.ts`
- Clear browser cache
- Rebuild: `npm run build`

---

**Need Help?** Check `src/environments/environment.config.ts` for inline comments and configuration details.
