"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = process.env.ENCRYPTION_KEY; // 32-character secret key
const iv = crypto_1.default.randomBytes(16); // Initialization vector
// Encrypt function
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`; // Store IV with the encrypted value
}
// Decrypt function
function decrypt(text) {
    const [ivString, encryptedText] = text.split(':');
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(ivString, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
