import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js"; 

const router = express.Router();

//ENDPOINT REGISTRASI
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek jika username sudah ada
        const [existingUser] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Username sudah digunakan" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Simpan user baru
        await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ message: "User berhasil dibuat" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//ENDPOINT LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari user
        const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        const user = users[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Username atau password salah" });
        }

        // Buat JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token berlaku 1 jam
        );

        // Kirim token sebagai HttpOnly Cookie
        res.cookie("token", token, {
            httpOnly: true, // Tidak bisa diakses oleh JavaScript di client
            secure: process.env.NODE_ENV === "production", // Kirim hanya via HTTPS di produksi
            sameSite: "strict", // Mencegah serangan CSRF
            maxAge: 3600 * 1000 // 1 jam (dalam milidetik)
        });

        // Kirim respon sukses
        res.status(200).json({ message: "Login berhasil", user: { id: user.id, username: user.username } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

//ENDPOINT LOGOUT
router.post("/logout", (req, res) => {
    // Hapus cookie dengan mengeset masa berlakunya ke masa lalu
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // Set kedaluwarsa
        sameSite: "strict"
    });

    res.status(200).json({ message: "Logout berhasil" });
});

export default router;