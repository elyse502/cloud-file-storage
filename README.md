# ☁️ Cloud-Based File Storage System

A lightweight MERN stack (MongoDB, Express, React, Node.js) application that allows users to register, log in, upload files (including images, PDFs, and docs), and manage them with Cloudinary as the file storage backend.

---

## 📦 Features

- ✅ User registration & login (JWT auth)
- ☁️ File upload & retrieval via Cloudinary
- 🗂 Supports images, PDFs, docs, HTML, etc.
- 🧾 View uploaded files per user
- ❌ Delete files from both DB & Cloudinary

---

## 🚀 Quick Setup Guide

### 📁 1. Clone the Repository

```bash
git clone https://github.com/elyse502/cloud-file-storage.git
cd cloud-file-storage
```

---

## ⚙️ 2. Server Setup

```bash
cd server
npm install
```

### 🔐 Add a `.env` file in the `/server` folder:

```env
PORT=5000
MONGO_URI="your_mongo_connection_string_here"
JWT_SECRET="your_jwt_secret"
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"
```

> 🔒 Your Mongo URI should look like:
>
> ```
> mongodb+srv://<username>:<password>@cluster0.mongodb.net/<your-db-name>
> ```

### ▶️ Start the server

```bash
npm run dev
```

---

## 🌐 3. Client Setup

```bash
cd ../client
npm install
```

### 🔐 Add a `.env` file in the `/client` folder:

```env
VITE_API_URL="http://localhost:5000/api"
```

### ▶️ Start the client

```bash
npm run dev
```

---

## 🧪 Test It

- Go to: `http://localhost:5173`
- Register a new account or login
- Upload files & manage them on your dashboard

---

## 📝 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Express.js + MongoDB + JWT
- **Storage:** Cloudinary (raw & image types)

---

## 📂 Folder Structure

```
/client       → Frontend (React)
/server       → Backend API (Express)
/uploads      → (optional) Temporary files if needed
```

---

## 📄 License

MIT © [license](https://github.com/elyse502/cloud-file-storage/blob/main/LICENSE)

<br /><hr /><br />

<div align="center">

**Made with ❤️**
</div>



