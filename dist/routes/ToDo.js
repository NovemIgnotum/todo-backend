"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ToDo_1 = __importDefault(require("../controllers/ToDo"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/Create/', ToDo_1.default.createToDo);
router.get('/ReadAll/', ToDo_1.default.readAllToDo);
router.get('/ReadOne/:id', ToDo_1.default.readOneToDo);
router.get('/ReadAllByUser/:id', ToDo_1.default.readAllToDoByUser);
router.put('/AddTask/:id', ToDo_1.default.addTask);
router.put('/modifyParticipant/:id', ToDo_1.default.modifyParticipant);
router.put('/updateTask/:id', ToDo_1.default.updateTodo);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvVG9Eby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtEQUE2QztBQUM3QyxzREFBOEI7QUFFOUIsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsY0FBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLGNBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGNBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQyxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLGNBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsY0FBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXJELGtCQUFlLE1BQU0sQ0FBQyJ9