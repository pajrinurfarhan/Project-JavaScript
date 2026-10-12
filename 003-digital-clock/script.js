setInterval(() => {
  const sekarang = new Date();
  const jam = sekarang.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  document.querySelector(".wrap-clock").textContent = jam;
}, 1000);
