# Qbrain Website Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Firebase Project**: Create a project at [console.firebase.google.com](https://console.firebase.google.com)
3. **EmailJS Account**: Sign up at [emailjs.com](https://www.emailjs.com)
4. **Hostinger Email**: Set up noreply@qbrain.in email

## Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "qbrain-website"
4. Enable Google Analytics (optional)

### 1.2 Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Add your admin email (nkalam.ind@gmail.com) in Users tab

### 1.3 Setup Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in production mode
4. Choose your preferred location

### 1.4 Setup Storage
1. Go to Storage
2. Click "Get started"
3. Use default security rules for now

### 1.5 Get Firebase Config
1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click "Web" icon to add web app
4. Register app with name "qbrain-website"
5. Copy the config object values

## Step 2: EmailJS Setup

### 2.1 Create EmailJS Account
1. Sign up at [EmailJS](https://www.emailjs.com)
2. Go to Email Services
3. Add your email service (Gmail, Outlook, etc.)

### 2.2 Create Email Templates

#### Contact Form Template (ID: contact_form)
```
Subject: New Contact Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Qbrain website contact form.
```

#### Auto-Reply Template (ID: contact_autoreply)
```
Subject: Thank you for contacting Qbrain

Hi {{to_name}},

Thank you for reaching out to Qbrain! We've received your message and will get back to you within 24 hours.

Best regards,
Team Qbrain

---
This is an automated response from noreply@qbrain.in
```

#### Application Template (ID: team_application)
```
Subject: New Team Application - {{applicant_name}}

New team application received:

Name: {{applicant_name}}
Email: {{applicant_email}}
Phone: {{phone}}
Preferred Role: {{preferred_role}}
Branch: {{branch}}
Year: {{year}}
Quiz Score: {{quiz_score}}

Motivation:
{{motivation}}

---
Review this application in the admin panel.
```

#### Application Confirmation Template (ID: application_confirmation)
```
Subject: Application Received - Qbrain Team

Hi {{to_name}},

Thank you for applying to join the Qbrain team! We've received your application and will review it shortly.

Next steps:
1. We'll review your application and quiz results
2. If selected, we'll contact you for an interview
3. Final selection will be communicated via email

Best regards,
Team Qbrain

---
This is an automated response from noreply@qbrain.in
```

### 2.3 Get EmailJS Keys
1. Go to Account > API Keys
2. Copy your Public Key
3. Go to Email Services and copy Service ID
4. Copy Template IDs from Email Templates section

## Step 3: Environment Variables

Create a `.env` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_CONTACT_TEMPLATE_ID=contact_form
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=contact_autoreply
VITE_EMAILJS_APPLICATION_TEMPLATE_ID=team_application
VITE_EMAILJS_APPLICATION_CONFIRMATION_TEMPLATE_ID=application_confirmation
```

## Step 4: Vercel Deployment

### 4.1 Connect Repository
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository

### 4.2 Configure Build Settings
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 4.3 Add Environment Variables
1. Go to Project Settings > Environment Variables
2. Add all variables from your `.env` file
3. Make sure to add them for Production, Preview, and Development

### 4.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your site will be available at `https://your-project-name.vercel.app`

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain in Vercel
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., qbrain.in)
3. Follow DNS configuration instructions

### 5.2 Update DNS Records
Add these records to your domain provider:
- Type: A, Name: @, Value: 76.76.19.19
- Type: CNAME, Name: www, Value: cname.vercel-dns.com

## Step 6: Admin Access

### 6.1 Create Admin User
1. Go to your deployed site
2. Visit `/Qadmin`
3. Try to login - it will fail but create the user in Firebase
4. Go to Firebase Console > Authentication
5. Find your email and verify it's there

### 6.2 Test Admin Panel
1. Login with your admin credentials
2. Test adding team members, hackathons
3. Check if emails are being sent properly

## Step 7: Email Configuration

### 7.1 Hostinger Email Setup
1. Set up noreply@qbrain.in in Hostinger
2. Configure SMTP settings in EmailJS
3. Test email sending

### 7.2 Email Templates Testing
1. Submit a contact form
2. Submit a team application
3. Verify emails are received at nkalam.ind@gmail.com
4. Verify auto-replies are sent from noreply@qbrain.in

## Step 8: Final Testing

### 8.1 Frontend Testing
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Team application process works
- [ ] Admin panel accessible at /Qadmin
- [ ] Responsive design works on mobile

### 8.2 Backend Testing
- [ ] Firebase data is being saved
- [ ] Images upload to Firebase Storage
- [ ] Emails are being sent
- [ ] Admin can manage content

### 8.3 Performance Testing
- [ ] Site loads quickly
- [ ] Images are optimized
- [ ] No console errors

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Check environment variables
   - Verify Firebase config
   - Check Firebase project settings

2. **Email Not Sending**
   - Verify EmailJS service configuration
   - Check template IDs
   - Test EmailJS service separately

3. **Admin Panel Not Working**
   - Check Firebase Authentication setup
   - Verify admin user exists
   - Check browser console for errors

4. **Images Not Uploading**
   - Check Firebase Storage rules
   - Verify storage bucket configuration
   - Check file size limits

### Support

For deployment issues:
- Check Vercel deployment logs
- Review Firebase console for errors
- Test EmailJS templates separately
- Contact support if needed

## Security Notes

1. Never commit `.env` file to repository
2. Use Firebase Security Rules for production
3. Enable CORS properly for your domain
4. Regular backup of Firebase data
5. Monitor usage and costs

## Maintenance

1. Regular Firebase data backups
2. Monitor email sending limits
3. Update dependencies regularly
4. Check Vercel deployment logs
5. Monitor site performance

Your Qbrain website is now fully dynamic and ready for production!