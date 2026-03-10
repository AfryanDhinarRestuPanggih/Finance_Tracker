import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    TrendingUp,
    ShieldCheck,
    BarChart3,
    PieChart,
    ArrowRight,
    Wallet,
    CheckCircle2,
    FileDown
} from 'lucide-react';

const Landing = () => {
    const { user } = useAuth();

    const features = [
        {
            icon: BarChart3,
            title: "Dashboard Real-time",
            desc: "Pantau saldo, pemasukan, dan pengeluaran Anda dalam satu tampilan dashboard yang modern."
        },
        {
            icon: PieChart,
            title: "Analisis Kategori",
            desc: "Lihat ke mana uang Anda pergi dengan grafik pengeluaran berdasarkan kategori yang interaktif."
        },
        {
            icon: FileDown,
            title: "Laporan Professional",
            desc: "Export data keuangan Anda ke format PDF atau Excel kapan pun Anda membutuhkannya."
        },
        {
            icon: Wallet,
            title: "Pencatatan Mudah",
            desc: "Catat setiap transaksi hanya dalam hitungan detik dengan antarmuka yang intuitif."
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-border px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Wallet className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                            FinTrack
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link
                                to="/"
                                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-semibold transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="text-slate-400 hover:text-white font-medium">Masuk</Link>
                                <Link
                                    to="/register"
                                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20"
                                >
                                    Daftar Gratis
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-border px-4 py-2 rounded-full text-primary text-sm font-semibold">
                        <TrendingUp size={16} />
                        Aplikasi Pengelola Keuangan #1 untuk Kamu
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        Kendalikan <span className="text-primary italic">Finansialmu</span> <br />
                        Tanpa Kompromi
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Ubah cara Anda mencatat keuangan. FinTrack membantu Anda memantau setiap rupiah yang masuk dan keluar dengan analisis yang cerdas dan laporan yang instan.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            to={user ? "/" : "/register"}
                            className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
                        >
                            {user ? 'Ke Dashboard' : 'Mulai Sekarang — Gratis'}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#features" className="w-full md:w-auto text-slate-400 hover:text-white px-10 py-4 font-semibold">
                            Pelajari Fitur
                        </a>
                    </div>

                    <div className="pt-20 opacity-40 hover:opacity-60 transition-opacity">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale">
                            <span className="text-2xl font-bold">EXCEL READY</span>
                            <span className="text-2xl font-bold">PDF EXPORT</span>
                            <span className="text-2xl font-bold">SECURE JWT</span>
                            <span className="text-2xl font-bold">CHART JS</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">Semua yang Anda Butuhkan</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Dirancang untuk memudahkan hidup Anda dalam mencatat setiap aktivitas finansial.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="glass p-8 rounded-3xl border border-border group hover:border-primary/50 transition-all hover:-translate-y-2">
                                <div className="bg-primary/10 text-primary p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl font-bold leading-tight">Membantu Anda <br /> Menabung Lebih Cerdas</h2>
                        <ul className="space-y-4">
                            {[
                                "Visualisasi pengeluaran yang jujur",
                                "Keamanan data level tinggi",
                                "Analisis per kategori yang mendalam",
                                "UI/UX yang sangat memanjakan mata"
                            ].map((text, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-300">
                                    <CheckCircle2 className="text-primary" size={20} />
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <div className="bg-primary/20 border border-primary/30 p-6 rounded-2xl">
                            <p className="italic text-slate-200">"Pencatatan keuangan jadi tidak membosankan lagi. Desainnya sangat premium!"</p>
                            <p className="mt-4 font-bold text-sm">— Rating Pengguna Kami</p>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="aspect-square bg-blue-500/10 rounded-full blur-[100px] absolute inset-0" />
                        <div className="glass p-8 rounded-3xl relative z-10 space-y-6">
                            <div className="h-4 bg-slate-700 w-3/4 rounded-full animate-pulse" />
                            <div className="h-4 bg-slate-700 w-1/2 rounded-full animate-pulse" />
                            <div className="h-32 bg-primary/20 rounded-2xl border border-primary/20" />
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-10 bg-slate-800 rounded-xl" />
                                <div className="h-10 bg-slate-800 rounded-xl" />
                                <div className="h-10 bg-slate-800 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <footer className="py-24 px-6 text-center border-t border-border">
                <div className="max-w-7xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Siap Menata Finansial Anda?</h2>
                    <p className="text-slate-400 max-w-lg mx-auto">Bergabunglah dengan ribuan orang lainnya yang telah memulai perjalanan finansial yang lebih baik.</p>
                    <Link
                        to="/register"
                        className="inline-block bg-primary hover:bg-primary-hover text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-primary/20"
                    >
                        Daftar Jetzt!
                    </Link>
                    <div className="pt-16 text-slate-500 text-sm">
                        &copy; 2024 FinTrack. Dibuat dengan ❤ untuk pengelolaan uang yang lebih baik.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
