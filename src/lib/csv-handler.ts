import { bucket, db } from './firebase-admin';

// CSV file path in Firebase Storage
const MASTER_CSV_PATH = 'data/candidates_master.csv';

// CSV header row
const CSV_HEADER = 'Name,Email,Phone,Location,Qualification,Role,Industry,Experience,Job_Type,Current_Salary,Expected_Salary,LinkedIn,Portfolio,Cover_Letter,Resume_Link,Status,Submission_Date\n';

interface CandidateData {
  firstName: string;
  lastName?: string;
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
  resumeUrl?: string;
  submittedAt?: string;
  status?: string;
}

/**
 * Escapes a CSV field value to handle commas, quotes, and newlines
 */
function escapeCsvField(value: string): string {
  if (!value) return '';
  
  // If the value contains commas, quotes, or newlines, wrap in quotes and escape existing quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  
  return value;
}

/**
 * Formats candidate data into a CSV row
 */
function formatCsvRow(candidateData: CandidateData, resumeUrl: string): string {
  const fullName = candidateData.lastName 
    ? `${candidateData.firstName} ${candidateData.lastName}`
    : candidateData.firstName;
  const name = escapeCsvField(fullName);
  const email = escapeCsvField(candidateData.email);
  const phone = escapeCsvField(candidateData.phone);
  const location = escapeCsvField(candidateData.location);
  const qualification = escapeCsvField(candidateData.qualification);
  const role = escapeCsvField(candidateData.currentRole);
  const industry = escapeCsvField(candidateData.industry);
  const experience = escapeCsvField(candidateData.experience);
  const jobType = escapeCsvField(candidateData.jobType);
  const currentSalary = escapeCsvField(candidateData.currentSalary || '');
  const expectedSalary = escapeCsvField(candidateData.expectedSalary || '');
  const linkedIn = escapeCsvField(candidateData.linkedIn || '');
  const portfolio = escapeCsvField(candidateData.portfolio || '');
  const coverLetter = escapeCsvField(candidateData.coverLetter || '');
  const resumeLink = escapeCsvField(resumeUrl);
  const status = escapeCsvField(candidateData.status || 'new');
  const submissionDate = escapeCsvField(new Date().toISOString());

  return `${name},${email},${phone},${location},${qualification},${role},${industry},${experience},${jobType},${currentSalary},${expectedSalary},${linkedIn},${portfolio},${coverLetter},${resumeLink},${status},${submissionDate}`;
}

/**
 * Updates the master CSV file in Firebase Storage with new candidate data.
 * Creates the file with headers if it doesn't exist, or appends to existing file.
 * 
 * @param candidateData - The candidate's information
 * @param resumeUrl - The public URL to the uploaded resume
 * @returns Buffer containing the updated CSV content (for email attachment)
 */
