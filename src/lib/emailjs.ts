// import emailjs from '@emailjs/browser';

// EmailJS configuration
export const EMAILJS_CONFIG = {
  // You'll need to replace these with your actual EmailJS credentials
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// Initialize EmailJS
export const initializeEmailJS = () => {
  // emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Contact form data interface
export interface ContactFormData {
  company_name: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_country: string;
  message: string;
}

// Send contact form email
export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Initialize EmailJS if not already done
    initializeEmailJS();

    // Prepare template parameters
    const templateParams = {
      // Standard EmailJS variables
      from_name: formData.user_name,
      from_email: formData.user_email,
      to_name: 'SPR Naturals Team',
      reply_to: formData.user_email,
      
      // Custom variables for the template
      user_name: formData.user_name,
      user_email: formData.user_email,
      company_name: formData.company_name,
      phone_number: formData.user_phone,
      user_phone: formData.user_phone,
      country: formData.user_country,
      user_country: formData.user_country,
      message: formData.message,
      
      // Additional variables for better template compatibility
      subject: `New Contact Form Submission from ${formData.user_name}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    // Debug: Log the parameters being sent
    console.log('EmailJS Template Parameters:', templateParams);

    // Send email
    // const response = await emailjs.send(
    //   EMAILJS_CONFIG.SERVICE_ID,
    //   EMAILJS_CONFIG.TEMPLATE_ID,
    //   templateParams
    // );
    const response = { status: 200 }; // Fake response for disabled form

    if (response.status === 200) {
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    };
  }
};

// Validate form data
export const validateContactForm = (formData: ContactFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.user_name.trim()) {
    errors.push('Name is required');
  }

  if (!formData.user_email.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
    errors.push('Please enter a valid email address');
  }

  if (!formData.user_phone.trim()) {
    errors.push('Phone number is required');
  }

  if (!formData.user_country) {
    errors.push('Country is required');
  }

  if (!formData.message.trim()) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
