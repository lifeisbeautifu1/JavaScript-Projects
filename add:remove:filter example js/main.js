const item = document.querySelector("#item");
const itemList = document.querySelector("#items");

document
  .querySelector('input[type="submit"]')
  .addEventListener("click", function (e) {
    e.preventDefault();

    const li = document.createElement("li");

    li.className = "list-group-item";

    li.appendChild(document.createTextNode(item.value));

    const btn = document.createElement("button");
    btn.className = "btn btn-danger btn-sm float-right delete";
    btn.appendChild(document.createTextNode("X"));

    li.appendChild(btn);

    itemList.appendChild(li);
  });

itemList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    itemList.removeChild(e.target.parentNode);
  }
});

document.querySelector("#filter").addEventListener("keyup", function (e) {
  const value = e.target.value.toLowerCase();
  console.log(value);
  document.querySelectorAll("li").forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().indexOf(value) === -1) {
      item.style.display = "none";
    } else item.style.display = "block";
  });
});
