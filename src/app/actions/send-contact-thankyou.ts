'use server';

import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

/**
 * Sends a thank you confirmation email to the user after they contact us
 */
export async function sendContactThankYouEmail(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return { 
        success: false, 
        error: 'Email service not configured' 
      };
    }

    const subjectLabels: Record<string, string> = {
      'candidate': 'Job Seeker Inquiry',
      'employer': 'Employer Inquiry',
      'general': 'General Inquiry',
      'support': 'Support Request',
    };

    const subjectLabel = subjectLabels[formData.subject] || 'Inquiry';

    console.log('Sending contact thank you email to:', formData.email);

    const info = await transporter.sendMail({
      from: `"Shree Shyam Talent Solutions" <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject: 'Thank You for Contacting Shree Shyam Talent Solutions',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                SHREE SHYAM TALENT SOLUTIONS
              </h1>
              <p style="color: #d97706; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">
                YOUR CAREER PARTNER
              </p>
            </div>
            
            <div style="padding: 40px 30px;">
              <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 24px;">
                Thank You for Reaching Out, ${formData.name}!
              </h2>
              
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We have received your message and appreciate you taking the time to contact us. 
                Our team is reviewing your inquiry and will get back to you within <strong>24-48 hours</strong>.
              </p>
              
              <div style="background-color: #f8fafc; border-left: 4px solid #d97706; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 16px;">Your Message Summary:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #64748b; padding: 5px 0; font-size: 14px; width: 120px;"><strong>Subject:</strong></td>
                    <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${subjectLabel}</td>
                  </tr>
                  ${formData.company ? `
                  <tr>
                    <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Company:</strong></td>
                    <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${formData.company}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="color: #64748b; padding: 5px 0; font-size: 14px; vertical-align: top;"><strong>Message:</strong></td>
                    <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${formData.message.substring(0, 200)}${formData.message.length > 200 ? '...' : ''}</td>
                  </tr>
                </table>
              </div>
              
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                In the meantime, feel free to explore our services or browse our current job openings:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://shreeshyamconsultancy.com/jobs" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">
                  Browse Jobs
                </a>
                <a href="https://shreeshyamconsultancy.com/services" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">
                  Our Services
                </a>
              </div>
              
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Best regards,<br>
                <strong style="color: #0f172a;">The Shree Shyam Talent Solutions Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0f172a; padding: 30px; text-align: center;">
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 10px 0;">
                Gurugram, Haryana 122002, India
              </p>
              <p style="color: #94a3b8; font-size: 14px; margin: 0 0 15px 0;">
                📞 +91 8570022580 | ✉️ shreeshyamtalentsolutions@gmail.com
              </p>
              <div style="margin: 20px 0;">
                <a href="https://www.linkedin.com/company/shree-shyam-talent-solutions/" style="display: inline-block; margin: 0 8px;" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 24px; height: 24px; vertical-align: middle;" />
                </a>
                <a href="https://twitter.com" style="display: inline-block; margin: 0 8px;" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width: 24px; height: 24px; vertical-align: middle;" />
                </a>
                <a href="https://facebook.com" style="display: inline-block; margin: 0 8px;" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 24px; height: 24px; vertical-align: middle;" />
                </a>
                <a href="https://instagram.com" style="display: inline-block; margin: 0 8px;" target="_blank">
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px; vertical-align: middle;" />
                </a>
              </div>
              <p style="color: #64748b; font-size: 12px; margin: 15px 0 0 0;">
                © ${new Date().getFullYear()} Shree Shyam Talent Solutions. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('Contact thank you email sent successfully:', info.messageId);
    console.log('Email sent to:', formData.email);
    return { success: true };
  } catch (error) {
    console.error('Error sending contact thank you email:', error);
    console.error('Failed for email:', formData.email);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send confirmation email' 
    };
  }
}
