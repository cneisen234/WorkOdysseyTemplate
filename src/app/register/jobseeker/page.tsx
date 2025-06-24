import RegisterForm from "@/components/RegisterForm";

export default function JobSeekerRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <RegisterForm userType="jobseeker" />
    </div>
  );
}
