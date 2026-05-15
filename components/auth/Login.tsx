"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { InputField } from "../common/InputField";
import { Button } from "../common/Button";
import { authLogin } from "@/api/api";
import useToastStore from "@/stores/toastStore";
import Cookies from "js-cookie";
const Login = ({ setActivePage }: any) => {
  const router = useRouter();
  const { showToast } = useToastStore();
  const { showLoader, hideLoader } = useLoaderStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // role: "Client", // Add default role
  });
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessages(newErrors);
    if (Object.keys(newErrors).length > 0) {
      showToast("Please fix the validation errors", "error");
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errorMessages[name]) {
      setErrorMessages((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create payload matching the required format
    const payload = {
      email: formData.email,
      password: formData.password,
      // role: formData.role,
    };

    // Make your API call here with the payload
    console.log("Submitting:", payload);

    try {
      showLoader();
      const response = await authLogin(payload);
      if (response.success === true) {
        // console.log("response", response);
        console.log("response.data :>> ", response.data);
        // Check if user is a client but not approved as vendor
        if (
          response.data.role === "Client" &&
          response.data.vendorStatus !== "Approved"
        ) {
          showToast("Application not approved yet", "error");
          hideLoader();
          return; // Prevent login
        }

        // Set cookies for successful login
        Cookies.set("authToken", response.data.token);

        // Override role to "vendor" if vendorStatus is true
        if (response.data.vendorStatus === "Approved") {
          Cookies.set("role", "vendor");
        } else {
          Cookies.set("role", response.data.role);
        }

        Cookies.set("email", response.data.email);
        Cookies.set("name", response.data.name);
        Cookies.set("id", response.data.id);
        showToast("Login successful", "success");
        router.push("/dashboard");
      } else {
        showToast("Login failed", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred during login", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-responsive-xl md:text-responsive-3xl text-primaryDash font-semibold">
          Sign In
        </h1>
        <p className="text-center font-light text-gray-400 text-sm">
          Enter your email and password to login to your account.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 md:mt-4">
        <div className="space-y-3">
          <div>
            <InputField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errorMessages.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
            )}
          </div>
          <div className="relative">
            <InputField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-6 top-[35px]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
            {errorMessages.password && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.password}
              </p>
            )}
          </div>
        </div>
        <div className="mt-1 flex justify-end">
          <p
            className="text-[#203661] text-sm cursor-pointer"
            onClick={() => {
              router.push("/authentication/?forgot");
            }}
          >
            Forgot Password?
          </p>
        </div>
        <Button type="submit" fullWidth variant="secondary" className="my-2">
          Sign In
        </Button>
      </form>
      <div className="space-y-1">
        {/* <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or sign In with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center">
          <FcGoogle
            size={24}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </div> */}
        {/* <div className="flex justify-center text-sm md:text-base">
          <p className="text-primaryDash">
            Want to create an account?
            <span
              className="text-[#203661] cursor-pointer"
              onClick={() => {
                router.push("/authentication/?signup");
              }}
            >
              {" "}
              Sign up
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
