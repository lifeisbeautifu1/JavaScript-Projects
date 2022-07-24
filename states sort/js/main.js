const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

// Search states.json and filter it

const searchStates = async (searchText) => {
  const res = await fetch('../data/states.json');

  const states = await res.json();

  //   Get matches to current text input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (search.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-3">
        <h4>
        ${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span>
        </h4>
        <small> Lat: ${match.lat} / Long: ${match.long}</small>
         </div>
        `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value));