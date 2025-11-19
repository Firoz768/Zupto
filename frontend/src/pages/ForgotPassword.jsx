import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetching the otp verification
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setLoading(false);
      setStep(2);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setLoading(false);
      setStep(3);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setErr("");
      console.log(result);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    // implementing reset password functionality
    <div className="flex items-center w-full justify-center p-4 min-h-screen bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4  ">
          <MdOutlineArrowBackIos
            className="text-[#ff4d2d] cursor-pointer"
            size={30}
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-cente text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {/* Step 1 Sending otp to the email address */}
        {step == 1 && (
          <div>
            <div className="mb-6 ">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1 "
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />

              <button
                onClick={handleSendOtp}
                disabled={loading}
                className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white font-bold hover:bg-[#e64323]`}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
              </button>
              {err && <p className="text-red-700 text-center my-2.5">*{err}</p>}
            </div>
          </div>
        )}

        {/* Step 2 User enters the otp & verifying the otp  */}
        {step == 2 && (
          <div>
            <div className="mb-6 ">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1 "
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white font-bold hover:bg-[#e64323]`}
              >
                {loading ? <ClipLoader size={20} color="white" /> : "Verify"}
              </button>
              {err && <p className="text-red-700 text-center my-2.5">*{err}</p>}
            </div>
          </div>
        )}

        {/* Step 3 User resets the password */}
        {step == 3 && (
          <div>
            <div className="mb-6 ">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1 "
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>
            <div className="mb-6 ">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1 "
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white font-bold hover:bg-[#e64323]`}
              required
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
            {err && <p className="text-red-700 text-center my-2.5">*{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;
