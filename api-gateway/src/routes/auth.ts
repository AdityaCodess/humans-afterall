import { Router } from 'express';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../utils/mailer';

const router = Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

// 1. REQUEST OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate 6-digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  // Upsert user and record OTP
  await prisma.user.upsert({
    where: { email },
    update: { otpCode: code, otpExpiry: expiry },
    create: { email, otpCode: code, otpExpiry: expiry, authMethod: 'OTP' },
  });

  await sendOtpEmail(email, code);

  return res.status(200).json({ message: 'OTP sent successfully' });
});

// 2. VERIFY OTP
router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.otpCode !== code) {
    return res.status(401).json({ error: 'Invalid verification code' });
  }

  if (user.otpExpiry && new Date() > user.otpExpiry) {
    return res.status(401).json({ error: 'Verification code has expired' });
  }

  // Clear OTP fields after successful login
  await prisma.user.update({
    where: { email },
    data: { otpCode: null, otpExpiry: null },
  });

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d',
  });

  // Set HTTP-Only Cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: 'Authentication successful', userId: user.id });
});

export default router;