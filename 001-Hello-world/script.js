const btn = document.querySelector(".button");
const text = document.querySelector(".text");

btn.addEventListener("click", function () {
  btn.style.display = "none";
  text.textContent = "Booooooooooom!";
  setTimeout(function () {
    btn.style.display = "block";
    text.textContent = "";
  }, 3000);
});
