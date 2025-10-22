## Instalasi dan Setup
1. backend
    - install dependensi
        cd backend
        npm install

2. setup database
    - buat database baru di mysql dengan nama auth_db
    - jalankan query sql berikut untuk memmbuat table users
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

3. buat file .env
    - Buat file bernama .env di dalam direktori backend/
    - salin dan tempel konfigurasi berikut
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=auth_db
    JWT_SECRET=super_secret_jwt_key_random_long_string

4. jalankan backend di folder backend
    node index.js

5. frontend
    - install dependensi
        buka terminal baru
        cd frontend
        npm install

6. jalankan frontend di folder frontend
    npm run start

7. Menambahkan user baru 
    - Gunakan API client seperti Postman
    - Buka Postman/Insomnia.
    - Buat request baru dengan pengaturan ini:
    Tipe: POST
    URL: http://localhost:5000/api/auth/register
    - Pindah ke tab Body.
    - Pilih opsi raw.
    - Di menu dropdown di sebelahnya, pilih JSON.
    - Di dalam kotak teks, masukkan data user baru Anda:
        {
            "username": "user",
            "password": "password123"
        }
    - Klik tombol Send.

## Tech Stack
1. Frontend
    - React.js
    - TailwindCSS
    - Axios
2. Backend
    - Node.js
    - Express.js
    - mysql2
    - jsonwebtoken
    - bcryptjs
    - cookie-parser
    - cors
    - dotenv
    - express-rate-limit
3. Database
    - mysql

## Arsitektur
Tes-Login/
├── .gitignore
├── README.md
├── docs/
│   └── images/         (folder screnshoot)
│       └── Dashboard Desktop.png
│       └── Dashboard Mobile.png
│       └── Login Desktop.png
│       └── Login Mobile.png
│
├── backend/
│   ├── node_modules/ (Diabaikan oleh Git)
│   ├── routes/
│   │   └── auth.js     (Mengelola semua endpoint API yang terkait dengan autentikasi)
│   ├── .env           (Sangat Penting: Diabaikan oleh Git)
│   ├── db.js       (Menyiapkan dan mengekspor koneksi ke database MySQL)
│   ├── index.js    (Titik masuk utama (entry point) untuk server backend)
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── node_modules/ (Diabaikan oleh Git)
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── assets/
    │   │   └── logo-bg.webp
    │   ├── App.js   (Komponen React utama yang berisi semua logika UI, termasuk form login, state pengguna, dan toggle dark mode.)
    │   ├── index.css (File CSS utama tempat arahan (directives) Tailwind CSS diimpor)
    │   └── index.js
    ├── package.json
    ├── package-lock.json
    └── tailwind.config.js  (File konfigurasi kustom untuk Tailwind CSS)

## Screenshot
- Login Desktop
![Login Desktop](docs/images/Login%20Desktop.png)
- Dashboard Desktop
![Dashboard Desktop](docs/images/Dashboard%20Desktop.png)
- Login Mobile
![Login Mobile](docs/images/Login%20Mobile.png)
- Dashboard Mobile
![Dashboard Mobile](docs/images/Dashboard%20Mobile.png)