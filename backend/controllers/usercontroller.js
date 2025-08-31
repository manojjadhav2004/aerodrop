import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import orderModel from "../models/orderModel.js";

//log in user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({ success: true, token});

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "An error occurred while logging in" });
  }
};


const createToken = (user) => {
  return jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);
};
//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0, // <- allow no uppercase
        minNumbers: 1,
        minSymbols: 0, // <- allow no symbols
      })
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Weak password." });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // Save the new user to the database
    const user = await newUser.save();
    const token = createToken(user);
    res.json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred while registering the user",
    });
  }
};

const getAllUsersWithSpend = async (req, res) => {
  try {
    const users = await userModel.find({}, { password: 0 });
    const orders = await orderModel.find({});
    const userSpendMap = {};
    orders.forEach(order => {
      if (!userSpendMap[order.userId]) userSpendMap[order.userId] = 0;
      userSpendMap[order.userId] += order.amount;
    });
    const usersWithSpend = users.map(user => ({
      ...user.toObject(),
      totalSpend: userSpendMap[user._id] || 0
    }));
    res.json({ success: true, users: usersWithSpend });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Failed to fetch users' });
  }
};

export { loginUser, registerUser, getAllUsersWithSpend };
