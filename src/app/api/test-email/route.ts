import { NextResponse } from 'next/server';
import { sendAdminNotification } from '@/lib/email';

export async function GET() {
  try {
    const testCsv = 'Name,Email,Phone,Location,Qualification,Role,Industry,Experience,Job_Type,Current_Salary,Expected_Salary,LinkedIn,Portfolio,Cover_Letter,Resume_Link,Status,Submission_Date\nTest User,test@example.com,1234567890,Test Location,Test Qualification,Test Role,Test Industry,Test Experience,Full-time,50000,60000,,,Test Cover Letter,https://example.com/resume.pdf,new,2026-01-29T00:00:00.000Z\n';
    const csvBuffer = Buffer.from(testCsv, 'utf-8');
    
    const candidateInfo = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      role: 'Test Role',
      resumeUrl: 'https://example.com/resume.pdf'
    };
    
    const result = await sendAdminNotification(csvBuffer, candidateInfo);
    
    if (result) {
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully to ' + process.env.ADMIN_EMAIL 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Email not sent - check SMTP configuration' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
