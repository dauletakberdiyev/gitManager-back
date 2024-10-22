"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
// Prefix `/auth` for authentication-related routes
router.use('/auth', auth_1.default);
router.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/auth/github');
    }
    const user = req.user;
    res.send(`Hello, ${user.name}`);
});
exports.default = router;
