"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { PasswordField } from '@/components/ui/PasswordField';
import { Button } from '@/components/ui/Button';
import { User, Lock } from 'lucide-react';
import { ErrorAlert } from '@/components/ui/Feedback';

const loginSchema = z.object({
    identifier: z.string().min(1, 'Username or Email is required'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginFormData) => {
        setServerError('');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.error || 'Login failed');
                return;
            }

            if (result.token) {
                localStorage.setItem('auth_token', result.token);
            }

            window.location.href = 'https://moviesapp-wheat.vercel.app/';
        } catch (error) {
            setServerError('An unexpected error occurred');
        }
    };

    return (
        <GlassCard>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-white/60">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {serverError && <ErrorAlert message={serverError} />}

                <Input
                    label="Username or Email"
                    icon={<User className="w-5 h-5" />}
                    error={errors.identifier?.message}
                    {...register('identifier')}
                />

                <PasswordField
                    label="Password"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="flex justify-end">
                    <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" isLoading={isSubmitting} className="mt-2">
                    Sign In
                </Button>

                <p className="text-center text-white/60 text-sm mt-4">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-white hover:underline font-semibold">
                        Sign up
                    </Link>
                </p>
            </form>
        </GlassCard>
    );
}
