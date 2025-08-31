import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    console.log(success, orderId);

  const verifyPayment = async () => {
    setLoading(true);
    setError("");
    console.log("Verify page params:", { success, orderId, url });
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success, orderId
      });
      console.log("Backend response:", response.data);
      if (response.data.success) {
        setOtp(response.data.otp || "");
        setTimeout(() => {
          navigate('/myorders');
        }, 2000);
      } else {
        setError("Payment verification failed. Redirecting to home...");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error("Verify error:", err);
      setError("Network or server error. Please try again later.");
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-6">
      {loading && !error && (
        <div className="spinner border-4 border-gray-200 border-t-gray-700 rounded-full w-10 h-10 animate-spin" />
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}
      {otp && !error && (
        <div className="text-center">
          <p className="text-lg font-semibold">Payment confirmed!</p>
          <p className="text-sm text-gray-600 mt-2">Your delivery OTP</p>
          <div className="mt-2 text-3xl font-bold tracking-widest bg-gray-100 px-6 py-3 rounded-md">{otp}</div>
          <p className="text-xs text-gray-500 mt-2">This OTP is also visible to the restaurant/admin.</p>
        </div>
      )}
    </div>
  )
}

export default Verify
