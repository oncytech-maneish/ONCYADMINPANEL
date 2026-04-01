import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginStatus('loading');
    setErrorMessage('');

    // Simulate API Auth Flow
    setTimeout(() => {
      if (email === 'error@oncytech.com') {
        setIsLoading(false);    
        setLoginStatus('error');
        setErrorMessage('Incorrect email or password. Please try again.');
        return;
      }

      setIsLoading(false);
      setLoginStatus('success');
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 md:py-20 font-sans antialiased text-oncy-navy transition-all duration-500">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-oncy-light/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-oncy-blue/5 blur-[100px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] relative z-10 flex flex-col items-center">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-oncy-navy rounded-lg flex items-center justify-center shadow-lg shadow-oncy-navy/20">
              <div className="w-6 h-6 border-2 border-oncy-light rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-oncy-navy uppercase">ONCY<span className="text-oncy-mid font-medium">TECH</span></span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">Admin Portal</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        {/* Login Form Card */}
        <div className="w-full bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-8 md:p-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Sign In</h2>
            <p className="text-sm text-slate-500 mt-1">Please enter your specialized credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {loginStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-xs font-semibold text-red-600 leading-tight">{errorMessage}</p>
              </div>
            )}

            {/* Success Message */}
            {loginStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-xs font-semibold text-emerald-600 leading-tight">Authentication successful! Redirecting...</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="text-[12px] font-bold text-slate-700 ml-1 flex items-center gap-1"
              >
                Work Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-oncy-mid transition-colors" />
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="admin@oncytech.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-oncy-light/10 focus:border-oncy-mid transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label 
                  htmlFor="password" 
                  className="text-[12px] font-bold text-slate-700"
                >
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-oncy-mid hover:text-oncy-blue transition-colors uppercase tracking-wider">
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-oncy-mid transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-oncy-light/10 focus:border-oncy-mid transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer select-none group w-fit">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white checked:bg-oncy-gradient hover:border-oncy-mid transition-all"
                />
                <div className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 14.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">Remember my session</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loginStatus === 'success'}
              className="w-full group relative overflow-hidden rounded-xl bg-oncy-gradient p-px font-bold text-white transition-all transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-oncy-light/30 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-oncy-blue/20"
            >
              <div className="bg-transparent px-4 py-3.5 flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="tracking-wide text-sm uppercase">Confirm Credentials</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Footer info (outside card for cleaner alignment) */}
        <div className="mt-8 text-center space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Access to this system is restricted to authorized OncyTech personnel only. 
            All activity is monitored and logged for security purposes.
          </p>
          <div className="flex items-center justify-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-oncy-mid transition-colors underline decoration-slate-200 decoration-2 underline-offset-4">Security Policy</a>
            <a href="#" className="hover:text-oncy-mid transition-colors underline decoration-slate-200 decoration-2 underline-offset-4">Legal Notice</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;