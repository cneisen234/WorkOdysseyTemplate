import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserType } from "@prisma/client";
import Link from "next/link";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";

// TODO: Replace with actual database query
// This should fetch a specific resume from your database where id = params.id AND jobseeker_id = session.user.id
const getResumeById = (id: string) => {
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
        "Comprehensive resume focused on full-stack development with strong emphasis on React, Node.js, and modern web technologies. Tailored for senior-level software engineering positions.",
      skills: [
        "JavaScript/TypeScript",
        "React & Next.js",
        "Node.js & Express",
        "PostgreSQL & MongoDB",
        "AWS & Docker",
        "Git & CI/CD",
      ],
      experience: [
        {
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          duration: "2022 - Present",
          description:
            "Led development of microservices architecture serving 1M+ users",
        },
        {
          title: "Full Stack Developer",
          company: "StartupXYZ",
          duration: "2020 - 2022",
          description:
            "Built and maintained React applications with Node.js backend",
        },
        {
          title: "Frontend Developer",
          company: "WebAgency",
          duration: "2018 - 2020",
          description:
            "Developed responsive web applications for various clients",
        },
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          school: "University of Technology",
          year: "2018",
        },
      ],
      uploadDate: "2024-01-15",
      applications: 8,
      views: 23,
      targetRoles: [
        "Senior Software Engineer",
        "Full Stack Developer",
        "Tech Lead",
      ],
    },
  ];

  return mockResumes.find((resume) => resume.id === id);
};

interface ResumeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ResumeDetailPage({
  params,
}: ResumeDetailPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.userType !== UserType.JOB_SEEKER) {
    redirect("/login");
  }

  const { id } = await params;

  // TODO: Replace with actual database query:
  // const resume = await prisma.resume.findFirst({
  //   where: {
  //     id: id,
  //     jobSeekerId: session.user.id
  //   },
  //   include: {
  //     applications: true
  //   }
  // })

  const resume = getResumeById(id);

  if (!resume) {
    redirect("/jobseeker/resumes");
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <JobSeekerNavbar />
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/jobseeker/resumes"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center">
            ← Back to Resumes
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-800">
                  {resume.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    resume.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                  {resume.status}
                </span>
              </div>
              <p className="text-gray-600">
                Last modified on{" "}
                {new Date(resume.lastModified).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <Link
                href={`/jobseeker/resumes/${resume.id}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                Edit Resume
              </Link>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Resume Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Downloads
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {resume.downloadCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Applications
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {resume.applications}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Views</h3>
            <p className="text-2xl font-bold text-purple-600">{resume.views}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Days Active
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {Math.floor(
                (new Date().getTime() - new Date(resume.uploadDate).getTime()) /
                  (1000 * 3600 * 24)
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resume Description */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Resume Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {resume.description}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Work Experience
              </h2>
              <div className="space-y-4">
                {resume.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Education
              </h2>
              <div className="space-y-3">
                {resume.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <p className="text-green-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-600">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* File Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                File Details
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    File Name
                  </span>
                  <p className="text-gray-800">{resume.fileName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    File Size
                  </span>
                  <p className="text-gray-800">{resume.fileSize}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Upload Date
                  </span>
                  <p className="text-gray-800">
                    {new Date(resume.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Last Modified
                  </span>
                  <p className="text-gray-800">
                    {new Date(resume.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Status
                  </span>
                  <p className="text-gray-800">{resume.status}</p>
                </div>
              </div>
            </div>

            {/* Target Roles */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Target Roles
              </h2>
              <div className="space-y-2">
                {resume.targetRoles.map((role, index) => (
                  <div key={index} className="bg-gray-50 p-2 rounded-md">
                    <span className="text-gray-800">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Share Resume Link
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Create New Version
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  {resume.status === "Active" ? "Deactivate" : "Activate"}{" "}
                  Resume
                </button>
                <Link
                  href={`/jobseeker/resumes/${resume.id}/analytics`}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 text-center block">
                  View Analytics
                </Link>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200">
                  Delete Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
