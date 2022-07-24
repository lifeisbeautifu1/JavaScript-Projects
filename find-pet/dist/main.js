(() => {
  'use strict';
  document.querySelector('#pet-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const t = document.querySelector('#animal').value,
      n = document.querySelector('#zip').value;
    if (
      !(function (e) {
        return /^\d{5}(-\d{4})?$/.test(e);
      })(n)
    )
      return void (function (e, t) {
        const n = document.createElement('div');
        (n.className = 'alert alert-danger'),
          n.appendChild(
            document.createTextNode('Please enter a valid zip code!')
          );
        const o = document.querySelector('.container'),
          c = document.querySelector('#pet-form');
        o.insertBefore(n, c),
          setTimeout(() => {
            document.querySelector('.alert').remove();
          }, 3e3);
      })();
    let o;
    fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: 'grant_type=client_credentials&client_id=rCUG16Fo1Ni7oUEPRuL1EePmgNcl6wtXobnBCRR3t24hRLJXjk&client_secret=okNCWPs95q1dfuPSnAFHpVp93z3iNDhNeXWa7yLj',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((e) => e.json())
      .then((e) => {
        o = e.access_token;
      })
      .then(() => {
        fetch(`https://api.petfinder.com/v2/animals?type=${t}&location=${n}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + o,
          },
        })
          .then((e) => e.json())
          .then((e) =>
            (function (e) {
              const t = document.querySelector('#results');
              (t.innerHTML = ''),
                e.forEach((e) => {
                  const n = document.createElement('div');
                  n.classList.add('card', 'card-body', 'mb-3'),
                    (n.innerHTML = `\n    <div class="row">\n        <div class="col-sm-6">\n            <h4>${
                      e.name
                    } (${e.age})</h4>\n            <p class="text-secondary">${
                      e.breeds.primary
                    }</p>\n            <p> ${e.contact.address.city} ${
                      e.contact.address.postcode
                    } ${
                      e.contact.address.state
                    }</p>\n            <ul class="list-group">\n                <li class="list-group-item">\n                    Phone: ${
                      e.contact.phone
                    }\n                </li>\n               ${
                      e.contact.email
                        ? `<li class="list-group-item">\n               Email: ${e.contact.email}\n                </li>`
                        : ''
                    }\n            </ul>\n        </div>\n        <div class="col-sm-6 text-center">\n            ${
                      e.photos.length
                        ? `<img src="${e.photos[0].medium}" class="img-fluid rounded-circle">`
                        : ''
                    }\n        </div>\n    </div>\n    `),
                    t.appendChild(n);
                });
            })(e.animals)
          );
      })
      .catch((e) => console.error(e));
  });
})();
