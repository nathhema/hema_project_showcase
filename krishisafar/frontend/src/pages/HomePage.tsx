import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, Leaf, Heart, Shield } from 'lucide-react';
import axios from 'axios';

interface FarmStay {
  _id: string;
  name: string;
  location: {
    city: string;
    state: string;
  };
  pricePerNight: number;
  photos: string[];
  averageRating: number;
  totalReviews: number;
  experienceTypes: string[];
}

const HomePage: React.FC = () => {
  const [featuredFarmStays, setFeaturedFarmStays] = useState<FarmStay[]>([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchGuests, setSearchGuests] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedFarmStays();
  }, []);

  const fetchFeaturedFarmStays = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/farmstays?limit=6&sortBy=rating');
      setFeaturedFarmStays(response.data.data);
    } catch (error) {
      console.error('Error fetching featured farm stays:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchLocation) searchParams.set('location', searchLocation);
    if (searchGuests > 0) searchParams.set('guests', searchGuests.toString());
    
    navigate(`/farmstays?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-400 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Discover Authentic <span className="text-secondary-300">Farm Experiences</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connect with local farmers, experience sustainable agriculture, and enjoy the peace of rural India
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={searchGuests}
                    onChange={(e) => setSearchGuests(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5+ Guests</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Farm Stays */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Featured Farm Stays
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked experiences from verified hosts across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFarmStays.map((farmStay) => (
              <Link
                key={farmStay._id}
                to={`/farmstays/${farmStay._id}`}
                className="card hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={farmStay.photos[0] || '/placeholder-farm.jpg'}
                    alt={farmStay.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-dark px-2 py-1 rounded-full text-sm font-medium">
                      ₹{farmStay.pricePerNight}/night
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    {farmStay.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {farmStay.location.city}, {farmStay.location.state}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {farmStay.averageRating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({farmStay.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {farmStay.experienceTypes.slice(0, 2).map((type, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/farmstays" className="btn-outline">
              View All Farm Stays
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How KrishiSafar Works
            </h2>
            <p className="text-xl text-gray-600">
              Your journey to authentic farm experiences in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">
                1. Search & Discover
              </h3>
              <p className="text-gray-600">
                Browse through our curated collection of authentic farm stays across India. Filter by location, experience type, and amenities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">
                2. Book Your Stay
              </h3>
              <p className="text-gray-600">
                Select your preferred dates and make a secure booking. Connect directly with your host to plan your farm experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4">
                3. Experience & Enjoy
              </h3>
              <p className="text-gray-600">
                Immerse yourself in farm life, learn sustainable practices, and create unforgettable memories with local farming communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Types */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Types of Experiences
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect farm experience that matches your interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: 'Organic Farming', description: 'Learn sustainable agriculture practices' },
              { icon: Heart, title: 'Wellness Retreats', description: 'Rejuvenate in peaceful farm settings' },
              { icon: Users, title: 'Family Experiences', description: 'Fun activities for the whole family' },
              { icon: Shield, title: 'Cultural Immersion', description: 'Experience authentic rural culture' }
            ].map((experience, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <experience.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold mb-2">
                  {experience.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Start Your Farm Adventure?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of travelers who have discovered the joy of authentic farm experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/farmstays" className="btn-secondary">
              Browse Farm Stays
            </Link>
            <Link to="/signup?type=host" className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
              Become a Host
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;