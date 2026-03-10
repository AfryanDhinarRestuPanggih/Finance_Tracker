import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ArrowLeftRight,
    FileText,
    LogOut,
    User as UserIcon,
    Wallet
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/transactions', icon: ArrowLeftRight, label: 'Transaksi' },
        { path: '/reports', icon: FileText, label: 'Laporan' },
    ];


    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 glass h-screen fixed left-0 top-0 flex flex-col border-r border-border">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-primary p-2 rounded-xl">
                    <Wallet className="text-white w-6 h-6" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                    FinTrack
                </span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                            ? 'bg-primary/20 text-primary border border-primary/50'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 p-3 glass rounded-2xl mb-4">
                    <div className="bg-slate-700 p-2 rounded-full">
                        <UserIcon className="text-slate-300 w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-white">{user?.username}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