export async function updateMasterCsv(
  candidateData: CandidateData,
  resumeUrl: string
): Promise<Buffer> {
  try {
    const file = bucket.file(MASTER_CSV_PATH);

    const [exists] = await file.exists();

    const newRow = formatCsvRow(candidateData, resumeUrl);

    let newCsvContent: string;

    if (!exists) {
      console.log('Creating new master CSV file...');
      newCsvContent = CSV_HEADER + newRow + '\n';
    } else {
      console.log('Appending to existing master CSV file...');
      
      const [fileContent] = await file.download();
      
      const existingContent = fileContent.toString('utf-8');
      
      if (existingContent.endsWith('\n')) {
        newCsvContent = existingContent + newRow + '\n';
      } else {
        newCsvContent = existingContent + '\n' + newRow + '\n';
      }
    }

    await file.save(newCsvContent, {
      metadata: {
        contentType: 'text/csv',
        metadata: {
          lastUpdated: new Date().toISOString(),
        },
      },
    });

    console.log('Master CSV updated successfully');

    return Buffer.from(newCsvContent, 'utf-8');
  } catch (error) {
    console.error('Error updating master CSV:', error);
    throw new Error(
      `Failed to update master CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Downloads the current master CSV file content
 * @returns Buffer containing the CSV content, or null if file doesn't exist
 */
export async function downloadMasterCsv(): Promise<Buffer | null> {
  try {
    const file = bucket.file(MASTER_CSV_PATH);
    const [exists] = await file.exists();

    if (!exists) {
      console.log('Master CSV file does not exist');
      return null;
    }

    const [fileContent] = await file.download();
    return fileContent;
  } catch (error) {
    console.error('Error downloading master CSV:', error);
    throw new Error(
      `Failed to download master CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Gets the count of candidates in the master CSV (excluding header)
 */
export async function getCandidateCount(): Promise<number> {
  try {
    const csvBuffer = await downloadMasterCsv();
    
    if (!csvBuffer) {
      return 0;
    }

    const content = csvBuffer.toString('utf-8');
    const lines = content.trim().split('\n');
    
    return Math.max(0, lines.length - 1);
  } catch (error) {
    console.error('Error getting candidate count:', error);
    return 0;
  }
}

/**
 * Regenerates the master CSV file from the current database state.
 * This should be called after deleting a candidate to keep CSV in sync.
 */
export async function regenerateMasterCsv(): Promise<void> {
  try {
    const snapshot = await db.collection('candidates')
      .orderBy('createdAt', 'asc')
      .get();

    let csvContent = CSV_HEADER;

    snapshot.forEach((doc) => {
      const data = doc.data();
      
      const candidateData: CandidateData = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        qualification: data.qualification || 'Not specified',
        currentRole: data.currentRole || '',
        industry: data.industry || '',
        experience: data.experience || '',
        jobType: data.jobType || '',
        currentSalary: data.currentSalary || '',
        expectedSalary: data.expectedSalary || '',
        linkedIn: data.linkedIn || '',
        portfolio: data.portfolio || '',
        coverLetter: data.coverLetter || '',
        resumeUrl: data.resumeUrl || '',
        status: data.status || 'new',
        submittedAt: data.submittedAt || '',
      };

      const row = formatCsvRowFromData(candidateData);
      csvContent += row + '\n';
    });

    const file = bucket.file(MASTER_CSV_PATH);
    await file.save(csvContent, {
      metadata: {
        contentType: 'text/csv',
        metadata: {
          lastUpdated: new Date().toISOString(),
          regeneratedFromDatabase: 'true',
        },
      },
    });

    console.log('Master CSV regenerated successfully from database');
  } catch (error) {
    console.error('Error regenerating master CSV:', error);
    throw new Error(
      `Failed to regenerate master CSV: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Formats candidate data from database into a CSV row
 */
function formatCsvRowFromData(data: CandidateData): string {
  const fullName = data.lastName 
    ? `${data.firstName} ${data.lastName}`
    : data.firstName;
  const name = escapeCsvField(fullName);
  const email = escapeCsvField(data.email);
  const phone = escapeCsvField(data.phone);
  const location = escapeCsvField(data.location);
  const qualification = escapeCsvField(data.qualification);
  const role = escapeCsvField(data.currentRole);
  const industry = escapeCsvField(data.industry);
  const experience = escapeCsvField(data.experience);
  const jobType = escapeCsvField(data.jobType);
  const currentSalary = escapeCsvField(data.currentSalary || '');
  const expectedSalary = escapeCsvField(data.expectedSalary || '');
  const linkedIn = escapeCsvField(data.linkedIn || '');
  const portfolio = escapeCsvField(data.portfolio || '');
  const coverLetter = escapeCsvField(data.coverLetter || '');
  const resumeLink = escapeCsvField(data.resumeUrl || '');
  const status = escapeCsvField(data.status || 'new');
  const submissionDate = escapeCsvField(data.submittedAt || '');

  return `${name},${email},${phone},${location},${qualification},${role},${industry},${experience},${jobType},${currentSalary},${expectedSalary},${linkedIn},${portfolio},${coverLetter},${resumeLink},${status},${submissionDate}`;
}
