import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
      <h1 className="text-5xl font-bold mb-4">404 – Page Not Found</h1>

      <p className="text-gray-600 mb-6 max-w-xl">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
        >
          Go to Homepage
        </Link>

        <Link
          href="/contact-us"
          className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}