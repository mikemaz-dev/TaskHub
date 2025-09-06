# 🚀 TaskHub - Modern Task Management Platform

> **A sleek, fast, and intuitive task management application built during the RED Summer 2025 marathon**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3.0-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3.0-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

- 🎯 **Project-based Task Organization** - Group and manage tasks by projects
- 📊 **Task Status Tracking** - Monitor progress with visual indicators
- 🔄 **Real-time Sync** - Data synchronization via Supabase
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark/Light Theme** - Beautiful theme switching
- 🚀 **Modern UI/UX** - Clean, intuitive interface
- ⚡ **Fast Performance** - Built with Next.js 14 and optimized for speed

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend & Database

- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **API**: Next.js API Routes

### Development Tools

- **Package Manager**: [Bun](https://bun.sh/)
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/)
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/taskhub.git
   cd taskhub
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

---

## 📁 Project Structure

```
taskhub/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable UI components
│   ├── sections/            # Page sections and features
│   ├── services/            # API and external services
│   ├── store/               # State management
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── supabase/                # Database configuration
└── components.json          # shadcn/ui configuration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⭐ Star This Repository

If TaskHub has been helpful to you, please consider giving it a star! ⭐

[![GitHub stars](https://img.shields.io/github/stars/mikemaz-dev/taskhub?style=social)](https://github.com/mikemaz-dev/taskhub)

---

## 🙏 Acknowledgments

- Built during the **RED Summer 2025** marathon
- Inspired by [Task Management Web App – UI Design](https://dribbble.com/shots/25947726-Task-Management-Web-App-UI-Design)

---

<div align="center">

**Made with ❤️ during RED Summer 2025**

[![RED Summer 2025](https://img.shields.io/badge/RED_Summer_2025-Marathon-red?style=for-the-badge)](https://red-summer-2025.com)

</div>
