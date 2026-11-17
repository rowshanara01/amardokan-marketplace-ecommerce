# 🛍️ AmarDokan (AmarDokan AI) — Bangladeshi E-Commerce Marketplace

**AmarDokan** is a modern, AI-powered Bangladeshi e-commerce marketplace. It delivers traditional local products straight from weavers and artisans to customers, such as 100-count Dhakai Jamdani from Rupganj in Narayanganj, Rajshahi silk, pure honey from the Sundarbans, Nakshi Kantha, and leather goods from Hazaribagh.

---

## 🌟 Key Features

### 1. 🛍️ Authentic Local Products
- **100-count Dhakai Jamdani sarees**: GI-certified sarees hand-woven by the weavers of Rupganj.
- **Rajshahi silk and cotton panjabis**: A premium panjabi collection for Eid and festivals.
- **Pure Sundarbans honey and tea**: 100% organic lotus honey collected by honey gatherers (mowals), and orthodox black tea from Sreemangal.
- **Handicrafts and leather goods**: Nakshi Kantha from Jessore and genuine leather wallets from Hazaribagh.

### 2. 🤖 AI Quality Verification and Smart Search
- **AI Verified badge**: The originality and quality of every product is checked by AI.
- **Visual and voice search**: Find products by uploading a photo or using your voice.
- **AI shopping assistant**: A 24/7 AI chatbot to help you while shopping.

### 3. 👑 Admin Control Panel and Card Management
- **Add and delete products**: Add new products or delete any product card from the admin panel.
- **Delete from the home page**: Hover over a product to delete its card directly.
- **Order list and invoice tracking**: View all customer orders and delivery details.

### 4. 🔐 Admin Credentials and Vercel Configuration
- **Default login**:
  - **Email**: `admin@amardokan.com`
  - **Password**: `admin123`
- **Vercel / Cloud deployment**:
  To set a custom admin email and password on Vercel, add these **Environment Variables**:
  ```env
  VITE_ADMIN_EMAIL=your-custom-email@gmail.com
  VITE_ADMIN_PASSWORD=your-secure-password
  ```

> ⚠️ **Security note:** Change the default credentials before going live. Also keep in mind that `VITE_`-prefixed variables are bundled into the frontend code, so they are visible to anyone. For real production use, authenticate through a backend.

### 5. 🖼️ Dynamic Hero Banner
- Click the **"Change Image"** button on the home page hero banner to upload any custom banner image and store it locally.

### 6. 🧾 Invoice and Printable Receipt
- An invoice is generated automatically right after checkout. You can download it as a PDF or print it directly.

### 7. 🌐 Bilingual Support (Bengali and English)
- Switch between Bengali and English with a single click.

---

## 🛠️ Tech Stack

- **Frontend framework**: React 18 with TypeScript
- **Build tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel / Cloud Run / GitHub Pages

---

## 🚀 Local Setup

1. Download or clone the project:
   ```bash
   git clone https://github.com/your-username/amardokan-ai.git
   cd amardokan-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Create a production build:
   ```bash
   npm run build
   ```

---

## 🌐 Vercel Deployment Guide

1. Log in to [Vercel](https://vercel.com) and click **Import Repository**.
2. Select **Vite** as the Framework Preset.
3. Under **Environment Variables**, add these two keys:
   - `VITE_ADMIN_EMAIL`: your preferred admin email
   - `VITE_ADMIN_PASSWORD`: your admin password
4. Click **Deploy**. Your app will be live in about 2 minutes!

---

© 2026 **AmarDokan (AmarDokan AI)** — Crafted with ❤️ for Bangladeshi Heritage.
