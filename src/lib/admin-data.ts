'use server';

import { db, adminStorage } from '@/lib/firebase-admin';
import { regenerateMasterCsv } from '@/lib/csv-handler';

export interface CandidateRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  qualification: string;
  currentRole: string;
  industry: string;
  experience: string;
  jobType: string;
  currentSalary: string;
  expectedSalary: string;
  linkedIn: string;
  portfolio: string;
  resumeUrl: string;
  /** Firebase Storage path (e.g. "resumes/1234-file.pdf") used to delete the file */
  resumePath: string;
  status: 'new' | 'reviewed' | 'contacted' | 'rejected' | 'hired';
  createdAt: Date;
  submittedAt: string;
}

export interface DashboardStats {
  totalCandidates: number;
  newCandidates: number;
  reviewedCandidates: number;
  contactedCandidates: number;
  hiredCandidates: number;
  rejectedCandidates: number;
  todayCandidates: number;
  thisWeekCandidates: number;
  thisMonthCandidates: number;
  byIndustry: Record<string, number>;
  byExperience: Record<string, number>;
  byLocation: Record<string, number>;
  byQualification: Record<string, number>;
}

/**
 * Fetches all candidates from Firestore
 */
export async function getAllCandidates(): Promise<CandidateRecord[]> {
  try {
    const snapshot = await db.collection('candidates')
      .orderBy('createdAt', 'desc')
      .get();
    
    const candidates: CandidateRecord[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      candidates.push({
        id: doc.id,
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
        resumeUrl: data.resumeUrl || '',
        resumePath: data.resumePath || '',
        status: data.status || 'new',
        createdAt: data.createdAt?.toDate() || new Date(),
        submittedAt: data.submittedAt || '',
      });
    });
    
    return candidates;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return [];
  }
}

/**
 * Calculates dashboard statistics from candidate data
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const candidates = await getAllCandidates();
  
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const stats: DashboardStats = {
    totalCandidates: candidates.length,
    newCandidates: 0,
    reviewedCandidates: 0,
    contactedCandidates: 0,
    hiredCandidates: 0,
    rejectedCandidates: 0,
    todayCandidates: 0,
    thisWeekCandidates: 0,
    thisMonthCandidates: 0,
    byIndustry: {},
    byExperience: {},
    byLocation: {},
    byQualification: {},
  };
  
  candidates.forEach((candidate) => {
    switch (candidate.status) {
      case 'new': stats.newCandidates++; break;
      case 'reviewed': stats.reviewedCandidates++; break;
      case 'contacted': stats.contactedCandidates++; break;
      case 'hired': stats.hiredCandidates++; break;
      case 'rejected': stats.rejectedCandidates++; break;
    }
    
    const candidateDate = new Date(candidate.createdAt);
    if (candidateDate >= todayStart) stats.todayCandidates++;
    if (candidateDate >= weekStart) stats.thisWeekCandidates++;
    if (candidateDate >= monthStart) stats.thisMonthCandidates++;
    
    if (candidate.industry) {
      stats.byIndustry[candidate.industry] = (stats.byIndustry[candidate.industry] || 0) + 1;
    }
    
    if (candidate.experience) {
      stats.byExperience[candidate.experience] = (stats.byExperience[candidate.experience] || 0) + 1;
    }
    
    if (candidate.location) {
      const city = candidate.location.split(',')[0].trim();
      stats.byLocation[city] = (stats.byLocation[city] || 0) + 1;
    }
    
    if (candidate.qualification) {
      stats.byQualification[candidate.qualification] = (stats.byQualification[candidate.qualification] || 0) + 1;
    }
  });
  
  return stats;
}

/**
 * Updates candidate status
 */
export async function updateCandidateStatus(
  candidateId: string, 
  status: CandidateRecord['status']
): Promise<{ success: boolean; error?: string }> {
  try {
    await db.collection('candidates').doc(candidateId).update({
      status,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating candidate status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

/**
 * Deletes a candidate from Firestore AND their resume from Firebase Storage.
 * CSV regeneration failure does NOT roll back or mask a successful deletion.
 */
export async function deleteCandidate(
  candidateId: string
): Promise<{ success: boolean; error?: string }> {
  if (!candidateId || typeof candidateId !== 'string' || candidateId.trim() === '') {
    return { success: false, error: 'Invalid candidate ID' };
  }

  const docRef = db.collection('candidates').doc(candidateId.trim());

  const docSnap = await docRef.get().catch((err) => {
    throw new Error(`Firestore read failed: ${err?.message ?? err}`);
  });

  if (!docSnap.exists) {
    return { success: false, error: `Candidate ${candidateId} not found in Firestore` };
  }

  const resumePath: string | undefined = docSnap.data()?.resumePath;

  if (resumePath) {
    try {
      await adminStorage.file(resumePath).delete();
    } catch (storageError: any) {
      if (storageError?.code !== 404) {
        throw new Error(`Storage delete failed for "${resumePath}": ${storageError?.message ?? storageError}`);
      }
    }
  }

  await docRef.delete().catch((err) => {
    throw new Error(`Firestore delete failed: ${err?.message ?? err}`);
  });

  // Regenerate CSV independently - its failure must not hide a successful deletion
  try {
    await regenerateMasterCsv();
  } catch (csvError) {
    console.error('CSV regeneration failed after deletion (non-critical):', csvError);
  }

  return { success: true };
}
