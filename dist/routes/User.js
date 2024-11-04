"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const router = express_1.default.Router();
router.post('/Create/', User_1.default.createUser);
router.get('/ReadAll/', User_1.default.readAllUser);
router.get('/ReadOne/:id', User_1.default.readOneUser);
router.patch('/Update/:id', User_1.default.updateUser);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QjtBQUM5QiwrREFBNkM7QUFFN0MsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFbkQsa0JBQWUsTUFBTSxDQUFDIn0=