import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";
import Link from "next/link";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";

// TODO: Replace with actual database query
// This should fetch resumes from your database where jobseeker_id = session.user.id
const mockResumes = [
  {
    id: "1",
    title: "Software Engineer Resume",
    fileName: "software_engineer_resume_2024.pdf",
    lastModified: "2024-01-20",
    status: "Active",
    downloadCount: 15,
    fileSize: "245 KB",
    description:
      "Focused on full-stack development with React and Node.js experience",
  },
  {
    id: "2",
    title: "Frontend Developer Resume",
    fileName: "frontend_dev_resume.pdf",
    lastModified: "2024-01-15",
    status: "Active",
    downloadCount: 8,
    fileSize: "198 KB",
    description: "Specialized resume highlighting UI/UX and React expertise",
  },
  {
    id: "3",
    title: "General Tech Resume",
    fileName: "general_tech_resume_draft.pdf",
    lastModified: "2024-01-10",
    status: "Draft",
    downloadCount: 0,
    fileSize: "156 KB",
    description: "General purpose resume for various tech positions",
  },
];

export default async function JobSeekerResumes() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== UserType.JOB_SEEKER) {
    redirect("/login");
  }

  // TODO: Replace mockResumes with actual database query:
  // const resumes = await prisma.resume.findMany({
  //   where: {
  //     jobSeekerId: session.user.id
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // })

  const activeResumes = mockResumes.filter(
    (resume) => resume.status === "Active"
  );
  const draftResumes = mockResumes.filter(
    (resume) => resume.status === "Draft"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <JobSeekerNavbar />
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Resume Management
            </h1>
            <p className="text-gray-600">
              Manage your resumes and track their performance
            </p>
          </div>
          <Link
            href="/jobseeker/resumes/create"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 mt-4 sm:mt-0 text-center">
            + Upload New Resume
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Total Resumes
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {mockResumes.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Active Resumes
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {activeResumes.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Total Downloads
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {mockResumes.reduce(
                (sum, resume) => sum + resume.downloadCount,
                0
              )}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Active Resumes Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Active Resumes ({activeResumes.length})
            </h2>
            <div className="space-y-4">
              {activeResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {resume.title}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {resume.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                        <p className="text-gray-600">
                          <strong className="text-gray-800">File:</strong>{" "}
                          {resume.fileName}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Size:</strong>{" "}
                          {resume.fileSize}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Downloads:</strong>{" "}
                          {resume.downloadCount}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Modified:</strong>{" "}
                          {new Date(resume.lastModified).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2">
                        {resume.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-6">
                      <Link
                        href={`/jobseeker/resumes/${resume.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        View Details
                      </Link>
                      <Link
                        href={`/jobseeker/resumes/${resume.id}/edit`}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Edit
                      </Link>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draft Resumes Section */}
          {draftResumes.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Draft Resumes ({draftResumes.length})
              </h2>
              <div className="space-y-4">
                {draftResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-700">
                            {resume.title}
                          </h3>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            {resume.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                          <p className="text-gray-600">
                            <strong className="text-gray-700">File:</strong>{" "}
                            {resume.fileName}
                          </p>
                          <p className="text-gray-600">
                            <strong className="text-gray-700">Size:</strong>{" "}
                            {resume.fileSize}
                          </p>
                          <p className="text-gray-600">
                            <strong className="text-gray-700">Modified:</strong>{" "}
                            {new Date(resume.lastModified).toLocaleDateString()}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2">
                          {resume.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4 lg:mt-0 lg:ml-6">
                        <Link
                          href={`/jobseeker/resumes/${resume.id}/edit`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                          Continue Editing
                        </Link>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                          Activate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mockResumes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No resumes uploaded yet
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by uploading your first resume
              </p>
              <Link
                href="/jobseeker/resumes/create"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200">
                Upload Your First Resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
