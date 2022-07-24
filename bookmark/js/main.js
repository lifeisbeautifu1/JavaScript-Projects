// Listen for form submit
document.querySelector('#myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  // Get form values
  const siteName = document.querySelector('#siteName').value;

  const siteURL = document.querySelector('#siteURL').value;

  const bookmark = {
    name: siteName,
    url: siteURL,
  };

  //   Local storage only stores strings!
  if (localStorage.getItem('bookmarks') === null) {
    const bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  e.preventDefault();

  document.querySelector('#myForm').reset();

  fetchBookmarks();
}

// Delete bookmark

function deleteBookmark(url) {
  // Get bookmarks from LocalStorage
  console.log(url);
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (let i = 0; i < bookmarks.length; ++i) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

// Fetch bookmarks

function fetchBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  const bookmarksResults = document.querySelector('#bookmarksResults');

  bookmarksResults.innerHTML = '';

  bookmarks.forEach((bookmark) => {
    bookmarksResults.innerHTML += `<div class="card p-2 mb-3"><h3>${bookmark.name}
     <a class="btn btn-light" target="_blank" href="${bookmark.url}">Visit</a>
     <a class="btn btn-danger" onclick="deleteBookmark('${bookmark.url}')"  href="#">Delete</a>
     </h3></div>`;
  });
}

fetchBookmarks();
