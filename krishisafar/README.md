# KrishiSafar - Farm Stay Booking Platform (MVP)

🌾 **KrishiSafar** is a marketplace connecting urban travelers with authentic farm stays hosted by local farmers. Experience sustainable agriculture, enjoy fresh organic produce, and immerse yourself in rural culture.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start MongoDB (if running locally)
# mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend will be running on `http://localhost:5000`

### 2. Setup Frontend

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies (already done)
npm install

# Start the frontend development server
npm start
```

The frontend will be running on `http://localhost:3000`

## 🎯 MVP Features Included

✅ **Authentication System**
- User registration and login
- JWT-based authentication
- Role-based access (Traveler/Host/Admin)

✅ **Homepage**
- Hero section with search form
- Featured farm stays carousel
- How it works section
- Experience types showcase

✅ **User Management**
- User profiles
- Dashboard (basic)
- Protected routes

✅ **Backend API**
- User authentication endpoints
- Farm stay CRUD operations
- Booking management
- Search and filtering capabilities

✅ **Database Models**
- User model with authentication
- FarmStay model with location and amenities
- Booking model with status tracking
- Sample data seeding

## 🧪 Demo Credentials

Use these credentials to test the application:

**Host Account:**
- Email: `ravi@krishisafar.com`
- Password: `password123`

**Host Account 2:**
- Email: `priya@krishisafar.com`
- Password: `password123`

**Traveler Account:**
- Email: `amit@gmail.com`
- Password: `password123`

## 📁 Project Structure

```
krishisafar/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utilities (data seeding)
│   │   └── index.ts        # Main server file
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/               # React TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Farm Stays
- `GET /api/farmstays` - Get farm stays (with search/filter)
- `GET /api/farmstays/:id` - Get farm stay by ID
- `POST /api/farmstays` - Create farm stay (host only)
- `PUT /api/farmstays/:id` - Update farm stay (host only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/host-bookings` - Get host bookings

## 🎨 Design System

**Colors:**
- Primary: Forest Green (#4a7c59)
- Secondary: Terracotta (#d4a373) 
- Accent: Sage (#c9ada7)
- Background: Cream (#f4f1e9)

**Typography:**
- Headings: Montserrat
- Body: Open Sans

## 🔧 Environment Variables

Backend `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/krishisafar
JWT_SECRET=krishisafar_jwt_secret_key_2024
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify the database name in MONGODB_URI

**Port Already in Use:**
- Backend: Change PORT in .env file
- Frontend: React will prompt to use a different port

**Authentication Issues:**
- Clear browser localStorage
- Check JWT_SECRET in .env file

## 🚧 Next Steps (Full Platform)

The current MVP includes core functionality. The full platform would include:

- **Search & Filtering:** Advanced search with location, dates, amenities
- **Farm Stay Details:** Photo galleries, reviews, booking widget
- **Booking System:** Date selection, payment processing (Stripe)
- **User Dashboards:** Complete traveler and host management
- **Payment Integration:** Stripe for secure payments and payouts
- **Review System:** Post-stay reviews and ratings
- **Maps Integration:** Google Maps for location and nearby attractions
- **Email Notifications:** Booking confirmations and reminders

## 📱 Mobile Responsive

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🤝 Contributing

This is a demonstration project. For production use, consider:
- Adding comprehensive error handling
- Implementing rate limiting
- Setting up monitoring and logging
- Adding automated testing
- Implementing CI/CD pipeline

---

**Built with:** React, TypeScript, Node.js, Express, MongoDB, Tailwind CSS

**Demo Ready:** ✅ The application is fully functional and ready for demonstration!