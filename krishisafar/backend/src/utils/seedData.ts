import User from '../models/User';
import FarmStay from '../models/FarmStay';
import connectDB from '../config/database';

const sampleUsers = [
  {
    name: 'Ravi Kumar',
    email: 'ravi@krishisafar.com',
    password: 'password123',
    phone: '+91-9876543210',
    userType: 'host',
    verificationStatus: 'verified',
    bio: 'Organic farmer with 20 years of experience. Welcome to our sustainable farm!'
  },
  {
    name: 'Priya Sharma',
    email: 'priya@krishisafar.com',
    password: 'password123',
    phone: '+91-9876543211',
    userType: 'host',
    verificationStatus: 'verified',
    bio: 'Yoga instructor and farm owner. Experience wellness in nature.'
  },
  {
    name: 'Amit Traveler',
    email: 'amit@gmail.com',
    password: 'password123',
    phone: '+91-9876543212',
    userType: 'traveler',
    verificationStatus: 'verified'
  }
];

const sampleFarmStays = [
  {
    name: 'Green Valley Organic Farm',
    location: {
      address: '123 Farm Road, Village Kothur',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560062'
    },
    description: 'Escape to our 10-acre organic farm just 30km from Bangalore. Experience sustainable farming, fresh organic produce, and peaceful countryside living. Perfect for families and nature lovers.',
    pricePerNight: 2500,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Kitchen', 'Organic Garden', 'Farm Animals', 'Bonfire Area'],
    experienceTypes: ['Organic Farm', 'Family Friendly', 'Wellness'],
    photos: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1544435253-221ad2dcf67d?w=800',
      'https://images.unsplash.com/photo-1574691250077-a8a2a6e5d937?w=800'
    ],
    status: 'active',
    averageRating: 4.8,
    totalReviews: 24
  },
  {
    name: 'Sunrise Yoga Retreat Farm',
    location: {
      address: 'Yoga Valley, Mysore Road',
      city: 'Mysore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '570001'
    },
    description: 'Join us for a transformative experience combining yoga, meditation, and farm life. Our retreat offers daily yoga sessions, organic meals, and beautiful sunrise views over the mountains.',
    pricePerNight: 3200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Yoga Space', 'Organic Garden', 'Pool', 'Hiking Trails'],
    experienceTypes: ['Yoga Retreat', 'Wellness', 'Adventure'],
    photos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      'https://images.unsplash.com/photo-1593810451633-7a8d71ad1e03?w=800'
    ],
    status: 'active',
    averageRating: 4.9,
    totalReviews: 18
  },
  {
    name: 'Heritage Farm & Cultural Stay',
    location: {
      address: 'Heritage Village, Hampi Road',
      city: 'Hospet',
      state: 'Karnataka',
      country: 'India',
      zipCode: '583201'
    },
    description: 'Experience traditional Indian village life in our heritage farm. Learn about local culture, participate in farming activities, and enjoy authentic local cuisine prepared with farm-fresh ingredients.',
    pricePerNight: 1800,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['Kitchen', 'Farm Animals', 'Bicycle Rental', 'Bonfire Area', 'Cultural Activities'],
    experienceTypes: ['Cultural Immersion', 'Farm Experience', 'Family Friendly'],
    photos: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
      'https://images.unsplash.com/photo-1580130544401-370ad7e5b870?w=800',
      'https://images.unsplash.com/photo-1586377314897-51b5ac47fbe5?w=800'
    ],
    status: 'active',
    averageRating: 4.6,
    totalReviews: 32
  }
];

export const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await FarmStay.deleteMany({});
    
    console.log('🧹 Cleared existing data');
    
    // Create users
    const users = await User.create(sampleUsers);
    console.log('👥 Created sample users');
    
    // Create farm stays with host references
    const farmStaysWithHosts = sampleFarmStays.map((farmStay, index) => ({
      ...farmStay,
      host: users[index < 2 ? index : 0]._id // First two farm stays for first two hosts
    }));
    
    await FarmStay.create(farmStaysWithHosts);
    console.log('🏡 Created sample farm stays');
    
    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Test Credentials:');
    console.log('Host 1: ravi@krishisafar.com / password123');
    console.log('Host 2: priya@krishisafar.com / password123');
    console.log('Traveler: amit@gmail.com / password123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit();
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}