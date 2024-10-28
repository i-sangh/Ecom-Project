"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Directly redirect to the verify page without creating a user
    const emailParam = encodeURIComponent(formData.email);
    router.push(`/verify?email=${emailParam}`);
  };

  return (
    <div className="relative mx-auto max-w-md px-4 py-8">
      <div className="rounded-lg p-8 bg-white border border-gray-300 shadow-md">
        <h1 className="mb-8 text-2xl font-semibold text-center">Create your account</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-left">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-left">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-left">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded border border-gray-300 px-3 py-2"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded bg-black py-3 text-white hover:bg-gray-800 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Have an Account? </span>
          <Link href="/login" className="font-semibold text-black">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
