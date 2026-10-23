const password = document.querySelector(".pw");
const copy = document.querySelector(".copy");
const inputR = document.querySelector(".input");
const lgth = document.querySelector(".panjang");
const btn = document.querySelector(".btn");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "1234567890";
const symbols = "!@#$%^&*()_-";

const random = upper + lower + numbers + symbols;

// Defult range ========>
function defaultValue() {
  lgth.textContent = inputR.value;
}
defaultValue();

inputR.addEventListener("input", defaultValue);

// Password ==========>
function generetePass() {
  let pass = "";
  for (let i = 0; i < inputR.value; i++) {
    const index = Math.floor(Math.random() * random.length);
    pass += random[index];
  }
  return pass;
}

// button generate =========>
btn.addEventListener("click", () => {
  password.textContent = generetePass();
});

// Copy ==========>
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(password.textContent);

  copy.classList.replace("fa-regular", "fa-solid");
  copy.classList.replace("fa-clipboard", "fa-check");

  setTimeout(() => {
    copy.classList.replace("fa-solid", "fa-regular");
    copy.classList.replace("fa-check", "fa-clipboard");
  }, 1500);
});
