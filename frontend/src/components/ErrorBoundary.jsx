import React from "react";

const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error here if needed
  }

  

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] bg-red-50 rounded-lg shadow p-8 m-4">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-gray-700">Please refresh the page or try again later.</p>

          <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md dark:bg-white dark:text-black text-white bg-black"
        >
          Logout
        </button>
                
        <Link to="/profile" className="hover:underline">Profile</Link>

        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
