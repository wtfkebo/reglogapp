import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ErrorAlertProps {
    message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-200 text-sm"
        >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
        </motion.div>
    );
}

interface SuccessMessageProps {
    message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 mb-4 flex flex-col items-center gap-2 text-green-200 text-center"
        >
            <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-green-100">Success!</h3>
            <p>{message}</p>
        </motion.div>
    );
}
