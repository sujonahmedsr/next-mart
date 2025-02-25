// app/error.tsx
'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error caught:', error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-red-50">
      <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-gray-800 mt-4">{error?.message || 'An unexpected error occurred.'}</p>

      <button
        onClick={reset}
        className="mt-6 px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
