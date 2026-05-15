"use client";
import React, { useState } from "react";
import { InputField } from "../common/InputField";
import { FcGoogle } from "react-icons/fc"; // Add this import

import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { Button } from "../common/Button";
import { authSignUp } from "@/api/api";
import Cookies from "js-cookie";
const SignUp = ({ setActivePage }: any) => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoaderStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    CNIC: "",
  });

  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Username validation
    if (!formData.name) {
      newErrors.name = "Username is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact validation
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{11}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid 11-digit contact number";
    }

    // CNIC validation
    if (!formData.CNIC) {
      newErrors.CNIC = "CNIC is required";
    } else if (!/^\d{13}$/.test(formData.CNIC)) {
      newErrors.CNIC = "Please enter a valid 13-digit CNIC number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrorMessages(newErrors);
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

    const formattedData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: `+92${formData.contact.substring(1)}`, // Convert to required format
      cnic: formData.CNIC,
    };

    try {
      showLoader();
      const response = await authSignUp(formattedData);
      if (response.success === true) {
        Cookies.set("email", response.data.email);
        console.log("response", response);
        router.push("/authentication/?otp");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-responsive-xl md:text-responsive-2xl text-primaryDash font-semibold">
          Register Yourself
        </h1>
        <p className="text-center font-light text-gray-500 text-sm">
          Enter your name, email and password to signup.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2">
        <div className="space-y-1">
          <div>
            <InputField
              name="name"
              label="Username"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {errorMessages.name && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.name}</p>
            )}
          </div>
          <div>
            <InputField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errorMessages.email && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
            )}
          </div>
          <div>
            <InputField
              name="contact"
              label="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
            />
            {errorMessages.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.contact}
              </p>
            )}
          </div>
          <div>
            <InputField
              name="CNIC"
              label="CNIC"
              value={formData.CNIC}
              onChange={handleChange}
              placeholder="Enter your CNIC number"
              required
            />
            {errorMessages.CNIC && (
              <p className="text-red-500 text-sm mt-1">{errorMessages.CNIC}</p>
            )}
          </div>
          <div>
            <InputField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errorMessages.password && (
              <p className="text-red-500 text-sm mt-1">
                {errorMessages.password}
              </p>
            )}
          </div>
        </div>
        {/* <div className="mt-1 flex justify-end">
          <p className="text-[#203661] text-sm cursor-pointer">
            Forgot Password?
          </p>
        </div> */}
        <Button type="submit" fullWidth variant="secondary" className="my-2">
          Sign Up
        </Button>
      </form>
      <div className="space-y-1">
        {/* <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">Or sign up with</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-center">
          <FcGoogle
            size={24}
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </div> */}
        <div className="flex justify-center text-sm md:text-base">
          <p className="text-primaryDash">
            Already have an account
            <span
              className="text-[#203661] cursor-pointer"
              onClick={() => router.push("/authentication/?login")}
            >
              {" "}
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
