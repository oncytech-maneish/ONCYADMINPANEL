import { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans antialiased text-oncy-navy">
       {/* Background Decoration */}
       <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-oncy-light/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-oncy-blue/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-oncy-navy rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 border-2 border-oncy-light rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">ONCY<span className="text-oncy-mid font-medium">TECH</span></span>
           </div>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] animate-in fade-in zoom-in-95 duration-500">
           {!isSubmitted ? (
             <div className="space-y-6">
                <div className="text-center">
                   <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recovery Mode</h2>
                   <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Forgot your password?</p>
                </div>

                <p className="text-sm text-slate-500 text-center leading-relaxed">
                  Enter your verified administrator email address below. We'll send security instructions to reset your account credentials.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                   <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-oncy-mid transition-colors" />
                      <input 
                        type="email" 
                        required
                        placeholder="admin@oncytech.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-oncy-light/10 focus:border-oncy-mid transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                   </div>

                   <button className="w-full group relative overflow-hidden rounded-xl bg-oncy-gradient p-px font-bold text-white transition-all transform active:scale-[0.98] focus:outline-none shadow-lg shadow-oncy-blue/20">
                      <div className="bg-transparent px-4 py-3.5 flex items-center justify-center gap-2">
                         <span className="tracking-widest uppercase text-xs font-black">Send Instructions</span>
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                   </button>
                </form>

                <Link to="/login" className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-oncy-mid transition-all group">
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Authorization
                </Link>
             </div>
           ) : (
             <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm shadow-emerald-500/10">
                   <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Instructions Sent</h2>
                   <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest italic">Check your inbox: {email}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                   If an administrator account exists for this handle, you will receive reset instructions momentarily.
                </p>
                <div className="pt-4">
                  <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-oncy-navy text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-slate-800 transition-all transform active:scale-95">
                    Return to Login
                  </Link>
                </div>
             </div>
           )}
        </div>

        <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase flex items-center justify-center gap-2 px-10">
              <ShieldCheck className="w-3.5 h-3.5 text-oncy-mid" />
              Encrypted Recovery Channel
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
