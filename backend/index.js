import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit (dalam milidetik)
    max: 5, // Batasi setiap IP hingga 5 percobaan login
    message: { message: "Terlalu banyak percobaan login dari IP ini, silakan coba lagi setelah 1 menit" },
    standardHeaders: true, // Kirim info rate limit di header 'RateLimit-*'
    legacyHeaders: false, // Nonaktifkan header 'X-RateLimit-*'
});


// Middleware
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true // PENTING agar cookie bisa dikirim
}));
app.use(express.json()); // Untuk parsing body JSON
app.use(cookieParser()); // Untuk parsing cookie

app.use("/api/auth", authLimiter);

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});