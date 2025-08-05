import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌾</span>
              </div>
              <span className="text-xl font-heading font-bold">KrishiSafar</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connect with authentic farm experiences across India. Discover sustainable farming, enjoy fresh organic produce, and immerse yourself in rural culture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/farmstays" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Farm Stays
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-semibold mb-4">For Hosts</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/signup?type=host" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Become a Host
                </Link>
              </li>
              <li>
                <Link to="/host-guide" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Host Guide
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 KrishiSafar. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;