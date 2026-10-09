// --- DOM Elements ---
const angka = document.querySelectorAll(".no");
const tombolOperator = document.querySelectorAll(".op");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".rm");
const jumlah = document.querySelector(".eq");
const display = document.querySelector(".hasil span");

// --- State ---
let currentInput = "";
let firstOperand = null;
let operatorAktif = null; // "*", "/", "-", "+" (buat hitung)
let operatorSimbol = null; // "x", "÷", "-", "+" (buat tampilan)
let tampilan = "";
let baruSelesaiHitung = false; // flag setelah user klik "="

// --- Mapping operator ---
const mapOperator = {
  "÷": "/",
  x: "*",
  "-": "-",
  "+": "+",
};

// --- Update tampilan ---
function updateDisplay() {
  if (tampilan === "") {
    display.textContent = "0";
  } else {
    display.textContent = tampilan;
  }
}

// --- Tombol angka ---
angka.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const text = tombol.textContent.trim();

    // Kalau baru selesai hitung, mulai fresh
    if (baruSelesaiHitung) {
      currentInput = "";
      tampilan = "";
      baruSelesaiHitung = false;
    }

    // Cegah titik dobel
    if (text === "." && currentInput.includes(".")) {
      return;
    }

    currentInput += text;

    // Kalau ada operator aktif, tampilkan: firstOperand + operator + currentInput
    if (operatorSimbol !== null) {
      tampilan = firstOperand + " " + operatorSimbol + " " + currentInput;
    } else {
      tampilan = currentInput;
    }

    updateDisplay();
  });
});

// --- Tombol operator ---
tombolOperator.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    const text = tombol.textContent.trim();

    // Kasus 1: user cuma mau GANTI operator
    // (currentInput kosong tapi udah ada operator aktif)
    if (currentInput === "" && operatorAktif !== null) {
      operatorAktif = mapOperator[text];
      operatorSimbol = text;
      tampilan = firstOperand + " " + operatorSimbol;
      updateDisplay();
      return;
    }

    // Kasus 2: belum masukin angka apapun
    if (currentInput === "") {
      return;
    }

    // Kasus 3: normal — mulai operasi baru
    baruSelesaiHitung = false;

    firstOperand = currentInput;
    currentInput = "";
    operatorAktif = mapOperator[text];
    operatorSimbol = text;

    tampilan = firstOperand + " " + operatorSimbol;
    updateDisplay();
  });
});

// --- Tombol = ---
jumlah.addEventListener("click", () => {
  if (operatorAktif === null || firstOperand === null) {
    return;
  }

  // Kalau user klik "=" tapi belum masukin angka kedua
  if (currentInput === "") {
    return;
  }

  const angka1 = parseFloat(firstOperand);
  const angka2 = parseFloat(currentInput);
  let hasil = 0;

  switch (operatorAktif) {
    case "+":
      hasil = angka1 + angka2;
      break;
    case "-":
      hasil = angka1 - angka2;
      break;
    case "*":
      hasil = angka1 * angka2;
      break;
    case "/":
      if (angka2 === 0) {
        display.textContent = "Error";
        currentInput = "";
        firstOperand = null;
        operatorAktif = null;
        operatorSimbol = null;
        tampilan = "";
        baruSelesaiHitung = false;
        return;
      }
      hasil = angka1 / angka2;
      break;
  }

  currentInput = hasil.toString();
  firstOperand = null;
  operatorAktif = null;
  operatorSimbol = null;
  tampilan = currentInput;
  baruSelesaiHitung = true;
  updateDisplay();
});

// --- Tombol AC (clear all) ---
clear.addEventListener("click", () => {
  currentInput = "";
  firstOperand = null;
  operatorAktif = null;
  operatorSimbol = null;
  tampilan = "";
  baruSelesaiHitung = false;
  updateDisplay();
});

// --- Tombol ⌫ (hapus 1 karakter) ---
remove.addEventListener("click", () => {
  // Kalau lagi ada operator tapi belum ada angka kedua, batalkan
  if (currentInput === "" && operatorSimbol !== null) {
    return;
  }

  // Kalau habis "=", anggap user mau hapus hasil
  baruSelesaiHitung = false;

  currentInput = currentInput.slice(0, -1);

  if (operatorSimbol !== null) {
    tampilan = firstOperand + " " + operatorSimbol + " " + currentInput;
  } else {
    tampilan = currentInput;
  }

  updateDisplay();
});

// --- Inisialisasi ---
updateDisplay();
