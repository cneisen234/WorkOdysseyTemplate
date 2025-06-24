import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";
import Link from "next/link";
import EmployerNavbar from "@/components/EmployerNavbar";

// TODO: Replace with actual database query
// This should fetch a specific job from your database where id = params.id AND company_id = session.user.id
const getJobById = (id: string) => {
  const mockJobs = [
    {
      id: "1",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $160,000",
      applicantCount: 12,
      postedDate: "2024-01-15",
      status: "Active",
      description:
        "We're looking for an experienced software engineer to join our growing team and help build the next generation of our platform. You'll work with cutting-edge technologies and collaborate with a talented team of engineers.",
      requirements: [
        "5+ years of software development experience",
        "Strong knowledge of JavaScript, TypeScript, and React",
        "Experience with Node.js and databases",
        "Familiarity with cloud platforms (AWS, GCP, or Azure)",
        "Strong problem-solving and communication skills",
      ],
      responsibilities: [
        "Design and develop scalable web applications",
        "Collaborate with cross-functional teams",
        "Mentor junior developers",
        "Participate in code reviews and technical discussions",
        "Optimize application performance and scalability",
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements",
        "Professional development budget",
        "401(k) with company matching",
      ],
      applicationDeadline: "2024-02-15",
      department: "Engineering",
      experienceLevel: "Senior",
      remoteAllowed: true,
    },
  ];

  return mockJobs.find((job) => job.id === id);
};

interface JobDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== UserType.COMPANY) {
    redirect("/login");
  }

  const { id } = await params;

  // TODO: Replace with actual database query:
  // const job = await prisma.job.findFirst({
  //   where: {
  //     id: id,
  //     companyId: session.user.id
  //   },
  //   include: {
  //     _count: {
  //       select: { applications: true }
  //     }
  //   }
  // })

  const job = getJobById(id);

  if (!job) {
    redirect("/company/jobs");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployerNavbar />
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/company/jobs"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center">
            ← Back to Jobs
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {job.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    job.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                  {job.status}
                </span>
              </div>
              <p className="text-gray-600">
                Posted on {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Link
                href={`/company/jobs/${job.id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                Edit Job
              </Link>
              <Link
                href={`/company/jobs/${job.id}/applicants`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                View Applicants ({job.applicantCount})
              </Link>
            </div>
          </div>
        </div>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Applications
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {job.applicantCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Days Active
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {Math.floor(
                (new Date().getTime() - new Date(job.postedDate).getTime()) /
                  (1000 * 3600 * 24)
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Views</h3>
            <p className="text-2xl font-bold text-purple-600">247</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Days Left
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {Math.max(
                0,
                Math.floor(
                  (new Date(job.applicationDeadline).getTime() -
                    new Date().getTime()) /
                    (1000 * 3600 * 24)
                )
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Requirements
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Benefits & Perks
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Job Details
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Location
                  </span>
                  <p className="text-gray-800">{job.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Job Type
                  </span>
                  <p className="text-gray-800">{job.type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Salary Range
                  </span>
                  <p className="text-gray-800">{job.salary}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Experience Level
                  </span>
                  <p className="text-gray-800">{job.experienceLevel}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Department
                  </span>
                  <p className="text-gray-800">{job.department}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Remote Work
                  </span>
                  <p className="text-gray-800">
                    {job.remoteAllowed ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Application Deadline
                  </span>
                  <p className="text-gray-800">
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Close Job Posting
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Pause Applications
                </button>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Duplicate Job
                </button>
                <Link
                  href={`/company/jobs/${job.id}/analytics`}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 text-center block">
                  View Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
