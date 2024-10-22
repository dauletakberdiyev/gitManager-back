"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// GitHub OAuth login route
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
// GitHub OAuth callback route
router.get('/callback', passport_1.default.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/api/dashboard'); // Redirect after successful login
});
// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});
exports.default = router;
