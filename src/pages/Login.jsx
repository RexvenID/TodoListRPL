import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, User, Lock, ArrowRight, ShieldCheck, GraduationCap, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError('Harap isi username dan password');
      return;
    }

    setLoading(true);
    const result = login(username, password);

    setTimeout(() => {
      if (result.success) {
        navigate(`/${result.user.role}`);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 350);
  };

  const handleQuickLogin = (uname, pass) => {
    setUsername(uname);
    setPassword(pass);
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(uname, pass);
      if (result.success) {
        navigate(`/${result.user.role}`);
      }
      setLoading(false);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 shadow-xl shadow-indigo-500/25 mb-4 text-white">
            <CheckSquare className="w-7 h-7 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Tugas<span className="text-indigo-600">RPL</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1.5 font-normal">
            Platform pengingat tugas Rekayasa Perangkat Lunak
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/50 p-7 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Masuk ke Akun</h2>
            <p className="text-xs text-slate-500 mt-0.5">Pilih akun demo atau ketik username & sandi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl text-red-600 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin atau siswa"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-2"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <span className="block text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Akses Cepat (Demo)
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin', 'admin123')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-100/70 text-indigo-700 text-xs font-semibold transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Masuk Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('siswa', 'siswa123')}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-violet-100 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-semibold transition"
              >
                <GraduationCap className="w-3.5 h-3.5 text-violet-600" />
                <span>Masuk Siswa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-slate-400">
          TugasRPL • Sistem Informasi Tugas Praktikum
        </p>
      </div>
    </div>
  );
}
