"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// All booking routes require authentication
router.use(auth_1.authenticate);
// Traveler routes
router.post('/', bookingController_1.createBooking);
router.get('/my-bookings', bookingController_1.getUserBookings);
// Host routes
router.get('/host-bookings', (0, auth_1.authorize)('host', 'admin'), bookingController_1.getHostBookings);
// Shared routes
router.get('/:id', bookingController_1.getBookingById);
router.put('/:id/status', bookingController_1.updateBookingStatus);
exports.default = router;
//# sourceMappingURL=bookings.js.map