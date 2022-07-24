import generateJoke from './generateJoke';
import { isValidZip, showAlert } from './validate';

const petForm = document.querySelector('#pet-form');

petForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const animal = document.querySelector('#animal').value;

  const zip = document.querySelector('#zip').value;

  if (!isValidZip(zip)) {
    showAlert('Please enter a valid zip code!', 'danger');
    return;
  }

  // fetch Pets

  let key = 'rCUG16Fo1Ni7oUEPRuL1EePmgNcl6wtXobnBCRR3t24hRLJXjk';
  let secret = 'okNCWPs95q1dfuPSnAFHpVp93z3iNDhNeXWa7yLj';
  let token;

  // get authorization token
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body:
      'grant_type=client_credentials&client_id=' +
      key +
      '&client_secret=' +
      secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      token = data.access_token;
    })
    .then(() => {
      // use token to fetch animals
      fetch(
        `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => showAnimals(data.animals));
    })
    .catch((err) => console.error(err));
});

function showAnimals(pets) {
  const results = document.querySelector('#results');
  results.innerHTML = '';
  pets.forEach((pet) => {
    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
    <div class="row">
        <div class="col-sm-6">
            <h4>${pet.name} (${pet.age})</h4>
            <p class="text-secondary">${pet.breeds.primary}</p>
            <p> ${pet.contact.address.city} ${pet.contact.address.postcode} ${
      pet.contact.address.state
    }</p>
            <ul class="list-group">
                <li class="list-group-item">
                    Phone: ${pet.contact.phone}
                </li>
               ${
                 pet.contact.email
                   ? `<li class="list-group-item">
               Email: ${pet.contact.email}
                </li>`
                   : ``
               }
            </ul>
        </div>
        <div class="col-sm-6 text-center">
            ${
              pet.photos.length
                ? `<img src="${pet.photos[0].medium}" class="img-fluid rounded-circle">`
                : ``
            }
        </div>
    </div>
    `;
    results.appendChild(div);
  });
}
