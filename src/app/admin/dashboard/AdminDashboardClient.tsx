'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CandidateRecord, DashboardStats, updateCandidateStatus, deleteCandidate } from '@/lib/admin-data';

interface AdminDashboardClientProps {
  candidates: CandidateRecord[];
  stats: DashboardStats;
  adminEmail: string;
  logoutAction: () => Promise<void>;
}

export default function AdminDashboardClient({ 
  candidates: initialCandidates, 
  stats, 
  adminEmail,
  logoutAction 
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateRecord | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push('/admin/login');
  };

  const handleStatusChange = async (candidateId: string, newStatus: CandidateRecord['status']) => {
    const result = await updateCandidateStatus(candidateId, newStatus);
    if (result.success) {
      setCandidates(prev => 
        prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
      );
    }
  };

  const handleDelete = async (candidateId: string) => {
    if (!candidateId) return;

    try {
      const result = await deleteCandidate(candidateId);
      if (result.success) {
        setCandidates(prev => prev.filter(c => c.id !== candidateId));
        setSelectedCandidate(null);
        setCandidateToDelete(null);
      } else {
        alert(`Delete failed: ${result.error ?? 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Unexpected delete error:', error);
      alert('An unexpected error occurred while deleting. Please try again.');
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.currentRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    reviewed: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-purple-100 text-purple-700',
    hired: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Shree Shyam Talent Solutions"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <div>
                <h1 className="text-lg font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-xs text-slate-500">Shree Shyam Talent Solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{adminEmail}</span>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {(['overview', 'candidates', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Candidates"
                value={stats.totalCandidates}
                icon={<UsersIcon />}
                color="blue"
              />
              <StatCard
                title="Today"
                value={stats.todayCandidates}
                subtitle={`${stats.thisWeekCandidates} this week`}
                icon={<CalendarIcon />}
                color="green"
              />
              <StatCard
                title="New Applications"
                value={stats.newCandidates}
                subtitle="Pending review"
                icon={<InboxIcon />}
                color="amber"
              />
              <StatCard
                title="Hired"
                value={stats.hiredCandidates}
                subtitle={`${stats.contactedCandidates} in contact`}
                icon={<CheckIcon />}
                color="emerald"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Status</h3>
                <div className="space-y-3">
                  <StatusBar label="New" count={stats.newCandidates} total={stats.totalCandidates} color="bg-blue-500" />
                  <StatusBar label="Reviewed" count={stats.reviewedCandidates} total={stats.totalCandidates} color="bg-yellow-500" />
                  <StatusBar label="Contacted" count={stats.contactedCandidates} total={stats.totalCandidates} color="bg-purple-500" />
                  <StatusBar label="Hired" count={stats.hiredCandidates} total={stats.totalCandidates} color="bg-green-500" />
                  <StatusBar label="Rejected" count={stats.rejectedCandidates} total={stats.totalCandidates} color="bg-red-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Industries</h3>
                <div className="space-y-3">
                  {Object.entries(stats.byIndustry)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([industry, count]) => (
                      <StatusBar 
                        key={industry} 
                        label={industry} 
                        count={count} 
                        total={stats.totalCandidates} 
                        color="bg-amber-500" 
                      />
                    ))}
                  {Object.keys(stats.byIndustry).length === 0 && (
                    <p className="text-slate-500 text-sm">No data available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Recent Applications</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {candidates.slice(0, 5).map((candidate) => (
                  <div key={candidate.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-semibold">
                          {candidate.firstName[0]}{candidate.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{candidate.firstName} {candidate.lastName}</p>
                          <p className="text-sm text-slate-500">{candidate.currentRole} • {candidate.industry}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[candidate.status]}`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                ))}
                {candidates.length === 0 && (
                  <p className="p-6 text-slate-500 text-center">No candidates yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Experience</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-sm">
                              {candidate.firstName[0]}{candidate.lastName[0]}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{candidate.firstName} {candidate.lastName}</p>
                              <p className="text-xs text-slate-500">{candidate.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{candidate.email}</p>
                          <p className="text-xs text-slate-500">{candidate.phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-900">{candidate.currentRole}</p>
                          <p className="text-xs text-slate-500">{candidate.industry}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{candidate.experience}</p>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={candidate.status}
                            onChange={(e) => handleStatusChange(candidate.id, e.target.value as CandidateRecord['status'])}
                            className={`px-2 py-1 rounded text-xs font-medium border-0 ${statusColors[candidate.status]}`}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="hired">Hired</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedCandidate(candidate)}
                              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                            >
                              View
                            </button>
                            <a
                              href={candidate.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Resume
                            </a>
                            <button
                              onClick={() => setCandidateToDelete(candidate.id)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCandidates.length === 0 && (
                  <p className="p-8 text-slate-500 text-center">No candidates found</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Experience Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(stats.byExperience)
                    .sort(([, a], [, b]) => b - a)
                    .map(([level, count]) => (
                      <StatusBar 
                        key={level} 
                        label={level} 
                        count={count} 
                        total={stats.totalCandidates} 
                        color="bg-blue-500" 
                      />
                    ))}
                  {Object.keys(stats.byExperience).length === 0 && (
                    <p className="text-slate-500 text-sm">No data available</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Qualification Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(stats.byQualification)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([qual, count]) => (
                      <StatusBar 
                        key={qual} 
                        label={qual} 
                        count={count} 
                        total={stats.totalCandidates} 
                        color="bg-purple-500" 
                      />
                    ))}
                  {Object.keys(stats.byQualification).length === 0 && (
                    <p className="text-slate-500 text-sm">No data available</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Location Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(stats.byLocation)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 6)
                    .map(([location, count]) => (
                      <StatusBar 
                        key={location} 
                        label={location} 
                        count={count} 
                        total={stats.totalCandidates} 
                        color="bg-green-500" 
                      />
                    ))}
                  {Object.keys(stats.byLocation).length === 0 && (
                    <p className="text-slate-500 text-sm">No data available</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Industry Distribution</h3>
                <div className="space-y-3">
                  {Object.entries(stats.byIndustry)
                    .sort(([, a], [, b]) => b - a)
                    .map(([industry, count]) => (
                      <StatusBar 
                        key={industry} 
                        label={industry} 
                        count={count} 
                        total={stats.totalCandidates} 
                        color="bg-amber-500" 
                      />
                    ))}
                  {Object.keys(stats.byIndustry).length === 0 && (
                    <p className="text-slate-500 text-sm">No data available</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Summary Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-slate-900">{stats.totalCandidates}</p>
                  <p className="text-sm text-slate-500 mt-1">Total Candidates</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{stats.todayCandidates}</p>
                  <p className="text-sm text-slate-500 mt-1">Today</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">{stats.thisWeekCandidates}</p>
                  <p className="text-sm text-slate-500 mt-1">This Week</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-amber-600">{stats.thisMonthCandidates}</p>
                  <p className="text-sm text-slate-500 mt-1">This Month</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Candidate Details</h3>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Name</p>
                    <p className="text-slate-900">{selectedCandidate.firstName} {selectedCandidate.lastName}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Email</p>
                    <p className="text-slate-900">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Phone</p>
                    <p className="text-slate-900">{selectedCandidate.phone}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Location</p>
                    <p className="text-slate-900">{selectedCandidate.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">Professional Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Qualification</p>
                    <p className="text-slate-900">{selectedCandidate.qualification || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Current Role</p>
                    <p className="text-slate-900">{selectedCandidate.currentRole}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Industry</p>
                    <p className="text-slate-900">{selectedCandidate.industry}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Experience</p>
                    <p className="text-slate-900">{selectedCandidate.experience}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Job Type</p>
                    <p className="text-slate-900">{selectedCandidate.jobType}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Current Salary</p>
                    <p className="text-slate-900">{selectedCandidate.currentSalary || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Expected Salary</p>
                    <p className="text-slate-900">{selectedCandidate.expectedSalary || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">Links</h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                  >
                    View Resume
                  </a>
                  {selectedCandidate.linkedIn && (
                    <a
                      href={selectedCandidate.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                  {selectedCandidate.portfolio && (
                    <a
                      href={selectedCandidate.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-500 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">Status</h4>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedCandidate.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as CandidateRecord['status'];
                      handleStatusChange(selectedCandidate.id, newStatus);
                      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
                    }}
                    className="px-4 py-2 rounded-lg border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <p className="text-sm text-slate-500">
                    Applied: {new Date(selectedCandidate.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {candidateToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                  <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                Delete Candidate?
              </h3>
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete this candidate? This action cannot be undone and all associated data will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setCandidateToDelete(null)}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(candidateToDelete)}
                  className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color 
}: { 
  title: string; 
  value: number; 
  subtitle?: string; 
  icon: React.ReactNode; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ 
  label, 
  count, 
  total, 
  color 
}: { 
  label: string; 
  count: number; 
  total: number; 
  color: string;
}) {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-900 font-medium">{count}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Icons
function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
