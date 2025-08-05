import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8">
          Welcome, {user?.name}!
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-4">
            Account Type: <span className="font-medium">{user?.userType}</span>
          </p>
          <p className="text-gray-600">
            This is your dashboard where you can manage your {user?.userType === 'host' ? 'farm listings and bookings' : 'bookings and favorites'}.
          </p>
          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <p className="text-primary-700 text-sm">
              📝 Note: This is the MVP version. The full dashboard with all features will be available in the complete platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;