import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, LogOut, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-30 bg-white/75 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <CheckSquare className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
              Tugas<span className="text-indigo-600">RPL</span>
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                isAdmin
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200/60'
                  : 'bg-violet-50 text-violet-700 border-violet-200/60'
              }`}
            >
              {isAdmin ? (
                <ShieldCheck className="w-3 h-3 text-indigo-600" />
              ) : (
                <GraduationCap className="w-3 h-3 text-violet-600" />
              )}
              {isAdmin ? 'ADMIN' : 'SISWA'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-xs text-slate-400 font-mono">@{user?.username}</p>
          </div>

          <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100/80 hover:bg-red-50 rounded-lg transition-all duration-150 border border-slate-200/70 hover:border-red-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
