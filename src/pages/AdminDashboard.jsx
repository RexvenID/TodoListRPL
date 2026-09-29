import { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  ListTodo
} from 'lucide-react';

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks } = useTasks();

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    selesai: tasks.filter(t => t.selesai).length,
    pending: tasks.filter(t => !t.selesai).length,
    overdue: tasks.filter(
      t =>
        !t.selesai &&
        new Date(t.deadline) < new Date(new Date().setHours(0, 0, 0, 0))
    ).length
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header section with CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dashboard Administrator
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Kelola penugasan, tenggat waktu, dan pantau status pengerjaan siswa
            </p>
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Tugas</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Total Tugas
              </p>
              <p className="text-3xl font-extrabold text-slate-900">{stats.total}</p>
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
              <p className="text-3xl font-extrabold text-emerald-600">{stats.selesai}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                Dalam Proses
              </p>
              <p className="text-3xl font-extrabold text-amber-600">{stats.pending}</p>
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
              <p className="text-3xl font-extrabold text-rose-600">{stats.overdue}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 stroke-[1.75]" />
            </div>
          </div>
        </div>

        {/* Task Management Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-6">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Daftar Penugasan RPL</h2>
          </div>

          <TaskList readOnly={false} onEdit={handleEdit} />
        </div>
      </main>

      {/* Modal Form */}
      {showForm && (
        <TaskForm task={editingTask} onClose={handleCloseForm} />
      )}
    </div>
  );
}
