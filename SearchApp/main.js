document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

const clearSearchText = (event) => {
  event.preventDefault();
  document.getElementById('search').value = '';
  const clear = document.getElementById('clear');
  clear.classList.add('none');
  clear.classList.remove('flex');
  document.getElementById('search').focus();
};

const clearPushListener = (e) => {
  if (e.key == 'Enter' || e.key == ' ') {
    e.preventDefault();
    document.getElementById('clear').click();
    document.getElementById('searchBar');
  }
};

const initApp = () => {
  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearchText);
  clear.addEventListener('keydown', clearPushListener);
  const search = document.getElementById('search');
  search.addEventListener('input', showClearTextButton);
};

const submitTheSearch = (e) => {
  e.preventDefault();
  document.getElementById('searchResults').innerHTML = '';
  document.getElementById('search').focus();
  processTheSearch();
};

const showClearTextButton = () => {
  const search = document.getElementById('search');
  const clear = document.getElementById('clear');
  if (search.value.length) {
    clear.classList.remove('none');
    clear.classList.add('flex');
  } else {
    clear.classList.remove('flex');
    clear.classList.add('none');
  }
};
const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById('search').value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');
  return searchTerm;
};

const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchTerm(searchTerm);

  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

const getWikiSearchTerm = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);

  return searchString;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 65;
  else if (width >= 414 && width < 1400) maxChars = 100;
  else maxChars = 130;
  return maxChars;
};

const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (!searchTerm) return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) {
    buildSearchResults(resultArray);
  }
  setStatsLine(resultArray.length);
};

const clearStatsLine = () => {
  document.getElementById('stats').textContent = '';
};

const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById('stats');
  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statLine.textContent = 'Sorry, no results.';
  }
};

const buildSearchResults = (resultArray) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultsContents = document.createElement('div');
    resultsContents.classList.add('resultContents');
    if (result.img) {
      const resultImage = createResultImage(result);
      resultsContents.append(resultImage);
    }
    const resultText = createResultText(result);
    resultsContents.append(resultText);
    resultItem.append(resultsContents);
    const searchResults = document.getElementById('searchResults');
    searchResults.append(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';
  resultTitle.append(link);
  resultItem.append(resultTitle);
  return resultItem;
};

const createResultImage = (result) => {
  const resultImage = document.createElement('div');
  resultImage.classList.add('resultImage');

  const img = document.createElement('img');
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
};

const createResultText = (result) => {
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('resultDescription');
  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
};

const requestData = async (searchString) => {
  try {
    const res = await fetch(searchString);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
};

const processWikiResults = (results) => {
  const resultArray = [];
  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty('thumbnail')
      ? results[key].thumbnail.source
      : null;
    const item = {
      id,
      title,
      img,
      text,
    };
    resultArray.push(item);
  });
  return resultArray;
};
