const quotes = [
  {
    nama: "- Fauzi",
    kata: '"Mungkin sudah waktunya kamu menerima dirimu apa adanya. Kamu cukup menjadi apa adanya, ajarilah dirimu menerima keadaan tanpa membenci kanyataan"',
  },
  {
    nama: "- Depp?",
    kata: '"Hidup itu ibarat catur, jika kamu tidak pandai bermain maka kamu akan dipermainkan"',
  },
  {
    nama: "- Dika",
    kata: '"Sesuatu akan tampak berharga, setelah kamu mencari, dan tak menemukannya lagi"',
  },
  {
    nama: "- Burhan",
    kata: '"Berharap adalah seni melukis luka"',
  },
  {
    nama: "- Ilham",
    kata: '"Lebih baik menerobos hujan daripada berteduh ditempat yang salah"',
  },
  {
    nama: "- Agus",
    kata: '"Manusia adalah mahkluk yang tidak bisa memahami satu sama lain, sebelum mereka merasakan penderitaan yang sama"',
  },
  {
    nama: "- Manyin",
    kata: '"Lantas mana yang lebih dingin, hujan disertai angin atau harapan yang sebatas ingin?"',
  },
  {
    nama: "- Udin",
    kata: '"Patah hati terhebat ketika kita meminta kepada tuhan untuk melupakan bukan untuk disatukan"',
  },
  {
    nama: "- Asep",
    kata: '"Buka takut kehilangan, namun takut tak bisa melupakan"',
  },
];

const quote = document.querySelector(".quote-wrapp");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
  const angkaRandom = Math.random() * quotes.length;
  const angka = Math.floor(angkaRandom);

  const hasil = quotes[angka];
  quote.innerHTML = hasil.kata + "<br>" + hasil.nama;
});
