"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { LogOut, User, Mail } from 'lucide-react';

interface UserSession {
    username: string;
    email: string;
    userId: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserSession | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    router.push('/login');
                }
            } catch (e) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 flex items-center justify-center">
            <GlassCard className="max-w-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <Button
                        onClick={handleLogout}
                        className="w-auto px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/50"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm text-white/50 block">Username</label>
                                <div className="flex items-center gap-3 text-white text-lg">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <User className="w-5 h-5" />
                                    </div>
                                    {user?.username}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-white/50 block">Email Address</label>
                                <div className="flex items-center gap-3 text-white text-lg">
                                    <div className="p-2 rounded-lg bg-white/10">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
                        This is a protected route. Only authenticated users can see this.
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}
