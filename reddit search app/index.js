const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

const redditSearch = async (searchTerm, searchLimit, sortBy) => {
  const result = await fetch(
    `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err));
  return result;
};

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  const searchLimit = document.querySelector('#limit').value;

  searchInput.value = '';

  const res = await redditSearch(searchTerm, searchLimit, sortBy);

  let output = '<div class="card-columns">';
  res.forEach((post) => {
    console.log(post);
    const image = post.preview
      ? post.preview.images[0].source.url
      : 'https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/KI6HEIRY6ZGA7JD3ZZYEHDR6TA.jpg';
    output += `
    <div class="card">
        <img class="card-img-top" src="${image}">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            } target="_blank" class="btn btn-primary">Read More</a>
            <hr>
            <span class="badge badge-secondary">Subreddit: 
            ${post.subreddit}
            </span>
            <span class="badge badge-dark">Score: 
            ${post.score}
            </span>
        </div>
    </div>`;
  });
  output += '</div>';
  document.querySelector('#results').innerHTML = output;

  if (searchTerm === '') {
    showMessage('Please add a search term', 'alert-danger');
  }
});

function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const searchContainer = document.querySelector('#search-container');
  const search = document.querySelector('#search');
  searchContainer.insertBefore(div, search);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}

function truncateText(text, limit) {
  const shortened = text.indexOf(' ', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
