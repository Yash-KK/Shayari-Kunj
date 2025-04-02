# Shayari Kunj

Shayari Kunj is a beautifully designed web application for exploring, submitting, and enjoying shayaris (poetry). Built with **Next.js**, **TypeScript**, and **Framer Motion**, this app offers a seamless user experience with interactive animations and a dynamic shayari collection.

## ✨ Features
- 🌟 **Shayari of the Day** – A new shayari is displayed daily.
- 🏷 **Categorized Shayaris** – Browse by different topics.
- ➕ **Submit Your Shayari** – Users can contribute their own poetry.
- ⚡ **Fast & Responsive** – Optimized performance using Next.js.

## 🚀 Tech Stack
- **Frontend:** Next.js, React, TypeScript, TailwindCSS
- **Animations:** Framer Motion
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Clerk

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/YashKharche/Shayari-Kunj.git
   cd Shayari-Kunj
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install # or bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   DATABASE_URL=your_postgresql_connection_url
   ```

4. Run the development server:
   ```sh
   npm run dev  # or yarn dev # or bun run dev
   ```

## 📜 API Endpoints

### Fetch Shayaris
- **GET** `/api/shayaris` – Retrieves all available shayaris.

### Fetch Tags
- **GET** `/api/tags` – Fetches available tags.

### Submit Shayari
- **POST** `/api/shayaris`
  ```json
  {
    "description": "Your Shayari Text",
    "author": "Author Name",
    "tags": ["love", "friendship"]
  }
  ```
---
💖 Made with love by [Yash Kharche](https://yashkharche.tech)

