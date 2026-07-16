# Deploy CodeSolveAfrica to HostPinnacle cPanel

## Prerequisites

- Login: https://www.logicorex.co.ke:2083 (user: `logicore`, pass: `4K3XWj03wBv]d]`)
- Domains: `codesolveafrica.co.ke` (frontend), `api.codesolveafrica.co.ke` (API)
- Backend folder: `codesolveafrica_backend`

---

## Step 1: Create MySQL Database

In cPanel **MySQL Databases**:
1. Create a database: `logicore_codesolveafrica`
2. Create a user: `logicore_csuser` with a strong password
3. Add user to database with **ALL PRIVILEGES**
4. Note the credentials — you'll need them for the `.env` file

## Step 2: Create Subdomain (if not exists)

In cPanel **Subdomains**:
- Subdomain: `api`
- Domain: `codesolveafrica.co.ke`
- Document root: `api.codesolveafrica.co.ke`
- This will create the folder structure

## Step 3: Upload Files

Using cPanel **File Manager**:

### Backend → `codesolveafrica_backend/`
1. Navigate to `/home/logicore/` (or your home directory)
2. Create directory `codesolveafrica_backend` if not exists
3. Upload `backend-deploy.zip` into it
4. Extract the zip — files will be in `backend/` subfolder
5. Move everything from `backend/` up to `codesolveafrica_backend/`
6. Final structure should be:
   ```
   codesolveafrica_backend/
   ├── dist/
   ├── prisma/
   ├── node_modules/
   ├── package.json
   └── .env
   ```

### Frontend → `codesolveafrica.co.ke/`
1. Navigate to `/home/logicore/codesolveafrica.co.ke/`
2. Upload `frontend-deploy.zip`
3. Extract — files in `frontend/` subfolder
4. Move everything up to `codesolveafrica.co.ke/`
5. Final structure:
   ```
   codesolveafrica.co.ke/
   ├── .next/
   ├── public/
   ├── node_modules/
   ├── package.json
   ├── server.js
   └── .env
   ```

## Step 4: Configure Node.js Apps

In cPanel, find **Setup Node.js App** (or Node.js Selector).

### Backend App (API)
- **Application root**: `/home/logicore/codesolveafrica_backend`
- **Application URL**: `api.codesolveafrica.co.ke`
- **Application startup file**: `dist/main.js`
- **Application mode**: `production`
- **Environment variables**: Add each from the `.env` file
  - `NODE_ENV=production`
  - `PORT` — leave blank (cPanel assigns one)
  - `API_PREFIX=api/v1`
  - `DATABASE_URL=mysql://logicore_csuser:password@localhost:3306/logicore_codesolveafrica`
  - `JWT_SECRET=SZAfISiM6tp9c3nY381sji7EV/m1fHapEEVGRzuxdHr/SfitOlI2EarvrpUj6Ona`
  - `JWT_REFRESH_SECRET=rH1U1t47MuUvmgpQs01n/MUPzC0OMTcl9xKxT39xKOo09mzWQRyEWEBnQwafiQKZ`
  - `JWT_EXPIRES_IN=15m`
  - `JWT_REFRESH_EXPIRES_IN=7d`
  - `FRONTEND_URL=https://codesolveafrica.co.ke`
  - `COOKIE_SECRET=7nWAPO4F/MJa5o41NESuTFB7N2bygyujmCm8Dz9mMY4wfQSmuwGRzcDvCp0cBIUK`
  - `THROTTLE_TTL=60`
  - `THROTTLE_LIMIT=100`
  - `CLOUDINARY_CLOUD_NAME=your_value`
  - `CLOUDINARY_API_KEY=your_value`
  - `CLOUDINARY_API_SECRET=your_value`
  - `RESEND_API_KEY=your_value`
  - (Skip Redis if HostPinnacle doesn't offer it — app is resilient without it)
- Click **Create** (or **Save**)

### Frontend App (Website)
- **Application root**: `/home/logicore/codesolveafrica.co.ke`
- **Application URL**: `codesolveafrica.co.ke`
- **Application startup file**: `server.js`
- **Application mode**: `production`
- **Environment variables**:
  - `NODE_ENV=production`
  - `PORT` — leave blank
  - `NEXT_PUBLIC_API_URL=https://api.codesolveafrica.co.ke/api/v1`
- Click **Create**

## Step 5: Run Database Migrations

After the backend app is created, open cPanel **Terminal** (or SSH):

```bash
cd ~/codesolveafrica_backend

# Run database migrations
npx prisma migrate deploy

# If migrations fail, try db push instead:
# npx prisma db push

# (Optional) Seed the database with initial data
# npm run prisma:seed
```

## Step 6: Start Both Apps

In **Setup Node.js App**:
- Both apps should show a **Start/Restart** button
- Click start for each

## Step 7: Verify

- Backend: Visit `https://api.codesolveafrica.co.ke/api/v1/health`
- Frontend: Visit `https://codesolveafrica.co.ke`
- Swagger docs: `https://api.codesolveafrica.co.ke/api/v1/docs`

---

## Troubleshooting

### App won't start
- Check the Node.js version in cPanel (needs **Node.js 20+**)
- Check error logs in cPanel **Error Log** or the Node.js app's log
- Ensure MySQL credentials in `.env` match the cPanel database

### Redis errors
If HostPinnacle doesn't support Redis, remove or comment out the Redis config in:
- `backend/src/app.module.ts` — remove the `CacheModule.registerAsync` block
- Or simply let it fail gracefully (the app may still work)

### Permission errors
- In File Manager, ensure the application root has proper permissions (755 for dirs, 644 for files)
- The Node.js app runs as your cPanel user, so this should be fine

### CORS issues
- Edit `backend/src/main.ts` if needed to add your domain to the CORS origin list
- The `FRONTEND_URL` env var already handles this
