import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ClipboardList, CheckCircle2, Clock, Search, Sparkles } from 'lucide-react';

export default function TaskList({ readOnly, onEdit }) {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'pending'
        ? !task.selesai
        : task.selesai;

    const matchesSearch =
      task.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.mataPelajaran &&
        task.mataPelajaran.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.deskripsi &&
        task.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const pendingCount = tasks.filter((t) => !t.selesai).length;
  const completedCount = tasks.filter((t) => t.selesai).length;

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'pending'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Belum Selesai ({pendingCount})</span>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'completed'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Selesai ({completedCount})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tugas atau mapel..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
          />
        </div>
      </div>

      {/* Task Items Grid */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <ClipboardList className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Tidak ada tugas ditemukan
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {searchQuery
              ? `Tidak ada hasil untuk kata kunci "${searchQuery}"`
              : filter === 'completed'
              ? 'Belum ada tugas yang diselesaikan'
              : 'Semua tugas telah diselesaikan atau belum ada tugas yang ditambahkan.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              readOnly={readOnly}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
