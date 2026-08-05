import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import cors from 'cors';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

app.use(cors({
  origin:'http://localhost:5000',
  credentials:true,
}));

app.use(express.json());

// Change this:
app.listen(4000, () => {
  console.log('Server running on port 4000');
});

// To exactly this:
app.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000 (accessible from outside the container)');
});