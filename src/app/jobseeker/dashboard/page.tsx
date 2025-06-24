import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";

export default async function JobSeekerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== UserType.JOB_SEEKER) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <JobSeekerNavbar />
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Job Seeker Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {session.user.name}! This is your job seeker home page.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Applications Sent
            </h3>
            <p className="text-4xl font-bold text-blue-600">12</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Interview Invites
            </h3>
            <p className="text-4xl font-bold text-blue-600">3</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Profile Views
            </h3>
            <p className="text-4xl font-bold text-blue-600">47</p>
          </div>
        </div>
      </div>
    </div>
  );
}
