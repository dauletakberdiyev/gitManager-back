"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const database_1 = __importDefault(require("./src/Support/Config/database"));
const api_1 = __importDefault(require("./src/Support/Routes/api"));
const passport_2 = __importDefault(require("./src/Support/Config/passport"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
(0, passport_2.default)(passport_1.default); // Passport config
const app = (0, express_1.default)();
// Middleware for session and passport
app.use((0, express_session_1.default)({ secret: 'dauletdaulet', resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Routes
app.use('/api', api_1.default);
// Start the server and sync the database
database_1.default.sync().then(() => {
    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000');
    });
});
exports.default = app;
