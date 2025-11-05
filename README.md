# UTS

## NAMA : Althaf Afif Faiz
## NIM : 312410404
## Kelas : TI.24.A.3

# File Program :


# Book Online Project

## 1. Deskripsi Proyek
**Book Online Project** adalah sebuah aplikasi berbasis web yang dirancang untuk melakukan pemesanan buku secara online.  
Proyek ini dikembangkan menggunakan **HTML**, **CSS**, dan **JavaScript** tanpa backend database, dengan tujuan memberikan simulasi sistem e-commerce sederhana.  
Melalui proyek ini, pengguna dapat melakukan login, melihat daftar buku, menambah pesanan, melakukan checkout, serta melacak status pesanan.

---

## 2. Tujuan Pembuatan
Tujuan dari pembuatan proyek ini adalah:
1. Menerapkan konsep dasar **pengembangan web frontend** menggunakan HTML, CSS, dan JavaScript.  
2. Membuat sistem pemesanan sederhana tanpa menggunakan server-side atau database.  
3. Memberikan simulasi interaksi pengguna dengan sistem berbasis data lokal.  
4. Melatih kemampuan pengelolaan file, struktur proyek, dan logika JavaScript.  

---

## 3. Teknologi yang Digunakan
| Komponen | Teknologi |
|-----------|------------|
| **Bahasa Pemrograman** | HTML, CSS, JavaScript |
| **Editor / IDE** | Visual Studio Code |
| **Metode Penyimpanan Data** | Objek dan array JavaScript (data lokal) |
| **Desain Tampilan** | CSS murni (tanpa framework) |

---

## 4. Struktur Folder Proyek
Struktur direktori proyek adalah sebagai berikut:

```
book_online_project/
│
├── login.html
├── dashboard.html
├── stok.html
├── checkout.html
├── tracking.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── data.js
│   └── app.js
│
└── img/
    ├── logobo.png
    ├── kepemimpinan.jpg
    ├── manajemen_keuangan.jpg
    ├── mikrobiologi.jpg
    ├── paud_perkembangan.jpeg
    └── pengantar_komunikasi.jpg
```

---

## 5. Penjelasan Setiap File

### **1. login.html**
Berfungsi sebagai halaman awal tempat pengguna melakukan login.  
File ini menampilkan form berisi input username dan password, serta tombol login yang akan memanggil fungsi verifikasi dari `app.js`.

---

### **2. dashboard.html**
Halaman utama yang menampilkan daftar buku.  
Data buku diambil dari file `data.js` dan ditampilkan secara dinamis menggunakan fungsi JavaScript di `app.js`.

---

### **3. stok.html**
Halaman untuk pengelolaan stok buku oleh admin.  
Melalui halaman ini, admin dapat menambah, menghapus, atau memperbarui jumlah stok buku menggunakan logika pada `app.js`.

---

### **4. checkout.html**
Berfungsi untuk proses pembelian buku.  
Menampilkan buku yang dipilih pengguna, menghitung total harga, dan mengonfirmasi pembelian sebelum diarahkan ke halaman pelacakan.

---

### **5. tracking.html**
Menampilkan status pengiriman buku, seperti “diproses”, “dikirim”, atau “selesai”.  
Data status diambil dari `data.js` dan ditampilkan secara dinamis melalui JavaScript.

---

### **6. css/style.css**
Mengatur tampilan visual seluruh halaman — termasuk warna, tata letak, font, serta desain tombol dan gambar agar lebih menarik dan konsisten.

---

### **7. js/data.js**
Berisi data dummy berupa daftar buku dan pengguna yang disimpan dalam array JavaScript.  
File ini berfungsi sebagai database lokal untuk simulasi data.

---

### **8. js/app.js**
File utama yang mengatur logika aplikasi.  
Mencakup fungsi login, manipulasi data buku, checkout, pelacakan pesanan, dan pembaruan stok.

---

## 6. Alur Kerja Program
1. Pengguna membuka **login.html** dan masuk ke sistem menggunakan akun yang telah ditentukan.  
2. Setelah login berhasil, pengguna diarahkan ke **dashboard.html** untuk melihat dan memilih buku.  
3. Buku yang dipilih akan dikonfirmasi di **checkout.html**.  
4. Setelah pembelian, pengguna dapat melihat status pengiriman di **tracking.html**.  
5. Admin dapat memperbarui stok melalui **stok.html**.  

---

## 7. Cara Menjalankan Program
1. Unduh atau clone repository ini ke komputer Anda.  
2. Buka folder proyek menggunakan text editor seperti **Visual Studio Code**.  
3. Jalankan file **login.html** menggunakan browser (misalnya Chrome atau Edge).  
4. Lakukan login, lalu coba fitur-fitur lain seperti dashboard, checkout, dan tracking.  

---

## 8. Kesimpulan
Proyek **Book Online Project** berhasil menunjukkan implementasi dasar dari sistem pemesanan online menggunakan bahasa frontend murni.  
Meskipun tidak menggunakan backend atau database nyata, proyek ini sudah menggambarkan alur kerja e-commerce sederhana dan dapat dikembangkan lebih lanjut menjadi aplikasi yang lebih kompleks.  

---
