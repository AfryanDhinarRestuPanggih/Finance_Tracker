import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="glass w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                        Finance Tracker
                    </h1>
                    <p className="text-slate-400 mt-2">Buat akun baru Anda</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full bg-slate-800/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-slate-800/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-slate-800/50 border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register'}
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-primary hover:underline">
                        Login sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
