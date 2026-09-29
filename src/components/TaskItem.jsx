import { useTasks } from '../context/TaskContext';
import { Calendar, BookOpen, Pencil, Trash2, Check, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function TaskItem({ task, readOnly, onEdit }) {
  const { toggleStatus, deleteTask } = useTasks();

  const isOverdue = !task.selesai && new Date(task.deadline) < new Date(new Date().setHours(0, 0, 0, 0));
  const isToday =
    !task.selesai &&
    new Date(task.deadline).toDateString() === new Date().toDateString();

  const formattedDate = new Date(task.deadline).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 p-5 ${
        task.selesai
          ? 'border-emerald-200/80 bg-emerald-50/20'
          : isOverdue
          ? 'border-rose-200 bg-rose-50/20'
          : isToday
          ? 'border-amber-200 bg-amber-50/20'
          : 'border-slate-200/80 hover:border-indigo-300 hover:shadow-lg hover:shadow-slate-100'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => toggleStatus(task.id)}
          aria-label={task.selesai ? 'Tandai belum selesai' : 'Tandai selesai'}
          className={`mt-1 shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
            task.selesai
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm shadow-emerald-600/30'
              : 'border-slate-300 bg-white hover:border-indigo-500 text-transparent'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3
              className={`text-base font-bold transition-all ${
                task.selesai
                  ? 'text-slate-400 line-through decoration-slate-300'
                  : 'text-slate-800'
              }`}
            >
              {task.judul}
            </h3>

            {/* Status Pill Badge */}
            {task.selesai ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Selesai
              </span>
            ) : isOverdue ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-100/80 text-rose-800 border border-rose-200">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                Terlambat
              </span>
            ) : isToday ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-600" />
                Hari Ini
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Clock className="w-3 h-3 text-indigo-600" />
                Dalam Proses
              </span>
            )}
          </div>

          {task.deskripsi && (
            <p
              className={`text-xs leading-relaxed mb-3 ${
                task.selesai ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {task.deskripsi}
            </p>
          )}

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {task.mataPelajaran && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                {task.mataPelajaran}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium ${
                isOverdue
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Tenggat: {formattedDate}
            </span>
          </div>
        </div>

        {/* Action buttons (Admin only) */}
        {!readOnly && (
          <div className="shrink-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onEdit(task)}
              aria-label="Edit Tugas"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              aria-label="Hapus Tugas"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
