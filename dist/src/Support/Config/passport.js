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
exports.default = default_1;
const passport_github2_1 = require("passport-github2");
const UserService_1 = __importDefault(require("../Services/UserService"));
function default_1(passport) {
    passport.use(new passport_github2_1.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield UserService_1.default.findByGitHubId(profile.id);
            // If user does not exist, create a new one
            if (!user) {
                user = yield UserService_1.default.createUser(profile.id, profile.username, accessToken);
            }
            else {
                // If user exists, update the access token
                UserService_1.default.updateAccessToken(user, accessToken);
            }
            return done(null, user);
        }
        catch (err) {
            return done(err, null);
        }
    })));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserService_1.default.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err, null);
        }
    }));
}
