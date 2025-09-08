const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const sendContactEmail = async (formData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Contact email error:', error);
    return { success: false, error };
  }
};

export const sendApplicationEmail = async (applicationData: any, resumeFile?: File) => {
  try {
    const formData = new FormData();
    formData.append('applicationData', JSON.stringify(applicationData));
    
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }

    const response = await fetch(`${API_BASE_URL}/api/application`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Application email error:', error);
    return { success: false, error };
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error };
  }
};