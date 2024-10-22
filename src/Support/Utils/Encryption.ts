import crypto from 'crypto';

const algorithm = 'aes-256-cbc'; // Encryption algorithm
const secretKey = process.env.ENCRYPTION_KEY as string; // 32-character secret key
const iv = crypto.randomBytes(16); // Initialization vector

// Encrypt function
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`; // Store IV with the encrypted value
}

// Decrypt function
export function decrypt(text: string): string {
  const [ivString, encryptedText] = text.split(':');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(ivString, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
