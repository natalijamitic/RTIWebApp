"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assignment_1 = require("./Assignment");
const User_1 = require("./User");
const Notification_1 = require("./Notification");
const DoneProject_1 = require("./DoneProject");
const OfferedProject_1 = require("./OfferedProject");
function seed() {
    User_1.seedAllUsers();
    Assignment_1.seedAllAssignments();
    Notification_1.seedAllNotifications();
    DoneProject_1.seedAllDoneProjects();
    OfferedProject_1.seedAllOfferedProjects();
}
exports.default = seed;
//# sourceMappingURL=seed.js.map