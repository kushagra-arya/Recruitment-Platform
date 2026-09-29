'use server';

import { bucket, db } from '@/lib/firebase-admin';
import { updateMasterCsv } from '@/lib/csv-handler';
import { sendAdminNotification, sendCandidateConfirmation } from '@/lib/email';

// Allowed file types
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface SubmitCandidateResult {
  success: boolean;
  message: string;
  resumeUrl?: string;
  error?: string;
}

/**
 * Check if an email is already registered in the database
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const snapshot = await db.collection('candidates')
      .where('email', '==', email.toLowerCase())
      .limit(1)
      .get();
    
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}

export async function submitCandidate(formData: FormData): Promise<SubmitCandidateResult> {
  try {
    const email = formData.get('email') as string;
    if (email) {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        return {
          success: false,
          message: 'Email already registered',
          error: 'This email is already registered. If you have already submitted an application, please wait for our response.',
        };
      }
    }

    const file = formData.get('resume') as File | null;

    if (!file) {
      return {
        success: false,
        message: 'No file provided',
        error: 'Please upload your resume',
      };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        message: 'Invalid file type',
        error: 'Please upload a PDF or Word document (.pdf, .doc, .docx)',
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: 'File too large',
        error: 'File size must be less than 5MB',
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const destinationPath = `resumes/${timestamp}-${sanitizedFilename}`;

    const fileRef = bucket.file(destinationPath);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    await fileRef.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destinationPath}`;

    const candidateData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string,
      qualification: formData.get('qualification') as string,
      currentRole: formData.get('currentRole') as string,
      jobType: formData.get('jobType') as string,
      industry: formData.get('industry') as string,
      experience: formData.get('experience') as string,
      currentSalary: formData.get('currentSalary') as string,
      expectedSalary: formData.get('expectedSalary') as string,
      linkedIn: formData.get('linkedIn') as string,
      portfolio: formData.get('portfolio') as string,
      coverLetter: formData.get('coverLetter') as string,
      resumeUrl: publicUrl,
      submittedAt: new Date().toISOString(),
    };

    console.log('Candidate submission received:', candidateData);

    try {
      const candidateRef = await db.collection('candidates').add({
        ...candidateData,
        resumePath: destinationPath, // Storage path used to delete the file later
        createdAt: new Date(),
        status: 'new', // new, reviewed, contacted, rejected, hired
      });
      console.log('Candidate saved to Firestore with ID:', candidateRef.id);
    } catch (firestoreError) {
      console.error('Error saving to Firestore:', firestoreError);
    }

    try {
      const csvBuffer = await updateMasterCsv(candidateData, publicUrl);
      console.log('Master CSV updated successfully');

      const fullName = candidateData.lastName 
        ? `${candidateData.firstName} ${candidateData.lastName}`
        : candidateData.firstName;
      
      await sendAdminNotification(csvBuffer, {
        name: fullName,
        email: candidateData.email,
        phone: candidateData.phone,
        role: candidateData.currentRole,
        resumeUrl: publicUrl,
      });
      console.log('Admin notification email sent');

      try {
        await sendCandidateConfirmation({
          name: fullName,
          email: candidateData.email,
          phone: candidateData.phone,
          location: candidateData.location,
          qualification: candidateData.qualification,
          currentRole: candidateData.currentRole,
          industry: candidateData.industry,
          experience: candidateData.experience,
          jobType: candidateData.jobType,
          currentSalary: candidateData.currentSalary,
          expectedSalary: candidateData.expectedSalary,
          linkedIn: candidateData.linkedIn,
          portfolio: candidateData.portfolio,
          coverLetter: candidateData.coverLetter,
        });
        console.log('Candidate confirmation email sent');
      } catch (err) {
        console.error('Failed to send candidate confirmation:', err);
      }

    } catch (csvOrEmailError) {
      console.error('Error in CSV/Email processing:', csvOrEmailError);
    }

    return {
      success: true,
      message: 'Application submitted successfully',
      resumeUrl: publicUrl,
    };
  } catch (error) {
    console.error('Error submitting candidate:', error);
    
    return {
      success: false,
      message: 'Failed to submit application',
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

// Alternative: Generate a signed URL instead of making file public
export async function uploadResumeWithSignedUrl(formData: FormData): Promise<SubmitCandidateResult> {
  try {
    const file = formData.get('resume') as File | null;

    if (!file) {
      return {
        success: false,
        message: 'No file provided',
        error: 'Please upload your resume',
      };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        message: 'Invalid file type',
        error: 'Please upload a PDF or Word document (.pdf, .doc, .docx)',
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: 'File too large',
        error: 'File size must be less than 5MB',
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const destinationPath = `resumes/${timestamp}-${sanitizedFilename}`;

    const fileRef = bucket.file(destinationPath);

    // Upload to Firebase Storage
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Generate a signed URL (valid for 7 days)
    const [signedUrl] = await fileRef.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      success: true,
      message: 'Resume uploaded successfully',
      resumeUrl: signedUrl,
    };
  } catch (error) {
    console.error('Error uploading resume:', error);
    
    return {
      success: false,
      message: 'Failed to upload resume',
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
