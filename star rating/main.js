const ratings = {
  sony: 4.7,
  samsung: 4.5,
  vizio: 2.3,
  phillips: 3.4,
  panasonic: 3.7,
};

let product;

const productSelect = document.querySelector('.product-select');
const ratingSelect = document.querySelector('.rating-select');
productSelect.addEventListener('change', (e) => {
  ratingSelect.disabled = false;
  product = e.target.value;
  ratingSelect.value = ratings[product];
});

ratingSelect.addEventListener('blur', (e) => {
  ratings[product] = ratingSelect.value;
  console.log(ratings);
  updateRating();
});

document.addEventListener('DOMContentLoaded', updateRating);

function updateRating() {
  for (let rating in ratings) {
    const r = `${Math.floor((ratings[rating] / 5.0) * 10) * 10}%`;
    document.querySelector(`.${rating} .stars-inner`).style.width = r;

    document.querySelector(`.${rating} .number-rating`).innerHTML =
      ratings[rating];
  }
}
