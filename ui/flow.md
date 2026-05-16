## **Summary User Flow & Fitur Ludo Foreplay 18+**

### 1. User Flow (Alur Pengalaman Pengguna)
- **HomePage:** Pemain memilih mode (Romantic, Fun, Naughty), memilih token/avatar, mengisi reward, memilih playlist/music, dan mengaktifkan consent 18+.
- **Player Setup:** Pemain memasukkan nama, memilih token, memastikan reward sudah benar.
- **Game/Board:**
  - Permainan berjalan ala Ludo, dengan petak-petak khusus (Truth/Dare/Foreplay).
  - Saat token mendarat di petak khusus, muncul popup/kartu tantangan.
  - Pemain harus menjalankan tantangan, atau dapat memilih “skip” dengan jumlah limit tertentu.
  - Semua status giliran, skip, histori aksi, jelas ditampilkan.
- **Finish:**  
  - Game selesai saat pemain mencapai home terakhir, atau sewaktu-waktu dengan tombol "Finish Now".
  - Winner/Reward muncul dengan opsi untuk play musik atau lanjut ke aktivitas lainnya.
  - Ada tombol/tampilan “safe word” sepanjang permainan untuk kenyamanan pemain.

---

### 2. Fitur Penting
- **Petak khusus dengan warna/icon berbeda**: Membuat mudah diingat dan interaktif.
- **Action Card (Truth/Dare/Foreplay)**: Popup dengan instruksi random (tidak cepat habis karena databasenya banyak).
- **Mode switch**: Mood visual & list tantangan berubah sesuai mode: Romantic (lembut, lucu), Fun (ceria, kreatif), Naughty (panas/explicit).
- **Reward akhir & musik/play musik**: Memperkaya penutup permainan.
- **Consent, Safe word, dan Kontrol privasi**: Menjaga rasa aman sepanjang sesi.

---

## **Contoh Petak Khusus dan Penempatan di Board**
- **Setiap 5 petak dari start** (petak 5, 10, 15, 20, dst) diberi icon khusus.
- **Beberapa petak kunci** (dekat base lawan/center) juga bisa jadi special tile.
- **Total minimal 8–10 petak khusus** tersebar di papan agar game tidak membosankan & tantangan sering muncul.
- **Visual:** Icon/warna terang:
    - Truth (🔮 warna ungu/soft biru) <!-- TODO: Replace emoji with SVG reference -->
    - Dare (🎭 warna emas/kuning) <!-- TODO: Replace emoji with SVG reference -->
    - Foreplay (❤️‍🔥 warna magenta/glow) <!-- TODO: Replace emoji with SVG reference -->

---

## **Contoh Isi Truth Card (Truth Cards List)**
1. “Apa fantasi terliarmu yang belum pernah kamu lakukan?”
2. “Tempat paling seru untuk bercinta menurut kamu?”
3. “Sebutkan gestur pasangan yang paling bikin kamu bergairah.”
4. “Apa hal paling tabu yang ingin kamu coba?”
5. “Kapan terakhir kamu mimpi erotis? Tentang apa?”
6. “Apa suara atau kalimat yang paling membangkitkan buatmu?”
7. “Apa rahasia kecilmu soal preferensi di ranjang?”
8. “Ceritakan pengalaman foreplay favorit kamu.”
9. “Apa outfit yang membuat kamu paling percaya diri saat intimate?”
10. “Pernah berpikir tentang roleplay? Tema apa yang ingin dicoba?”

---

## **Contoh Isi Dare Card (Dare Cards List)**
1. “Berikan ciuman panas selama satu menit.”
2. "Lakukan striptease singkat untuk pasangan."
3. “Peragakan gaya doggy selama dua menit.”
4. “Beri pijatan sensual di bahu atau punggung selama 3 menit.”
5. “Bisikkan hasrat terliarmu ke telinga pasangan.”
6. “Cium pasangan dari leher ke dada selama satu menit.”
7. “Jilat/menggoda telinga pasangan.”
8. "Pilih posisi yang belum pernah dicoba dan pose selama 2 menit."
9. "Genggam tangan dan tatap pasangan dengan intens selama 60 detik tanpa bicara."
10. "Mainkan lagu favorit pasangan dan ajak dansa sensual dalam 2 menit."
11. "Guling di sofa atau kasur sambil berdekatan (skinship)."
12. "Coba foreplay hanya dengan sentuhan, tanpa kata-kata, selama 90 detik."
13. "Ambil alat bantu (jika ada) dan gunakan dengan santai selama 2 menit."
14. "Posisikan pasangan di atasmu (atau sebaliknya), lakukan goyangan lambat selama 1 menit."
15. "Menirukan adegan favorit dari film dewasa (PG aman), selama semenit."

> **Tips:** Komposisi truth:dare:foreplay = seimbang dalam satu deck agar tidak cepat habis saat di-random, minimal 15–20 card per tipe.

---

## **Contoh Isi Foreplay Action Card (Opsional, jika ingin pisahkan)**
1. “Coba ‘spooning’ selama 2 menit.”
2. “Lakukan oral ringan (bercanda, aman, sesuai consent) selama 1 menit.”
3. “Pilih gaya 69 dan tahan pose (pakaian tetap, hanya pose) selama 1 menit.”
4. “Berikan ‘lap dance’ di pangkuan pasangan.”
5. “Coba teknik ‘edging’ selama 2 menit.”
6. “Tukar posisi lalu berikan rating fantasi satu sama lain.”

---

## **Mekanisme Agar Deck Card Tidak Habis**
- Simpan list tantangan di array, acak dengan shuffle, jika habis di-random ulang (reshuffle).
- Untuk sensasi, card yang sudah pernah muncul ditandai, tidak dipakai lagi hingga semua sudah muncul (baru deck diulang).
- Bisa edit/tambah card sendiri sebelum main (fitur custom deck).

---

### **Penutup**
Game flow, fitur, placement petak khusus dan isi card sudah menyediakan pengalaman foreplay yang mature, playful, dengan replay value tinggi.