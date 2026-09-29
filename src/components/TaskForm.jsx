import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { X, Calendar, BookOpen, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function TaskForm({ task, onClose }) {
  const { addTask, updateTask } = useTasks();
  const [formData, setFormData] = useState(
    task || {
      judul: '',
      deskripsi: '',
      deadline: '',
      mataPelajaran: 'Pemrograman Web'
    }
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      setError('Judul tugas wajib diisi!');
      return;
    }
    if (!formData.deadline) {
      setError('Tanggal tenggat wajib dipilih!');
      return;
    }

    if (task?.id) {
      updateTask(task.id, formData);
    } else {
      addTask(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transition-all">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              {task ? 'Ubah Rincian Tugas' : 'Tambah Tugas Baru'}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              {task ? 'Perbarui informasi tugas yang sudah ada' : 'Lengkapi data untuk menugaskan siswa'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Judul Tugas <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                placeholder="Contoh: Membuat ERD Perpustakaan"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Deskripsi Singkat
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Instruksi pengerjaan, ketentuan file atau format..."
              rows="3"
              className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mata Pelajaran
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  name="mataPelajaran"
                  value={formData.mataPelajaran}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                >
                  <option value="Pemrograman Web">Konst RPL Web</option>
                  <option value="Basis Data">Konst RPL Basis Data</option>
                  <option value="Desain Grapis">Konst RPL Desain Grapis</option>
                  <option value="Mobile Programming">Konst RPL Mobile Dev</option>
                  <option value="Rekayasa Perangkat Lunak">Mapil (IoT)</option>
                  <option value="Mata Pelajaran Umum">Mata Pelajaran Umum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tenggat Waktu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{task ? 'Simpan Perubahan' : 'Buat Tugas'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
