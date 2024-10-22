"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Models/User"));
const Encryption_1 = require("../Utils/Encryption");
class UserService {
    // Find a user by GitHub ID
    findByGitHubId(githubId) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findOne({ where: { github_id: githubId } });
        });
    }
    // Create a new user
    createUser(githubId, username, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedToken = (0, Encryption_1.encrypt)(accessToken); // Encrypt the access token
            return User_1.default.create({
                github_id: githubId,
                name: username,
                github_access_token: encryptedToken,
                is_active: true, // Set user as active upon registration
            });
        });
    }
    // Update a user's access token
    updateAccessToken(user, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            user.github_access_token = (0, Encryption_1.encrypt)(accessToken); // Encrypt before saving
            return user.save();
        });
    }
    // Find a user by ID (for deserialization)
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.default.findByPk(id);
        });
    }
}
exports.default = new UserService();
