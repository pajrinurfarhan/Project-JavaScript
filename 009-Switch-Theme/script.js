const root = document.documentElement;

if (localStorage.getItem("theme") === "dark") {
  root.classList.add("dark");
}

// Ganti tema + simpan pilihan
function changeTheme() {
  root.classList.toggle("dark");

  if (root.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button");

  button.addEventListener("click", () => {
    const noAnimation = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || noAnimation) {
      changeTheme();
      return;
    }

    // Titik pusat lingkaran tengah tombol
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Radius terjauh
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const transition = document.startViewTransition(changeTheme);

    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  });
});
