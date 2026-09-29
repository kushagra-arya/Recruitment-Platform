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
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

/**
 * Sends the contact inquiry email to the company and confirmation to the user
 */
export async function sendContactInquiry(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
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

    console.log('Sending contact inquiry from:', formData.email);

    const inquiryEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
              NEW CONTACT INQUIRY
            </h1>
            <p style="color: #d97706; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 1px;">
              ${subjectLabel.toUpperCase()}
            </p>
          </div>
          
          <div style="padding: 40px 30px;">
            <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 20px; border-bottom: 3px solid #d97706; padding-bottom: 10px;">
              Contact Information
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 0 0 30px 0;">
              <tr>
                <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600; width: 150px;">
                  Full Name:
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                  ${formData.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">
                  Email:
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                  <a href="mailto:${formData.email}" style="color: #d97706; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">
                  Phone:
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                  ${formData.phone || 'Not provided'}
                </td>
              </tr>
              ${formData.company ? `
              <tr>
                <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">
                  Company:
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                  ${formData.company}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 12px; background-color: #f8fafc; border: 1px solid #e2e8f0; font-weight: 600;">
                  Inquiry Type:
                </td>
                <td style="padding: 12px; background-color: #ffffff; border: 1px solid #e2e8f0;">
                  ${subjectLabel}
                </td>
              </tr>
            </table>
            
            <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 20px; border-bottom: 3px solid #d97706; padding-bottom: 10px;">
              Message
            </h2>
            
            <div style="background-color: #f8fafc; border-left: 4px solid #d97706; padding: 20px; margin: 0 0 30px 0; border-radius: 0 8px 8px 0;">
              <p style="color: #0f172a; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formData.message}</p>
            </div>
            
            <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong> Quick Action:</strong> Reply directly to this email to respond to ${formData.name}
              </p>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' })} IST
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"${formData.name} (via Website)" <${process.env.SMTP_USER}>`,
      to: 'shreeshyamtalentsolutions@gmail.com',
      replyTo: formData.email,
      subject: `${subjectLabel}: ${formData.name}`,
      html: inquiryEmailHtml,
    });

    console.log('Contact inquiry sent to company');

    const confirmationHtml = `
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
              We have successfully received your message and appreciate you taking the time to contact us. 
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
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://shreeshyamtalentsolutions.vercel.app'}/jobs" style="display: inline-block; background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">
                Browse Jobs
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://shreeshyamtalentsolutions.vercel.app'}/services" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 5px;">
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
    `;

    await transporter.sendMail({
      from: `"Shree Shyam Talent Solutions" <${process.env.SMTP_USER}>`,
      to: formData.email,
      subject: 'Thank You for Contacting Shree Shyam Talent Solutions',
      html: confirmationHtml,
    });

    console.log('Confirmation email sent to user:', formData.email);

    return { success: true };
  } catch (error) {
    console.error('Error sending contact emails:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send emails' 
    };
  }
}
