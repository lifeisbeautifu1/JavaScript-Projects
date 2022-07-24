document.querySelector(".cards").style.display = "none";

document.querySelector(".input").addEventListener("input", function (e) {
  document.querySelector(".cards").style.display = "";

  const input = e.target.value;

  const grams = document.querySelector(".green");
  grams.innerHTML = `Grams: <br> ${input * 453.592} g`;

  const kilograms = document.querySelector(".blue");
  kilograms.innerHTML = `Kilograms: <br> ${input * 0.453592} kg`;

  const ounce = document.querySelector(".red");
  ounce.innerHTML = `Ounce: <br> ${input * 16}`;
});
