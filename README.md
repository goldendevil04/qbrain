# Qbrain Website - Complete Setup Guide

A modern, dynamic, and fully responsive website for the Qbrain team with advanced admin panel, blog system, theme customization, and achievement gallery.

## 🚀 Features

### Frontend Features
- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Dynamic Theming**: Admin can customize colors, fonts, spacing, and animations
- **Achievement Gallery**: Visual showcase of team accomplishments with images
- **Blog System**: Full-featured blog with SEO optimization and FAQ sections
- **Modern UI**: Clean, crystal-clear design with smooth animations
- **Contact System**: Advanced contact form with email notifications

### Admin Panel Features
- **Team Management**: Add, edit, delete team members with profile images
- **Achievement Manager**: Manage hackathons, competitions, and projects with images
- **Blog Editor**: Rich text editor with SEO tools, FAQ builder, and media management
- **Theme Customizer**: Real-time theme editing with live preview
- **Application Manager**: Review team applications and quiz results
- **Contact Manager**: View and respond to contact messages
- **Dashboard Analytics**: Overview of all system statistics

### Technical Features
- **Nodemailer Integration**: Professional email system with Hostinger SMTP
- **Firebase Backend**: Real-time database and file storage
- **SEO Optimized**: Meta tags, structured data, and search engine friendly
- **Performance Optimized**: Fast loading with image optimization
- **Security**: Protected admin routes and secure file uploads

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Firebase account
- Hostinger email account (for SMTP)
- Vercel account (for deployment)

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd qbrain-website
npm install
cd server
npm install
cd ..
```

### 2. Firebase Setup

#### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "qbrain-website"
4. Enable Google Analytics (optional)

#### 2.2 Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add your admin email in Users tab manually

#### 2.3 Setup Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in production mode
4. Choose your preferred location

#### 2.4 Setup Storage
1. Go to Storage
2. Click "Get started"
3. Use default security rules for now

#### 2.5 Get Firebase Config
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web" icon to add web app
4. Register app with name "qbrain-website"
5. Copy the config object values

### 3. Hostinger Email Setup

#### 3.1 Create Email Account
1. Login to Hostinger control panel
2. Go to Email section
3. Create email: `noreply@yourdomain.com`
4. Set a strong password
5. Note down SMTP settings:
   - Host: `smtp.hostinger.com`
   - Port: `587`
   - Security: `STARTTLS`

#### 3.2 Email Configuration
The system uses these email templates:
- **Contact Form**: Sends inquiries to admin
- **Auto-Reply**: Confirms message receipt
- **Application**: Team application notifications
- **Application Confirmation**: Confirms application submission

### 4. Environment Variables

Create `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=http://localhost:3001

# Production API URL (for deployment)
# VITE_API_BASE_URL=https://your-domain.vercel.app
```

Create `.env` file in the `server` directory:

```env
# SMTP Configuration (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password

# Admin Configuration
ADMIN_EMAIL=your_admin_email@gmail.com

# Environment
NODE_ENV=production
```

### 5. Local Development

#### 5.1 Start Backend Server
```bash
cd server
npm run dev
```

#### 5.2 Start Frontend (in new terminal)
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001`

### 6. Admin Panel Setup

#### 6.1 Create Admin User
1. Go to your local site: `http://localhost:5173/Qadmin`
2. Try to login with your email - it will fail but create the user
3. Go to Firebase Console > Authentication
4. Find your email and verify it exists

#### 6.2 Test Admin Features
1. Login with your credentials
2. Test adding team members
3. Create a blog post
4. Customize theme colors
5. Add achievements with images

## 🚀 Deployment to Vercel

### 1. Prepare for Deployment

#### 1.1 Update Environment Variables
Update `.env` with production API URL:
```env
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

#### 1.2 Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

#### 2.1 Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository

#### 2.2 Configure Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### 2.3 Add Environment Variables
In Vercel project settings, add all environment variables from both `.env` files:

**Frontend Variables:**
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_BASE_URL` (set to your Vercel domain)

**Backend Variables:**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `ADMIN_EMAIL`
- `NODE_ENV`

#### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your site will be available at `https://your-project-name.vercel.app`

### 3. Post-Deployment Setup

