import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";
import Link from "next/link";
import EmployerNavbar from "@/components/EmployerNavbar";

// TODO: Replace with actual database query
// This should fetch jobs from your database where company_id = session.user.id
const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    type: "Full-time",
    applicantCount: 12,
    postedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Frontend Developer",
    location: "Remote",
    type: "Contract",
    applicantCount: 8,
    postedDate: "2024-01-10",
  },
  {
    id: "3",
    title: "Product Manager",
    location: "New York, NY",
    type: "Full-time",
    applicantCount: 5,
    postedDate: "2024-01-08",
  },
];

export default async function CompanyJobs() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== UserType.COMPANY) {
    redirect("/login");
  }

  // TODO: Replace mockJobs with actual database query:
  // const jobs = await prisma.job.findMany({
  //   where: {
  //     companyId: session.user.id
  //   },
  //   include: {
  //     _count: {
  //       select: { applications: true }
  //     }
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // })

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Jobs Management
        </h1>
        <p className="text-gray-600 mb-4">
          Manage your company's job postings and applications
        </p>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium mb-8 transition-colors duration-200">
          + Create New Job
        </button>

        <div className="space-y-4">
          {mockJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {job.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <p className="text-gray-600">
                  <strong className="text-gray-800">Location:</strong>{" "}
                  {job.location}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Type:</strong> {job.type}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Applications:</strong>{" "}
                  {job.applicantCount}
                </p>
                <p className="text-gray-600">
                  <strong className="text-gray-800">Posted:</strong>{" "}
                  {job.postedDate}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                <Link
                  href={`/company/jobs/${job.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  View Details
                </Link>
                <Link
                  href={`/company/jobs/${job.id}/edit`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Edit
                </Link>
                <Link
                  href={`/company/jobs/${job.id}/applicants`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  View Applicants
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
