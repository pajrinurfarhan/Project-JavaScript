const buttons = document.querySelectorAll(".suhu");
const suhuHuruf = document.querySelector(".suhu-huruf");
const inp = document.querySelector(".input");
const submit = document.getElementById("submit");

const hasilC = document.querySelector(".hasil-c");
const hasilF = document.querySelector(".hasil-f");
const hasilK = document.querySelector(".hasil-k");
const hasilR = document.querySelector(".hasil-r");

// Default
let selectedUnit = "C";
suhuHuruf.textContent = "C";
buttons[0].classList.add("active");

// Button satuan ==============================>
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.textContent === "Celcius") selectedUnit = "C";
    else if (btn.textContent === "Fahrenheit") selectedUnit = "F";
    else if (btn.textContent === "Kelvin") selectedUnit = "K";
    else selectedUnit = "R";

    suhuHuruf.textContent = selectedUnit;
  });
});

// Submit ====================================>
submit.addEventListener("click", () => {
  const nilai = parseFloat(inp.value);
  if (isNaN(nilai)) {
    console.log("Isi angka dulu ya");
    return;
  }

  // Ubah ke Celsius
  let c;
  if (selectedUnit === "C") c = nilai;
  else if (selectedUnit === "F") c = ((nilai - 32) * 5) / 9;
  else if (selectedUnit === "K") c = nilai - 273.15;
  else c = (nilai * 5) / 4;

  // Tampilkan semua
  hasilC.textContent = c.toFixed(1);
  hasilF.textContent = ((c * 9) / 5 + 32).toFixed(1);
  hasilK.textContent = (c + 273.15).toFixed(1);
  hasilR.textContent = ((c * 4) / 5).toFixed(1);
});
