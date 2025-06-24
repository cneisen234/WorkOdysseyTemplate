import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Job Platform
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connect job seekers with companies
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Link>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                New to our platform?
              </span>
            </div>

            <Link
              href="/register"
              className="w-full flex justify-center py-3 px-4 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-white hover:bg-indigo-50">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
