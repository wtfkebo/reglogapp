import { forwardRef, useState } from 'react';
import { Input } from './Input';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ label = "Password", error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className="relative">
                <Input
                    ref={ref}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    error={error}
                    icon={<Lock className="w-5 h-5" />}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
        );
    }
);

PasswordField.displayName = 'PasswordField';
