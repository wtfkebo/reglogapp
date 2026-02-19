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
import { User, Mail, Phone } from 'lucide-react';
import { ErrorAlert, SuccessMessage } from '@/components/ui/Feedback';

const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: RegisterFormData) => {
        setServerError('');
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setServerError(result.error || 'Registration failed');
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            setServerError('An unexpected error occurred');
        }
    };

    return (
        <GlassCard>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                <p className="text-white/60">Join us for a premium experience</p>
            </div>

            {success ? (
                <SuccessMessage message="Account created successfully! Redirecting..." />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {serverError && <ErrorAlert message={serverError} />}

                    <Input
                        label="Username"
                        icon={<User className="w-5 h-5" />}
                        error={errors.username?.message}
                        {...register('username')}
                    />

                    <Input
                        label="Email"
                        type="email"
                        icon={<Mail className="w-5 h-5" />}
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label="Phone (Optional)"
                        type="tel"
                        icon={<Phone className="w-5 h-5" />}
                        error={errors.phone?.message}
                        {...register('phone')}
                    />

                    <PasswordField
                        label="Password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <PasswordField
                        label="Confirm Password"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />

                    <Button type="submit" isLoading={isSubmitting} className="mt-6">
                        Sign Up
                    </Button>

                    <p className="text-center text-white/60 text-sm mt-4">
                        Already have an account?{' '}
                        <Link href="/login" className="text-white hover:underline font-semibold">
                            Log in
                        </Link>
                    </p>
                </form>
            )}
        </GlassCard>
    );
}
