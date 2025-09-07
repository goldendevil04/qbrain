import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
};

export const sendContactEmail = async (formData: any) => {
  try {
    // Send email to admin
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'nkalam.ind@gmail.com'
      }
    );

    // Send auto-reply to user
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
      {
        to_name: formData.name,
        to_email: formData.email,
        from_email: 'noreply@qbrain.in'
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendApplicationEmail = async (applicationData: any) => {
  try {
    // Send application to admin
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_APPLICATION_TEMPLATE_ID,
      {
        applicant_name: applicationData.personalInfo.fullName,
        applicant_email: applicationData.personalInfo.email,
        preferred_role: applicationData.personalInfo.preferredRole,
        branch: applicationData.personalInfo.branch,
        year: applicationData.personalInfo.year,
        phone: applicationData.personalInfo.phone,
        motivation: applicationData.personalInfo.motivation,
        quiz_score: applicationData.quizResults?.score || 'Not completed',
        to_email: 'nkalam.ind@gmail.com'
      }
    );

    // Send confirmation to applicant
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_APPLICATION_CONFIRMATION_TEMPLATE_ID,
      {
        to_name: applicationData.personalInfo.fullName,
        to_email: applicationData.personalInfo.email,
        from_email: 'noreply@qbrain.in'
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Application email sending failed:', error);
    return { success: false, error };
  }
};