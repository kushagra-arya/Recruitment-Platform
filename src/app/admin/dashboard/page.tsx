import { redirect } from 'next/navigation';
import { isAdminAuthenticated, logoutAdmin, getAdminEmail } from '@/lib/admin-auth';
import { getAllCandidates, getDashboardStats } from '@/lib/admin-data';
import AdminDashboardClient from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const isAuthenticated = await isAdminAuthenticated();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
  
  const [candidates, stats, adminEmail] = await Promise.all([
    getAllCandidates(),
    getDashboardStats(),
    getAdminEmail(),
  ]);
  
  return (
    <AdminDashboardClient 
      candidates={candidates} 
      stats={stats} 
      adminEmail={adminEmail || 'Admin'}
      logoutAction={logoutAdmin}
    />
  );
}
