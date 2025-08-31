# 🍅 Local Setup Guide - Tomato Food Delivery App

This guide will help you set up the Tomato Food Delivery App locally with all components working, including Razorpay integration.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Razorpay Account** (for payment integration)

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

3. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin/fooddelivery
   npm install
   ```

## ⚙️ Environment Configuration

### 1. Create Backend Environment File
```bash
cd backend
cp env.example .env
```

### 2. Configure Environment Variables
Edit `backend/.env` with your configuration:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/food-delivery

# Razorpay Configuration (Test Keys)
RAZORPAY_KEY_ID=rzp_test_pWyJxe1HjSj9xU
RAZORPAY_SECRET_KEY=your_razorpay_secret_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=4000

# Frontend URL for local development
FRONTEND_URL=http://localhost:5173
```

## 🗄️ Database Setup

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/food-delivery`

### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URL` in `.env`

## 💳 Razorpay Setup

1. **Create Razorpay Account**
   - Sign up at [Razorpay](https://razorpay.com/)
   - Complete KYC verification

2. **Get Test Keys**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Navigate to Settings → API Keys
   - Generate test keys
   - Copy `Key ID` and `Key Secret`

3. **Update Environment Variables**
   ```env
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_SECRET_KEY=your_secret_key
   ```

## 🏃‍♂️ Running the Application

### 1. Start Backend Server
```bash
cd backend
npm run server
```
**Expected Output:** `Server is running 4000` and `DB Connected Successfully`

### 2. Start Frontend (Customer App)
```bash
cd frontend
npm run dev
```
**Access URL:** http://localhost:5173

### 3. Start Admin Panel
```bash
cd admin/fooddelivery
npm run dev
```
**Access URL:** http://localhost:5174 (or check terminal for exact port)

## 🌐 Application URLs

| Component | URL | Description |
|-----------|-----|-------------|
| Frontend | http://localhost:5173 | Customer-facing app |
| Backend API | http://localhost:4000 | REST API server |
| Admin Panel | http://localhost:5174 | Admin management panel |

## 🧪 Testing the Setup

### 1. Test Backend API
```bash
curl http://localhost:4000
```
**Expected Response:** `API working`

### 2. Test Frontend
- Open http://localhost:5173
- You should see the food delivery app homepage

### 3. Test Admin Panel
- Open http://localhost:5174
- You should see the admin login/management interface

### 4. Test Razorpay Integration
1. Add items to cart in the frontend
2. Proceed to checkout
3. Complete payment flow
4. Verify order creation

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port
   lsof -i :4000
   # Kill process
   kill -9 <PID>
   ```

2. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity (for Atlas)

3. **Razorpay Payment Fails**
   - Verify test keys are correct
   - Check Razorpay dashboard for errors
   - Ensure you're using test mode

4. **Frontend Can't Connect to Backend**
   - Verify backend is running on port 4000
   - Check CORS configuration
   - Verify URL in frontend context

### Debug Mode
```bash
# Backend with debug logging
cd backend
DEBUG=* npm run server

# Frontend with verbose logging
cd frontend
npm run dev -- --debug
```

## 📁 Project Structure

```
Tomato-A-Food-Delivery-app/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── uploads/           # Food images
│   ├── server.js          # Main server file
│   └── .env              # Environment variables
├── frontend/              # React customer app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   └── context/      # React context
│   └── package.json
├── admin/                 # React admin panel
│   └── fooddelivery/
│       ├── src/
│       │   ├── components/
│       │   └── pages/
│       └── package.json
└── README.md
```

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all services are running
4. Check console logs for error messages

## 🎉 Success!

Once everything is running, you should have:
- ✅ Backend API server running on port 4000
- ✅ Frontend customer app on port 5173
- ✅ Admin panel on port 5174
- ✅ MongoDB database connected
- ✅ Razorpay integration working
- ✅ Full food delivery functionality

Happy coding! 🍅

