import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, className, ...props }, ref) => {
        return (
            <div className="w-full mb-4">
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors duration-300">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={twMerge(
                            'glass-input peer',
                            icon ? 'pl-10' : '',
                            error ? 'border-red-400/50 focus:border-red-400' : '',
                            className
                        )}
                        placeholder=" "
                        {...props}
                    />
                    <label
                        className={twMerge(
                            'absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none transition-all duration-300 bg-transparent px-1',
                            icon ? 'left-10' : '',
                            'peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white peer-focus:backdrop-blur-md',
                            'peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white peer-not-placeholder-shown:backdrop-blur-md'
                        )}
                    >
                        {label}
                    </label>
                </div>
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-400 text-sm mt-1 ml-1"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Input.displayName = 'Input';
