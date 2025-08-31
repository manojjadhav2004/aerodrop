import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import pkg from "razorpay";
const Razorpay = pkg;

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from 'mongoose';


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});



const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;// || "http://localhost:5173";

  try {
    const items = req.body.items;

    // Total price calculation
    let totalAmount = 0;

    items.forEach((item) => {
      totalAmount += item.price * item.quantity * 100 ; // paise
    });

    // Add delivery charges: ₹2 * 100 * 80 (based on your logic)
    const deliveryCharge = 0;
    totalAmount += deliveryCharge;

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: totalAmount / 100, // storing in ₹, not paise
      address: req.body.address,
      location: req.body.location, // <-- add this line
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Create Razorpay order
    const options = {
      amount: totalAmount, // in paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id,
      items: newOrder.items,
      frontendRedirect: {
        success: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Payment creation failed" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      // Generate a 4-digit OTP (string with leading zeros if needed)
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const updated = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true, otp },
        { new: true }
      );
      return res.json({ success: true, message: "Payment successful", otp: updated?.otp });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Payment verification failed" });
  }
};

//user order for frontend
const userOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to fetch user orders"});
  }
}

//listing orders for admin panel
const listOrders = async(req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

// api for updating order status

const updateStatus = async(req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({success:true,message:"Status Updated"});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

const deleteOrder = async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.body.orderId);
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to delete order' });
  }
};
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus,deleteOrder };
