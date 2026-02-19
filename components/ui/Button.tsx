import { HTMLMotionProps, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
    isLoading?: boolean;
}

export function Button({ children, isLoading, className, ...props }: ButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge('btn-primary w-full relative overflow-hidden', className)}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                children
            )}
        </motion.button>
    );
}
