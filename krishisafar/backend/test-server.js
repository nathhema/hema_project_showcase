const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'KrishiSafar API is running!',
    timestamp: new Date().toISOString()
  });
});

// Test API routes
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working without database',
    data: {
      sampleFarmStays: [
        {
          id: '1',
          name: 'Green Valley Organic Farm',
          location: { city: 'Bangalore', state: 'Karnataka' },
          pricePerNight: 2500,
          photos: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'],
          averageRating: 4.8,
          totalReviews: 24,
          experienceTypes: ['Organic Farm', 'Family Friendly']
        },
        {
          id: '2',
          name: 'Sunrise Yoga Retreat Farm',
          location: { city: 'Mysore', state: 'Karnataka' },
          pricePerNight: 3200,
          photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
          averageRating: 4.9,
          totalReviews: 18,
          experienceTypes: ['Yoga Retreat', 'Wellness']
        }
      ]
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test Server running on port ${PORT}`);
  console.log(`📍 Test URL: http://localhost:${PORT}/health`);
  console.log(`📍 API Test: http://localhost:${PORT}/api/test`);
});