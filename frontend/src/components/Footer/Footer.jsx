import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold mb-2">Aero Drop</h1>
          <p className="text-gray-400 text-sm">
            Fast. Fresh. Delivered.  
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col  items-center  text-sm text-gray-400">
          {/* <a href="/" className="hover:text-white transition">Home</a> */}
          <h1 className="text-xl text-white font-semibold mb-2 ">Meet the Team</h1>

          <a href="/about" className="hover:text-white transition">About Us</a>
        </div>

        {/* Contact */}
        <div className="text-center md:text-right text-sm text-gray-400">
          <h1 className="text-xl text-white font-semibold mb-2">Get in touch</h1>
          <a
            href="mailto:  heymanojjadhav@gmail.com"
            className="block hover:text-white transition"
          >
          heymanojjadhav@gmail.com
          </a>
            <a
            href="mailto:  vaibhavvilasjadhav333@gmail.com"
            className="block hover:text-white transition"
          >
          vaibhavvilasjadhav333@gmail.com
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            dhadge.in
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Aero Drop — Built with passion by Vedant Dhadge.
      </div>
    </footer>
  );
};

export default Footer;