#### 3.1 Update API URL
Update your `.env` file with the production URL:
```env
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

#### 3.2 Test Production Features
1. Test contact form email sending
2. Test team application process
3. Verify admin panel functionality
4. Check theme customization
5. Test blog creation and publishing

## 📱 Responsive Design

The website is fully responsive across all devices:

### Mobile (320px - 768px)
- Collapsible navigation menu
- Stacked content layouts
- Touch-friendly buttons
- Optimized image sizes

### Tablet (768px - 1024px)
- Grid layouts adapt to screen size
- Sidebar navigation for admin panel
- Balanced content distribution

### Desktop (1024px+)
- Full sidebar navigation
- Multi-column layouts
- Hover effects and animations
- Maximum content visibility

## 🎨 Theme Customization

### Admin Theme Editor
Access via Admin Panel > Theme:

1. **Colors**: Primary, secondary, accent, background, surface, text colors
2. **Typography**: Heading and body font families
3. **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
4. **Border Radius**: Corner rounding for different elements
5. **Animations**: Duration and easing functions
6. **Layout**: Max width, header height, footer height

### CSS Custom Properties
The theme system uses CSS custom properties that can be dynamically updated:

```css
:root {
  --color-primary: #00D4FF;
  --color-secondary: #39FF14;
  --font-heading: Inter, system-ui, sans-serif;
  --spacing-md: 1.5rem;
  --border-radius-lg: 0.75rem;
}
```

## 📝 Blog System Features

### Rich Text Editor
- Full WYSIWYG editing with ReactQuill
- Image upload and embedding
- Code syntax highlighting
- Link management
- Text formatting options

### SEO Optimization
- Meta title and description
- Keywords management
- Canonical URLs
- Structured data (JSON-LD)
- Open Graph tags
- Twitter Card tags

### FAQ Builder
- Add unlimited FAQ sections
- Question and answer pairs
- Structured data for search engines
- Collapsible FAQ display

### Content Management
- Draft and published states
- Auto-save functionality
- Read time calculation
- Tag and category system
- Featured images
- Author attribution

## 🏆 Achievement Gallery

### Visual Showcase
- High-quality image uploads
- Multiple images per achievement
- Category-based organization
- Responsive image galleries

### Achievement Types
- **Hackathons**: Competition victories
- **Projects**: Technical achievements
- **Recognition**: Awards and certificates
- **Competitions**: Contest results

### Rich Metadata
- Date and location
- Team size and roles
- Technologies used
- Prize and recognition details
- Impact and significance
- Key highlights

## 📧 Email System

### Nodemailer Configuration
The system uses Nodemailer with Hostinger SMTP:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
```

### Email Templates
Professional HTML email templates for:
- Contact form submissions
- Auto-reply confirmations
- Team application notifications
- Application confirmations

### Email Features
- HTML and plain text versions
- Responsive email design
- Attachment support (resumes)
- Error handling and logging
- Rate limiting protection

## 🔒 Security Features

### Authentication
- Firebase Authentication
- Protected admin routes
- Session management
- Secure password handling

### File Upload Security
- File type validation
- File size limits (10MB)
- Secure file storage
- Image optimization

### API Security
- CORS configuration
- Request validation
- Error handling
- Rate limiting

## 🚀 Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization and compression
- CSS and JavaScript minification
- Gzip compression
- CDN delivery via Vercel

### Backend Optimization
- Efficient database queries
- File upload optimization
- Response caching
- Error logging and monitoring

## 🐛 Troubleshooting

### Common Issues

#### 1. Email Not Sending
- Check SMTP credentials in server `.env`
- Verify Hostinger email account is active
- Check firewall settings for port 587
- Review server logs for error messages

#### 2. Firebase Connection Error
- Verify Firebase config in `.env`
- Check Firebase project settings
- Ensure Firestore and Storage are enabled
- Verify API keys are correct

#### 3. Admin Panel Not Loading
- Check Firebase Authentication setup
- Verify admin user exists in Firebase
- Check browser console for errors
- Ensure admin routes are protected

#### 4. Images Not Uploading
- Check Firebase Storage rules
- Verify file size limits (10MB)
- Check file type restrictions
- Review browser network tab for errors

#### 5. Theme Not Applying
- Check CSS custom properties
- Verify theme service is working
- Clear browser cache
- Check for JavaScript errors

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

### Support
For additional support:
1. Check browser console for errors
2. Review server logs
3. Verify all environment variables
4. Test individual components
5. Contact development team

## 📊 Analytics and Monitoring

### Built-in Analytics
- Dashboard statistics
- User engagement metrics
- Content performance
- System health monitoring

### External Integration
Ready for integration with:
- Google Analytics 4
- Google Search Console
- Social media analytics
- Email marketing platforms

## 🔄 Maintenance

### Regular Tasks
1. **Weekly**: Review contact messages and applications
2. **Monthly**: Update blog content and achievements
3. **Quarterly**: Review and update theme design
4. **Annually**: Update dependencies and security patches

### Backup Strategy
1. **Firebase**: Automatic backups enabled
2. **Code**: Version control with Git
3. **Images**: Stored in Firebase Storage
4. **Configuration**: Environment variables documented

### Updates
1. Monitor for security updates
2. Update dependencies regularly
3. Test new features in development
4. Deploy updates during low-traffic periods

---

## 🎉 Congratulations!

Your Qbrain website is now fully set up with:
- ✅ Modern, responsive design
- ✅ Dynamic theme customization
- ✅ Professional email system
- ✅ Advanced admin panel
- ✅ SEO-optimized blog system
- ✅ Visual achievement gallery
- ✅ Secure authentication
- ✅ Production deployment

The website is ready for production use and can be easily maintained and updated through the admin panel.

For any questions or support, refer to the troubleshooting section or contact the development team.