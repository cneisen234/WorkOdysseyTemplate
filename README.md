# Work Odyssey - Dual Authentication Job Platform

A modern job platform built with Next.js 14, featuring separate authentication systems for job seekers and companies. Built with TypeScript, Tailwind CSS, Prisma, Supabase, and NextAuth.

## 🚀 Features

- **Dual Authentication System**: Completely separate login/registration for job seekers and companies
- **Job Seeker Features**: Profile management, resume uploads, job browsing, application tracking
- **Company Features**: Job posting management, applicant tracking, company profile
- **Modern Tech Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with custom credential providers
- **Hosting**: Vercel-ready deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**

You'll also need accounts for:

- [Supabase](https://supabase.com) (for PostgreSQL database)
- [Vercel](https://vercel.com) (for deployment, optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/work-odyssey.git
cd work-odyssey
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables [copy from example.env]:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Open AI (AI Integration)
OPENAI_API_KEY="your-openai-api-key-here"
```

### 4. Set Up Supabase Database

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Wait for the database to be ready
4. Select your project
5. Click "connect"
6. Copy the string from "direct connection" [should be the top option]
7. Update your `.env` file with these values
8. Replace [YOUR-PASSWORD] with the database account password

HINT: when setting up a supabase password AVOID SPECIAL CHARACTERS

### 5. Set Up Database Schema

Generate Prisma client and push schema to database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push

# Optional: View your database in Prisma Studio
npx prisma studio
```

### 6. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
# Generate a random secret
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` in `.env`.

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔐 Authentication System

This project implements a **dual authentication system** with the following key features:

### Separate User Types

- **Job Seekers**: Can create profiles, upload resumes, browse jobs
- **Companies**: Can post jobs, manage applications, view company analytics

### Security Features

- ✅ Completely isolated authentication flows
- ✅ User type validation at database level
- ✅ Protected routes with server-side session checking
- ✅ Password hashing with bcrypt
- ✅ JWT session management

### Authentication Flow

1. Users choose their type (Job Seeker or Company) during registration
2. Separate credential providers handle authentication
3. User type is stored in database and JWT token
4. Route protection ensures users only access appropriate dashboards

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Base user authentication (email, password, userType)
- **JobSeeker**: Job seeker specific data (name, profile info)
- **Company**: Company specific data (company name, profile info)
- **Account/Session**: NextAuth required tables

See `prisma/schema.prisma` for the complete schema.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
   - `OPENAI_API_KEY`
4. Deploy!

### Environment Variables for Production

Update `NEXTAUTH_URL` for production:

```env
NEXTAUTH_URL="https://your-app-name.vercel.app"
```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Database commands
npx prisma studio          # View database
npx prisma db push         # Push schema changes
npx prisma generate        # Generate Prisma client
npx prisma migrate dev     # Create and apply migration
```

### Adding New Features

1. **Database Changes**: Update `prisma/schema.prisma` and run `npx prisma db push`
2. **New Pages**: Add to appropriate directory in `app/`
3. **Components**: Add reusable components to `components/`
4. **API Routes**: Add to `app/api/`

## 📝 Environment Variables Reference

| Variable          | Description                  | Required | Example                               |
| ----------------- | ---------------------------- | -------- | ------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string | ✅       | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Secret for NextAuth          | ✅       | `your-secret-key`                     |
| `NEXTAUTH_URL`    | App URL for NextAuth         | ✅       | `http://localhost:3000`               |
| `OPENAI_API_KEY`  | API Key to connect to OpenAI | ✅       | `your-openai-api-key-here`            |

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:

   - Verify your `DATABASE_URL` is correct
   - Ensure Supabase project is active
   - Check if database tables exist (`npx prisma studio`)

2. **Authentication Issues**:

   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Clear browser cookies and try again

3. **Build Errors**:

   - Run `npx prisma generate` after cloning
   - Ensure all environment variables are set
   - Check TypeScript errors with `npm run type-check`

4. **Route Not Found (404)**:
   - Verify file structure matches Next.js App Router conventions
   - Check for typos in folder names (e.g., `[id]` vs `id`)
   - Restart development server

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Prisma Documentation](https://www.prisma.io/docs)
- Check [NextAuth.js Documentation](https://next-auth.js.org)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for utility-first CSS
- [Prisma](https://prisma.io) for the excellent database toolkit
- [NextAuth.js](https://next-auth.js.org) for authentication
- [Supabase](https://supabase.com) for the database platform
