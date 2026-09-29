import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  ListTodo,
  Sparkles
} from 'lucide-react';

export default function SiswaDashboard() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const selesai = tasks.filter(t => t.selesai).length;
  const pending = tasks.filter(t => !t.selesai).length;
  const overdue = tasks.filter(
    t =>
      !t.selesai &&
      new Date(t.deadline) < new Date(new Date().setHours(0, 0, 0, 0))
  ).length;

  const percentage = total > 0 ? Math.round((selesai / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tugas & Praktikum Saya
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau progres penyelesaian tugas dan tandai tugas yang telah kamu selesaikan
          </p>
        </div>

        {/* Progress Banner */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-950/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 backdrop-blur-sm mb-2">
                <Sparkles className="w-3 h-3 text-indigo-300" />
                Kemajuan Belajar
              </span>
              <h2 className="text-xl font-bold">
                {selesai} dari {total} Tugas Telah Selesai
              </h2>
            </div>
            <div className="text-3xl font-extrabold text-indigo-300">
              {percentage}%
            </div>
          </div>

          {/* Progress bar track */}
          <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Total Tugas
              </p>
              <p className="text-3xl font-extrabold text-slate-900">{total}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                Selesai
              </p>
              <p className="text-3xl font-extrabold text-emerald-600">{selesai}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                Belum Selesai
              </p>
              <p className="text-3xl font-extrabold text-amber-600">{pending}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
                Terlambat
              </p>
              <p className="text-3xl font-extrabold text-rose-600">{overdue}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>
        </div>

        {/* Notice for Students */}
        <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-start gap-3 text-indigo-900">
          <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed text-indigo-800">
            <strong>Catatan:</strong> Klik kotak centang di samping judul tugas untuk menandai progres tugasmu. Penambahan atau perubahan rincian tugas hanya dapat dilakukan oleh Admin RPL.
          </p>
        </div>

        {/* Task List Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-6">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Daftar Tugas Praktikum</h2>
          </div>

          <TaskList readOnly={true} />
        </div>
      </main>
    </div>
  );
}
