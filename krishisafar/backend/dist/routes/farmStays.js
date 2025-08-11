"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmStayController_1 = require("../controllers/farmStayController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.get('/', farmStayController_1.getFarmStays);
router.get('/:id', farmStayController_1.getFarmStayById);
// Protected routes
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('host', 'admin'), farmStayController_1.createFarmStay);
router.put('/:id', auth_1.authenticate, (0, auth_1.authorize)('host', 'admin'), farmStayController_1.updateFarmStay);
router.delete('/:id', auth_1.authenticate, (0, auth_1.authorize)('host', 'admin'), farmStayController_1.deleteFarmStay);
// Host-specific routes
router.get('/host/my-farmstays', auth_1.authenticate, (0, auth_1.authorize)('host', 'admin'), farmStayController_1.getHostFarmStays);
exports.default = router;
//# sourceMappingURL=farmStays.js.map