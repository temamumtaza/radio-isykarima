# Blueprint Aplikasi Web "Radio Isy Karima"

---

## 1. Tujuan Aplikasi
Aplikasi web sederhana yang dapat di-install di home screen iOS (PWA), hanya untuk memutar radio Isy Karima dengan tampilan minimalis, dark, dan estetik.

---

## 2. Fitur Utama

1. **Play/Stop Radio**
   - Tombol untuk memulai dan menghentikan streaming radio.
   - Streaming dari: `https://ssg.streamingmurah.com:8406/stream.mp3`

2. **Pengatur Volume**
   - Slider atau tombol untuk mengatur volume audio.

3. **Tampilan Estetik**
   - Background gelap (dark mode) dengan efek blur.
   - Hero section bertuliskan "Radio Isy Karima".
   - Tombol player (play/stop, volume) di bawah hero.

4. **PWA (Progressive Web App)**
   - Bisa di-install ke home screen iOS/Android.
   - Memiliki manifest.json dan service worker minimal.

---

## 3. Struktur Halaman

```
+------------------------------------------------------+
| [Background dark + blur]                             |
|                                                      |
|   [Hero: "Radio Isy Karima"]                        |
|                                                      |
|   [Tombol Play/Stop]   [Slider Volume]               |
|                                                      |
+------------------------------------------------------+
```

---

## 4. Stack Teknologi

- **Frontend:** HTML, CSS (Tailwind/Vanilla/SCSS), JavaScript (Vanilla/React)
- **PWA:** manifest.json, service worker (optional, untuk offline shell)
- **Audio:** Native HTML5 `<audio>` API

---

## 5. Langkah Implementasi

1. **Setup Project**
   - Inisialisasi project (pilih vanilla JS atau React, sesuai preferensi).
   - Setup struktur folder.

2. **Buat UI**
   - Hero section dengan judul.
   - Tombol play/stop.
   - Slider volume.
   - Styling dark + blur.

3. **Integrasi Audio**
   - Tambahkan elemen `<audio>` dengan source radio.
   - Kontrol play/pause dan volume via JS.

4. **PWA Support**
   - Tambahkan manifest.json (icon, name, start_url, display: standalone).
   - Tambahkan service worker (optional, untuk cache shell).

5. **Testing**
   - Uji di browser dan install ke home screen iOS/Android.
   - Pastikan audio berjalan di background.

---

## 6. Contoh User Flow

1. User buka web app di browser.
2. User klik "Add to Home Screen".
3. User buka dari home screen, lihat hero "Radio Isy Karima".
4. User tekan play → radio menyala.
5. User atur volume sesuai keinginan.
6. User tekan stop → radio berhenti.

---

## 7. Catatan

- Tidak perlu fitur login, playlist, atau fitur lain.
- Fokus pada performa ringan dan UX sederhana.
- Pastikan audio autoplay di iOS perlu interaksi user (play button).
