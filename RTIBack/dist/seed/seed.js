"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assignment_1 = require("./Assignment");
const User_1 = require("./User");
function seed() {
    User_1.seedAllUsers();
    Assignment_1.seedAllAssignments();
}
exports.default = seed;
//# sourceMappingURL=seed.js.map