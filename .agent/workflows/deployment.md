---
description: How to deploy the Ruh Al-Misk platform to production
---

# 🚀 Deployment Guide

Follow these steps to manifest the Ruh Al-Misk boutique on the public web.

## 1. Cloud Database (MongoDB Atlas)
1. Register at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Shared/Free Tier is sufficient).
3. Under **Network Access**, add `0.0.0.0/0` (Allow access from anywhere).
4. Under **Database Access**, create a user and password.
5. Get your **Connection String** (URI).

## 2. Backend Deployment (Render.com)
1. Push your code to a GitHub repository.
2. Register at [Render](https://render.com).
3. Dashboard → **New** → **Web Service**.
4. Connect your GitHub Repo.
5. **Settings**:
   - **Root Directory**: `backend` (or leave empty if repo is only backend)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. **Environment Variables**:
   - `MONGO_URI`: (Your MongoDB Atlas String)
   - `JWT_SECRET`: (A long random string)
   - `CLOUDINARY_CLOUD_NAME`: (From your Cloudinary dashboard)
   - `CLOUDINARY_API_KEY`: (From your Cloudinary dashboard)
   - `CLOUDINARY_API_SECRET`: (From your Cloudinary dashboard)
   - `FRONTEND_URL`: (Your Vercel URL - come back here after step 3)
   - `NODE_ENV`: `production`

## 3. Frontend Deployment (Vercel)
1. Register at [Vercel](https://vercel.com).
2. **New Project** → Import your GitHub Repo.
3. **Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
4. **Environment Variables**:
   - `VITE_API_URL`: (Your Render Backend URL + `/api`)
5. Click **Deploy**.

## 4. Final Connection
1. Once the Vercel app is live, copy its URL.
2. Go back to your **Render** settings and update the `FRONTEND_URL` environment variable with your new Vercel URL.
3. Your luxury boutique is now live! 🏺✨
