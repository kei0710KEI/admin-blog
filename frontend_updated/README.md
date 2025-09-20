# VBMBLOGS - Next.js 15 TypeScript Blog

A modern, SEO-optimized blog built with Next.js 15, TypeScript, and MongoDB. Features App Router, Server Components, structured data (JSON-LD), and comprehensive SEO optimization.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: MongoDB with Mongoose
- **Styling**: Global CSS (no framework dependencies)
- **SEO**: Metadata API, JSON-LD, robots.txt, sitemap.xml
- **Package Manager**: npm (package-lock.json)

## 📁 Project Structure

```
frontend_updated/
├── app/                          # Next.js 15 App Router
│   ├── _components/              # Reusable components
│   │   └── SeoJsonLd.tsx        # JSON-LD structured data component
│   ├── about/                    # Static pages
│   │   └── page.tsx
│   ├── blog/                     # Dynamic blog routes
│   │   └── [slug]/
│   │       ├── page.tsx          # Blog post page
│   │       └── CodeComponent.tsx # Syntax highlighting component
│   ├── contact/                  # Static pages
│   │   └── page.tsx
│   ├── tag/                      # Tag-based filtering
│   │   └── [tags]/
│   │       └── page.tsx
│   ├── topics/                   # Category-based filtering
│   │   └── [category]/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   └── getblog/
│   │       └── route.ts
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Error boundary
│   ├── robots.ts                 # SEO robots.txt
│   └── sitemap.ts                # Dynamic sitemap generation
├── components/                   # Legacy components (converted to TS)
│   ├── Aos.tsx                   # Animation on scroll
│   ├── Footer.tsx                # Site footer
│   ├── Header.tsx                # Navigation header
│   ├── ScrollToTopButton.tsx     # Scroll to top functionality
│   ├── TopLoadingLine.tsx        # Loading indicator
│   └── TopLoadingLineApp.tsx     # App Router loading component
├── hooks/                        # Custom React hooks
│   └── useFetchData.ts           # Data fetching hook (TypeScript)
├── lib/                          # Utility libraries
│   ├── env.ts                    # Environment variable validation (Zod)
│   ├── mongodb.ts                # MongoDB connection with caching
│   ├── mongoose.ts                # Mongoose re-export
│   └── url.ts                    # Absolute URL helper
├── models/                       # Database models
│   └── Blog.ts                   # Blog post schema (TypeScript)
├── public/                       # Static assets
│   ├── img/                      # Images
│   └── favicon.ico
├── styles/                       # Global styles
│   └── globals.css               # Main stylesheet (unchanged)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd frontend_updated
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   MONGODB_DB=your-database-name
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create the necessary collections
   - Blog posts should be stored in the `blogtest` collection

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Features

### SEO Optimization

- **Metadata API**: Dynamic title, description, and Open Graph tags
- **JSON-LD**: Structured data for WebSite, WebPage, and Article schemas
- **Robots.txt**: Automatic generation with sitemap reference
- **Sitemap.xml**: Dynamic sitemap with blog posts and static pages
- **Canonical URLs**: Proper canonical link tags
- **Twitter Cards**: Optimized social media sharing

### Performance

- **Server Components**: Default rendering on the server
- **Client Components**: Only when necessary (interactive elements)
- **MongoDB Caching**: Connection reuse to prevent multiple connections
- **Image Optimization**: Proper alt attributes for accessibility

### TypeScript

- **Strict Mode**: Full type safety
- **Interface Definitions**: Comprehensive type definitions for all data structures
- **Type Assertions**: Safe type casting where needed
- **Environment Validation**: Zod-based environment variable validation

### Blog Features

- **Dynamic Routing**: `/blog/[slug]` for individual posts
- **Tag Filtering**: `/tag/[tags]` for tag-based content
- **Category Filtering**: `/topics/[category]` for category-based content
- **Markdown Support**: Rich text content with syntax highlighting
- **Responsive Design**: Mobile-first approach

## 📝 Content Management

### Blog Post Structure

Each blog post in MongoDB should have the following structure:

```typescript
interface IBlog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  blogcategory: string[];
  tags: string[];
  status: string; // "publish" or "draft"
  createdAt: Date;
  updatedAt: Date;
  // Optional: ogImage for social sharing
}
```

### Adding New Content

1. Add blog posts directly to MongoDB
2. Ensure `status: "publish"` for published content
3. Use unique slugs for each post
4. Include proper tags and categories

## 🔧 Configuration

### TypeScript Configuration

The project uses strict TypeScript settings:

- `strict: true`
- `allowJs: true` (for gradual migration)
- Path aliases configured for clean imports

### Next.js Configuration

- App Router enabled
- Node.js runtime for database operations
- Static generation where possible

### MongoDB Configuration

- Connection caching to prevent multiple connections
- Lean queries for better performance
- Proper error handling

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
MONGODB_DB=your-production-database
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📊 SEO Features

### Automatic SEO

- **Title Tags**: Dynamic based on page content
- **Meta Descriptions**: Generated from content
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific optimization
- **Canonical URLs**: Prevents duplicate content issues

### Structured Data

- **WebSite Schema**: Homepage and site information
- **WebPage Schema**: Individual page information
- **Article Schema**: Blog post details with publication dates

### Sitemap

- **Static Pages**: Home, About, Contact
- **Dynamic Pages**: All published blog posts
- **Automatic Updates**: Regenerated when content changes

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**

   - Verify MongoDB is running
   - Check connection string format
   - Ensure database permissions

2. **TypeScript Errors**

   - Run `npm run build` to see all type errors
   - Check interface definitions in `models/`
   - Verify environment variable types

3. **Build Failures**
   - Clear `.next` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check for conflicting lockfiles

### Development Tips

- Use `npm run dev` for development
- Check browser console for client-side errors
- Use Next.js dev tools for debugging
- Monitor MongoDB connection in logs

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [SEO Best Practices](https://developers.google.com/search/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Next.js 15, TypeScript, and MongoDB**
