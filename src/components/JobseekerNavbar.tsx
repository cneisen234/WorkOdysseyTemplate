"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function JobSeekerNavbar() {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 sm:px-8 flex justify-between items-center shadow-lg">
      <div className="nav-brand">
        <Link
          href="/jobseeker/dashboard"
          className="text-xl sm:text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-200">
          WorkOdyssey - Job Seeker
        </Link>
      </div>

      <div className="flex gap-4 sm:gap-8 items-center">
        <Link
          href="/jobseeker/dashboard"
          className="text-white px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-all duration-200 text-sm sm:text-base">
          Home
        </Link>

        <Link
          href="/jobseeker/profile"
          className="text-white px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-all duration-200 text-sm sm:text-base">
          Profile
        </Link>

        <Link
          href="/jobseeker/resumes"
          className="text-white px-3 py-2 rounded-md hover:bg-white hover:bg-opacity-10 transition-all duration-200 text-sm sm:text-base">
          Resumes
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base font-medium">
          Logout
        </button>
      </div>
    </nav>
  );
}
