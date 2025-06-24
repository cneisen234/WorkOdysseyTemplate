"use client";

import { UserType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import JobSeekerNavbar from "@/components/JobSeekerNavbar";

// TODO: Replace with actual database query
// This should fetch job seeker profile from your database where jobseeker_id = session.user.id
const getJobSeekerProfile = (userId: string) => {
  return {
    id: userId,
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
    summary:
      "Experienced full-stack developer with 6+ years building scalable web applications. Passionate about clean code, user experience, and continuous learning.",
    experience: "6 years",
    skills: "JavaScript, React, Node.js, Python, PostgreSQL",
    education: "Bachelor's in Computer Science",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.portfolio.com",
    availability: "Immediately",
    salaryExpectation: "$100,000 - $130,000",
    workType: "Full-time",
    remotePreference: "Remote",
  };
};

interface JobSeekerFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  experience: string;
  skills: string;
  education: string;
  website: string;
  linkedin: string;
  github: string;
  portfolio: string;
  availability: string;
  salaryExpectation: string;
  workType: string;
  remotePreference: string;
}

export default function JobSeekerProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if not authenticated or not a job seeker
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.userType !== UserType.JOB_SEEKER) {
    router.push("/login");
    return null;
  }

  // TODO: Replace with actual database query
  const jobSeekerProfile = getJobSeekerProfile(session.user.id);

  const [formData, setFormData] = useState<JobSeekerFormData>({
    fullName: jobSeekerProfile.fullName,
    email: jobSeekerProfile.email,
    phone: jobSeekerProfile.phone,
    location: jobSeekerProfile.location,
    title: jobSeekerProfile.title,
    summary: jobSeekerProfile.summary,
    experience: jobSeekerProfile.experience,
    skills: jobSeekerProfile.skills,
    education: jobSeekerProfile.education,
    website: jobSeekerProfile.website,
    linkedin: jobSeekerProfile.linkedin,
    github: jobSeekerProfile.github,
    portfolio: jobSeekerProfile.portfolio,
    availability: jobSeekerProfile.availability,
    salaryExpectation: jobSeekerProfile.salaryExpectation,
    workType: jobSeekerProfile.workType,
    remotePreference: jobSeekerProfile.remotePreference,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/jobseeker/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JobSeekerNavbar />
      <div className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Job Seeker Profile
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your profile information and job preferences
        </p>

        <div className="max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md mb-6">
              <strong>Database Integration:</strong> This will read from and
              update the job_seekers table where jobseeker_id = current_user_id
            </div>

            {message && (
              <div
                className={`p-3 rounded-md mb-6 ${
                  message.includes("Error")
                    ? "text-red-700 bg-red-100"
                    : "text-green-700 bg-green-100"
                }`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="City, State/Country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Professional Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Years of Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select experience</option>
                  <option value="Entry Level (0-1 years)">
                    Entry Level (0-1 years)
                  </option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              {/* Education */}
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g. Bachelor's in Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Work Type Preference */}
              <div>
                <label
                  htmlFor="workType"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Work Type Preference
                </label>
                <select
                  id="workType"
                  name="workType"
                  value={formData.workType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Remote Preference */}
              <div>
                <label
                  htmlFor="remotePreference"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Remote Work Preference
                </label>
                <select
                  id="remotePreference"
                  name="remotePreference"
                  value={formData.remotePreference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                  <option value="No preference">No preference</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Immediately">Immediately</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                </select>
              </div>

              {/* Salary Expectation */}
              <div>
                <label
                  htmlFor="salaryExpectation"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Expectation
                </label>
                <input
                  type="text"
                  id="salaryExpectation"
                  name="salaryExpectation"
                  value={formData.salaryExpectation}
                  onChange={handleInputChange}
                  placeholder="e.g. $80,000 - $100,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Professional Summary */}
              <div className="md:col-span-2">
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Brief overview of your professional background and goals..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Skills */}
              <div className="md:col-span-2">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Key Skills
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g. JavaScript, React, Node.js, Python, SQL..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Links Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-t pt-6">
                  Online Presence
                </h3>
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* GitHub */}
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Portfolio */}
              <div>
                <label
                  htmlFor="portfolio"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200">
                {isLoading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    fullName: jobSeekerProfile.fullName,
                    email: jobSeekerProfile.email,
                    phone: jobSeekerProfile.phone,
                    location: jobSeekerProfile.location,
                    title: jobSeekerProfile.title,
                    summary: jobSeekerProfile.summary,
                    experience: jobSeekerProfile.experience,
                    skills: jobSeekerProfile.skills,
                    education: jobSeekerProfile.education,
                    website: jobSeekerProfile.website,
                    linkedin: jobSeekerProfile.linkedin,
                    github: jobSeekerProfile.github,
                    portfolio: jobSeekerProfile.portfolio,
                    availability: jobSeekerProfile.availability,
                    salaryExpectation: jobSeekerProfile.salaryExpectation,
                    workType: jobSeekerProfile.workType,
                    remotePreference: jobSeekerProfile.remotePreference,
                  })
                }
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200">
                Reset Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
