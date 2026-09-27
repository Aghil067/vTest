import { AlertCircle, RefreshCw, Home, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

// ---- Generic Error State ----

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Unable to load content. Please try again.',
  onRetry,
  showHomeButton = false,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
      >
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--heading)] mb-2">{title}</h2>
      <p className="text-[var(--copy)] max-w-md mb-6">{message}</p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center gap-2"
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {showHomeButton && (
          <Link to="/" className="btn-secondary flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}

// ---- Empty State ----

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({
  title = 'No content available',
  message = 'There is no content to display at this time.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 bg-[var(--site-bg)] border border-[var(--stroke)] rounded-full flex items-center justify-center mb-4">
        <FileSearch className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--heading)] mb-2">{title}</h3>
      <p className="text-[var(--copy)] max-w-md mb-6">{message}</p>
      {action && (
        action.href ? (
          <Link to={action.href} className="btn-primary">
            {action.label}
          </Link>
        ) : (
          <button onClick={action.onClick} className="btn-primary" type="button">
            {action.label}
          </button>
        )
      )}
    </div>
  );
}

interface NotFoundStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionHref?: string;
}

export function NotFoundState({
  title = 'Page Not Found',
  message = "The page you are looking for doesn't exist or has been moved.",
  actionText = 'Return Home',
  actionHref = '/',
}: NotFoundStateProps = {}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="mb-6">
        <span className="text-8xl font-black text-[var(--heading)] block leading-none">404</span>
        <div className="h-1 w-20 bg-green-500 rounded-full mx-auto mt-4" />
      </div>
      <h1 className="text-2xl font-bold text-[var(--heading)] mb-3">{title}</h1>
      <p className="text-[var(--copy)] max-w-md mb-8">
        {message}
      </p>
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link to={actionHref} className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" />
          {actionText}
        </Link>
        <Link to="/contact" className="btn-secondary">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
