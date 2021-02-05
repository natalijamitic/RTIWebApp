"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assignment_1 = require("./Assignment");
const User_1 = require("./User");
const Notification_1 = require("./Notification");
const DoneProject_1 = require("./DoneProject");
const EndProject_1 = require("./EndProject");
const Subject_1 = require("./Subject");
const List_1 = require("./List");
function seed() {
    User_1.seedAllUsers();
    Assignment_1.seedAllAssignments();
    Notification_1.seedAllNotifications();
    DoneProject_1.seedAllDoneProjects();
    EndProject_1.seedAllEndProjects();
    Subject_1.seedAllSubjects();
    List_1.seedAllLists();
}
exports.default = seed;
//# sourceMappingURL=seed.js.map