"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const toDoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    task: [
        {
            _id: { type: String, required: false },
            name: { type: String, required: false },
            description: { type: String, required: false },
            isDone: { type: Boolean, required: false },
            dueDate: { type: Date, required: false },
            user: { type: [String], required: false }
        }
    ]
});
const ToDo = (0, mongoose_1.model)('ToDo', toDoSchema);
exports.default = ToDo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9Eby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVG9Eby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUd6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGlCQUFNLENBQVE7SUFDakMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3ZDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxJQUFJLEVBQUU7UUFDRjtZQUNJLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUN0QyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDdkMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO1lBQzlDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUMxQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDeEMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtTQUM1QztLQUNKO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxJQUFJLEdBQUcsSUFBQSxnQkFBSyxFQUFRLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5QyxrQkFBZSxJQUFJLENBQUMifQ==