import nodemailer from 'nodemailer';

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

interface CandidateInfo {
  name: string;
  email: string;
  phone: string;
  role: string;
  resumeUrl: string;
}

/**
 * Sends an admin notification email with the updated CSV attached
 * 
 * @param latestCsvBuffer - Buffer containing the updated candidates CSV
 * @param candidateInfo - Optional info about the latest candidate for the email body
 * @returns Promise<boolean> - true if email sent successfully
 */
export async function sendAdminNotification(
  latestCsvBuffer: Buffer,
  candidateInfo?: CandidateInfo
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn('ADMIN_EMAIL not configured, skipping email notification');
    return false;
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP credentials not configured, skipping email notification');
    return false;
  }

  try {
    const emailBody = candidateInfo
      ? `
        <h2>New Candidate Application Received</h2>
        <p>A new candidate has submitted their application:</p>
        <table style="border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${candidateInfo.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${candidateInfo.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${candidateInfo.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Current Role:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${candidateInfo.role}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Resume:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              <a href="${candidateInfo.resumeUrl}">View Resume</a>
            </td>
          </tr>
        </table>
        <p>The complete candidates list is attached as a CSV file.</p>
        <hr style="margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from Shree Shyam Talent Solutions.
        </p>
      `
      : `
        <h2>New Candidate Application</h2>
        <p>A new candidate has submitted their application.</p>
        <p>The complete candidates list is attached as a CSV file.</p>
        <hr style="margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          This is an automated notification from Shree Shyam Talent Solutions.
        </p>
      `;

    const info = await transporter.sendMail({
      from: `"Shree Shyam Talent Solutions" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      subject: 'New Candidate Application',
      html: emailBody,
      attachments: [
        {
          filename: 'candidates_master.csv',
          content: latestCsvBuffer,
          contentType: 'text/csv',
        },
      ],
    });

    console.log('Admin notification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw new Error(
      `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

interface CandidateConfirmationData {
  name: string;
  email: string;
  phone: string;
  location: string;
  qualification: string;
  currentRole: string;
  industry: string;
  experience: string;
  jobType: string;
  currentSalary?: string;
  expectedSalary?: string;
  linkedIn?: string;
  portfolio?: string;
  coverLetter?: string;
}

/**
 * Sends a confirmation email to the candidate
 * 
 * @param candidateData - The candidate's application details
 * @returns Promise<boolean> - true if email sent successfully
 */
export async function sendCandidateConfirmation(
  candidateData: CandidateConfirmationData
): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP credentials not configured, skipping confirmation email');
    return false;
  }

  try {
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
              SHREE SHYAM TALENT SOLUTIONS
            </h1>
            <p style="color: #d97706; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">
              YOUR CAREER PARTNER
            </p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 24px;">
              Thank You for Applying, ${candidateData.name}!
            </h2>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              We have successfully received your application and appreciate you taking the time to apply with us. 
              Our recruitment team is reviewing your profile and will get back to you within <strong>24-48 hours</strong> if your qualifications match our current openings.
            </p>
            
            <!-- Application Summary Box -->
            <div style="background-color: #f8fafc; border-left: 4px solid #d97706; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #0f172a; margin: 0 0 15px 0; font-size: 16px;">Your Application Summary:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px; width: 150px;"><strong>Name:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.name}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.email}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.phone}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Location:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.location}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Qualification:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.qualification}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Current Role:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.currentRole}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Industry:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.industry}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Experience:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.experience}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Job Type:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.jobType}</td>
                </tr>
                ${candidateData.currentSalary ? `
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Current Salary:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.currentSalary}</td>
                </tr>
                ` : ''}
                ${candidateData.expectedSalary ? `
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Expected Salary:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.expectedSalary}</td>
                </tr>
                ` : ''}
                ${candidateData.linkedIn ? `
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>LinkedIn:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;"><a href="${candidateData.linkedIn}" style="color: #d97706; text-decoration: none;">View Profile</a></td>
                </tr>
                ` : ''}
                ${candidateData.portfolio ? `
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px;"><strong>Portfolio:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;"><a href="${candidateData.portfolio}" style="color: #d97706; text-decoration: none;">View Portfolio</a></td>
                </tr>
                ` : ''}
                ${candidateData.coverLetter ? `
                <tr>
                  <td style="color: #64748b; padding: 5px 0; font-size: 14px; vertical-align: top;"><strong>Cover Letter:</strong></td>
                  <td style="color: #0f172a; padding: 5px 0; font-size: 14px;">${candidateData.coverLetter.substring(0, 200)}${candidateData.coverLetter.length > 200 ? '...' : ''}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              In the meantime, feel free to explore our services or browse our current job openings:
            </p>
            
            <!-- CTA Buttons -->
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

    const info = await transporter.sendMail({
      from: `"Shree Shyam Talent Solutions" <${process.env.SMTP_USER}>`,
      to: candidateData.email,
      subject: 'Thank You for Applying to Shree Shyam Talent Solutions',
      html: confirmationHtml,
    });

    console.log('Candidate confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending candidate confirmation email:', error);
    return false;
  }
}

/**
 * Verify SMTP connection is working
 */
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}
