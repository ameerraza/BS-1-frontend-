import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { Button } from "../common/Button";
import { verifyOtp } from "@/api/api";
import Cookies from "js-cookie";
export default function Otp({ setActivePage }: any) {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoaderStore();
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState(""); // For error message
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds

  const inputRefs = useRef<(HTMLInputElement | any)[]>([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = Cookies.get("email");
    if (storedData) {
      setData(storedData);
    } else {
      console.warn("No email available in localStorage");
    }

    // Start the countdown timer
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [timer]);
  // Format the timer to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleInputChange = (e: any, index: number) => {
    const { value } = e.target;

    if (value.length > 1) return;

    setOtpValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });

    if (value && index < otpValues.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (value !== "" && error) setError("");
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const newOtpValues = pastedText
      .split("")
      .map((char) => (/[0-9]/.test(char) ? char : ""));
    setOtpValues(newOtpValues);
    const nextIndex = Math.min(index + pastedText.length, otpValues.length - 1);
    inputRefs.current[nextIndex].focus();
    if (
      newOtpValues.every((value) => value !== "") ||
      newOtpValues.some((value) => value !== "")
    )
      setError("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (otpValues.some((value) => value === "")) {
      setError("Please fill in all OTP fields.");
      return;
    }

    const otpCode = otpValues.join("");
    const email = Cookies.get("email");

    const payload = {
      email: email,
      otp: otpCode,
    };

    try {
      showLoader();
      // Make your API call here with the payload
      const response = await verifyOtp(payload);

      if (response.success === true) {
        router.push("/authentication/?login");
        // Handle success
        // setActivePage("reset-password");
        hideLoader();
      } else {
        setError("Invalid OTP");
        hideLoader();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying OTP");
      hideLoader();
    }
  };

  const ForgotBtn = async () => {
    const email = Cookies.get("email");
    if (!email) {
      setError("Email not found");
      return;
    }
    // showLoader();
    // const response = await forgetPassword({ email: email });
    // if (response.message == "OTP sent successfully. Please check your email.") {
    //   toastSuccess("Otp again sent to email");
    //   hideLoader();
    //   setTimer(120); // Reset the timer to 2 minutes
    // } else {
    //   toastError("Failed");
    // }
    // hideLoader();
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-responsive-xl md:text-responsive-3xl text-primaryDash font-semibold">
          Verify OTP
        </h1>
        <p className="text-center font-light text-gray-400 text-sm">
          Enter the OTP code sent to your email address
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-2 md:mt-4">
        <div className="mx-auto max-w-72  flex flex-row items-center justify-center w-full gap-2 my-6">
          {[0, 1, 2, 3, 4, 5].map((index: number) => (
            <div key={index} className="w-12 h-12">
              <input
                ref={(el: any) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={otpValues[index]}
                className="w-full h-full text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                type="number"
                min={0}
                max={9}
                maxLength={1}
                name={`otp-${index}`}
                id={`otp-${index}`}
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            Time Remaining:{" "}
            <span className="font-medium">{formatTime(timer)}</span>
          </p>
          <button
            type="button"
            onClick={ForgotBtn}
            className="text-[#203661] text-sm hover:underline"
            disabled={timer > 0}
          >
            Resend Code
          </button>
        </div>

        <Button type="submit" fullWidth variant="secondary" className="my-2">
          Verify OTP
        </Button>
      </form>
    </div>
  );
}
