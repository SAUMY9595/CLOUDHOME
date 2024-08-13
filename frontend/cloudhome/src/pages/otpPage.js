import { useEffect, useState } from "react";
import Navbar from "../components/navbar/index1";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerifyOtp from "../hooks/useVerifyOtp";
import { toast } from "react-toastify";

const OtpPage = () => {
  const { email } = useSelector((e) => e.auth);
  const [otp, setOtp] = useState("");
  const { generateNewOtp } = useGenerateNewOtp();
  const { verifyOtp } = useVerifyOtp();

  const handleSubmit = async () => {
    if (otp.length < 4) {
      toast.error("Invalid OTP");
    } else {
      const num = parseInt(otp);
      if (num >= 1000 && num <= 9999) {
        toast.info(`You have entered ${num}`);
        verifyOtp(num);
      } else {
        toast.error("Invalid OTP");
      }
    }
  };

  useEffect(() => {
    generateNewOtp();
  }, []);

  return (
    <>
      <Navbar />
      <div className="otp-page-container">
        <div className="otp-box">
          <p>Email: {email}</p>
          <div className="otp-input-container">
            <input
              maxLength={4}
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>
          <button onClick={handleSubmit}>Verify</button>
        </div>
      </div>
    </>
  );
};

export default OtpPage;