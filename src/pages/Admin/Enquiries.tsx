import React, { useEffect, useState } from 'react';
import { enquiryService } from '@/services/admin/enquiryService';
import { useToast } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import Badge from '@/components/admin/Badge';
import Modal from '@/components/admin/Modal';
import Pagination from '@/components/admin/Pagination';
import Skeleton from '@/components/admin/Skeleton';
import { MessageSquare, Search, Eye, Trash2, Loader2, Phone, Mail, Building, Clock } from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const { isDark } = useTheme();

  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [statusInput, setStatusInput] = useState('NEW');
  const [notesInput, setNotesInput] = useState('');
  const [updating, setUpdating] = useState(false);

  const toast = useToast();

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await enquiryService.getEnquiries({ page, limit: 10, search, status: statusFilter });
      if (res.success) {
        setEnquiries(res.data);
        setPagination(res.pagination);
      }
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    const handleStoreChange = () => fetchEnquiries();
    window.addEventListener('vtest_store_change', handleStoreChange);
    return () => window.removeEventListener('vtest_store_change', handleStoreChange);
  }, [page, search, statusFilter]);

  const handleOpenDetails = (enq: any) => {
    setSelectedEnquiry(enq);
    setStatusInput(enq.status || 'NEW');
    setNotesInput(enq.internalNotes || '');
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    try {
      setUpdating(true);
      await enquiryService.updateEnquiry(selectedEnquiry._id || selectedEnquiry.id, {
        status: statusInput,
        internalNotes: notesInput,
      });
      toast.success('Enquiry updated successfully!');
      setSelectedEnquiry(null);
      fetchEnquiries();
    } catch {
      toast.error('Failed to update enquiry status');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this inquiry?')) {
      try {
        await enquiryService.deleteEnquiry(id);
        toast.success('Inquiry deleted');
        fetchEnquiries();
      } catch {
        toast.error('Failed to delete enquiry');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black tracking-tight">Customer Enquiries & RFP Leads</h1>
        <p className="text-xs text-[var(--admin-muted)] mt-1">
          Review demo requests, pricing proposals, and direct messages sent from the public website.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row gap-3 ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[var(--admin-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by prospect name, organization, or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-1 focus:ring-[#2ECC71] ${
              isDark
                ? 'bg-[#0A0F0C] border-[#1E3325] text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={`px-3 py-2 rounded-xl text-xs border focus:outline-none ${
            isDark
              ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-copy)]'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <option value="">All Statuses</option>
          <option value="NEW">New Submissions</option>
          <option value="IN_REVIEW">In Review</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed / Completed</option>
        </select>
      </div>

      {/* Enquiries Table Card */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDark ? 'bg-[#0F1812] border-[#1E3325]' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead
              className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                isDark
                  ? 'bg-[#0A0F0C] border-[#1E3325] text-[var(--admin-muted)]'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <tr>
                <th className="py-3.5 px-4 font-bold">Contact / Organization</th>
                <th className="py-3.5 px-4 font-bold">Inquiry Type</th>
                <th className="py-3.5 px-4 font-bold">Message Excerpt</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold">Submitted</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E3325]/40">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="p-4">
                      <Skeleton className="h-10 w-full" />
                    </td>
                  </tr>
                ))
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--admin-muted)]">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-500 opacity-60" />
                    No enquiries found
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => {
                  const id = enq._id || enq.id;
                  const name = enq.fullName || enq.name || 'Anonymous';
                  const dateStr = enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'Recent';

                  return (
                    <tr
                      key={id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-sm">{name}</p>
                        <p className="text-[11px] text-[var(--admin-muted)] font-mono mt-0.5">
                          {enq.company || enq.email}
                        </p>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge status={enq.enquiryType || 'DEMO'}>{enq.enquiryType || 'DEMO'}</Badge>
                      </td>

                      <td className="py-3.5 px-4 text-[var(--admin-copy)] max-w-xs truncate">
                        {enq.message || 'No message provided'}
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge status={enq.status}>{enq.status}</Badge>
                      </td>

                      <td className="py-3.5 px-4 text-[var(--admin-muted)] font-mono text-[11px]">
                        {dateStr}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenDetails(enq)}
                            title="Inspect & Process"
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-[#2ECC71] cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            title="Delete"
                            className="p-1.5 rounded-lg text-[var(--admin-muted)] hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {pagination && (
          <Pagination
            currentPage={pagination.currentPage || page}
            totalPages={pagination.totalPages || 1}
            onPageChange={setPage}
            hasPrev={pagination.hasPrevPage}
            hasNext={pagination.hasNextPage}
          />
        )}
      </div>

      {/* Enquiry Detail & Action Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={Boolean(selectedEnquiry)}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry: ${selectedEnquiry.fullName || selectedEnquiry.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#0A0F0C] border border-[#1E3325] rounded-xl text-xs">
              <div className="flex items-center gap-2 text-[var(--admin-copy)]">
                <Mail className="w-4 h-4 text-[#2ECC71]" />
                <span className="font-mono">{selectedEnquiry.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--admin-copy)]">
                <Phone className="w-4 h-4 text-[#2ECC71]" />
                <span className="font-mono">{selectedEnquiry.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--admin-copy)]">
                <Building className="w-4 h-4 text-[#2ECC71]" />
                <span>{selectedEnquiry.company || 'Private Entity'}</span>
              </div>
              <div className="flex items-center gap-2 text-[var(--admin-copy)]">
                <Clock className="w-4 h-4 text-[#2ECC71]" />
                <span>{new Date(selectedEnquiry.createdAt || Date.now()).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--admin-muted)] mb-1.5">
                Client Request Message
              </h4>
              <div className="p-4 bg-[#0A0F0C] border border-[#1E3325] rounded-xl text-xs text-[var(--admin-copy)] leading-relaxed whitespace-pre-line">
                {selectedEnquiry.message || 'No additional text specified.'}
              </div>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 pt-3 border-t border-[#1E3325]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                  Update Lead Status
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="NEW">NEW - Unprocessed</option>
                  <option value="IN_REVIEW">IN_REVIEW - Engineering review</option>
                  <option value="CONTACTED">CONTACTED - Reached out to prospect</option>
                  <option value="CLOSED">CLOSED - Completed / Contracted</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--admin-copy)] mb-1.5">
                  Internal Engineering & Commercial Notes
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Record commercial progress, assigned engineer, quote reference #..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none ${
                    isDark
                      ? 'bg-[#0A0F0C] border-[#1E3325] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 bg-[var(--admin-surface)] border border-[var(--admin-border)] text-[var(--admin-heading)] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 bg-[#2ECC71] hover:bg-[#27ae60] text-[#050A07] rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Lead Status'}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminEnquiries;
