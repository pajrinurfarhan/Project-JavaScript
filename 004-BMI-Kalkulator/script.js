const beratBadan = document.querySelector(".berat-badan");
const tinggiBadan = document.querySelector(".tinggi-badan");
const hitung = document.querySelector(".submit");
const hasil = document.querySelector(".hasil");

hitung.addEventListener("click", () => {
  // 1. Ambil value dari input, convert ke number
  const berat = parseFloat(beratBadan.value);
  const tinggi = parseFloat(tinggiBadan.value);

  // 2. Validasi: kalau bukan angka / kosong / <= 0 → tampilkan error
  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    hasil.className = "hasil";
    hasil.textContent = "NGISI DOANG LU GA BECUS";
    return;
  }

  // 3. Konversi tinggi cm → meter, lalu hitung BMI
  const tinggiM = tinggi / 100;
  const bmi = berat / (tinggiM * tinggiM);

  // 4. Tentukan kategori + class CSS-nya
  let kategori = "";
  let kelas = "";

  if (bmi < 18.5) {
    kategori = "Kurus";
    kelas = "kurus";
  } else if (bmi < 25) {
    kategori = "Normal";
    kelas = "normal";
  } else if (bmi < 30) {
    kategori = "Gemuk";
    kelas = "gemuk";
  } else {
    kategori = "Obesitas";
    kelas = "obesitas";
  }

  // 5. Tampilkan hasil ke .hasil
  hasil.className = `hasil ${kelas}`;
  hasil.innerHTML = `
    <span class="angka">${bmi.toFixed(1)}</span>
    Kategori: <b>${kategori}</b>
  `;
});

// Bonus: tekan Enter buat hitung
[beratBadan, tinggiBadan].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") hitung.click();
  });
});
