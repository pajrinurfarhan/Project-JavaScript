// const inputText = document.querySelector(".input-text");
// const inputHarga = document.querySelector(".input-harga");
// const inputDiskon = document.querySelector(".input-diskon");
// const submit = document.querySelector(".submit");
// const hasil = document.querySelector(".hasil");
// const hNama = document.querySelector(".nama");
// const hHarga = document.querySelector(".harga");
// const hTotal = document.querySelector(".total");

// // Accounting otomatis
// const formatRibuan = (angka) => {
//   return angka.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// };

// // hapus titik: "1.000.000" -> 1000000
// const ambilAngka = (teks) => Number(teks.replace(/\./g, ""));

// inputHarga.addEventListener("input", () => {
//   inputHarga.value = formatRibuan(inputHarga.value);
// });

// // "10" -> "10%", batas maksimal 100
// const formatPersen = (teks) => {
//   let angka = teks.replace(/\D/g, "");
//   if (angka === "") return "";
//   if (Number(angka) > 100) angka = "100";
//   return angka + "%";
// };

// inputDiskon.addEventListener("input", () => {
//   inputDiskon.value = formatPersen(inputDiskon.value);

//   // taruh kursor sebelum tanda %, supaya mengetik tetap lancar
//   const posisi = inputDiskon.value.length - 1;
//   inputDiskon.setSelectionRange(posisi, posisi);
// });

// // Logika matematika
// submit.addEventListener("click", () => {
//   hasil.classList.add("tampil");

//   const nama = inputText.value;
//   const harga = parseFloat(inputHarga.value);
//   const diskon = parseFloat(inputDiskon.value);

//   const potongan = (harga * diskon) / 100;
//   const total = harga - potongan;

//   hNama.textContent = `Nama Produk: ${nama}`;
//   hHarga.textContent = `Harga Produk: ${rupiah(harga1)}`;
//   hTotal.textContent = `Total Bayar: ${rupiah(total)}`;
// });

// const rupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

const inputText = document.querySelector(".input-text");
const inputHarga = document.querySelector(".input-harga");
const inputDiskon = document.querySelector(".input-diskon");
const submit = document.querySelector(".submit");
const hasil = document.querySelector(".hasil");
const hNama = document.querySelector(".nama");
const hHarga = document.querySelector(".harga");
const hTotal = document.querySelector(".total");

// Accounting otomatis
const formatRibuan = (angka) => {
  return angka.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// hapus semua selain angka: "1.000.000" -> 1000000, "10%" -> 10
const ambilAngka = (teks) => Number(teks.replace(/\D/g, ""));

inputHarga.addEventListener("input", () => {
  inputHarga.value = formatRibuan(inputHarga.value);
});

// "10" -> "10%", batas maksimal 100
const formatPersen = (teks) => {
  let angka = teks.replace(/\D/g, "");
  if (angka === "") return "";
  if (Number(angka) > 100) angka = "100";
  return angka + "%";
};

inputDiskon.addEventListener("input", () => {
  inputDiskon.value = formatPersen(inputDiskon.value);

  // taruh kursor sebelum tanda %, supaya mengetik tetap lancar
  const posisi = inputDiskon.value.length - 1;
  inputDiskon.setSelectionRange(posisi, posisi);
});

const rupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// Logika matematika
submit.addEventListener("click", () => {
  hasil.classList.add("tampil");

  const nama = inputText.value;
  const harga = ambilAngka(inputHarga.value);
  const diskon = ambilAngka(inputDiskon.value);

  const potongan = (harga * diskon) / 100;
  const total = harga - potongan;

  hNama.textContent = `Nama Produk: ${nama}`;
  hHarga.textContent = `Harga Produk: ${rupiah(harga)}`;
  hTotal.textContent = `Total Bayar: ${rupiah(total)}`;
});
