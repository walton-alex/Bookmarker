// Global variables
const bookmark = document.querySelector('.container__section__input-area');
const bookmarkNameInput = document.querySelector('.container__section__name');
const bookmarkUrlInput = document.querySelector('.container__section__url');
const output = document.querySelector('.container__output');
const displayArea = document.querySelector('.bookmarks');

let bookmarkItems = [];

// Pulls in any saved bookmarks from localstorage
if (localStorage.getItem('Bookmarks')) {
  const readLocalStorage = localStorage.getItem('Bookmarks');
  bookmarkItems = JSON.parse(readLocalStorage);
}

bookmarkItems.forEach(bookmarkInput => {
  document.querySelector('.container__output__name').value = bookmarkInput.sitename;
  document.querySelector('.container__output__url').value = bookmarkInput.siteurl;
  document.querySelector('.container__output').setAttribute('data-unique-number', bookmarkInput.id);
  let outputClone = output.cloneNode(true);
  outputClone.style.display = 'block';
  displayArea.appendChild(outputClone);
});

// Execute function on form submit
bookmark.addEventListener('submit', (e) => {
  e.preventDefault();

  // Capture user input data, and apply them to variables
  let bookmarkSiteName = document.querySelector('.container__section__name').value;
  let bookmarkUrl = document.querySelector('.container__section__url').value;
  let url;

  // Validation of Site Name
  if (bookmarkSiteName.trim() === '') {
    bookmarkNameInput.classList.add('container__section__name--error');
  }

  // Validation of URL - Using Try / Catch
  try {
    url = new URL(bookmarkUrl);
  } catch(error) {
    bookmarkUrlInput.classList.add('container__section__url--error');
  }

  if (url == undefined || bookmarkSiteName.trim() === '') {
    bookmark.parentElement.classList.add('container__section--error');
    return;
  }

  // Values to output
  document.querySelector('.container__output__name').value = bookmarkSiteName;
  document.querySelector('.container__output__url').value = bookmarkUrl;

  // Create object that will be pushed to an array, and used with localstorage
  const bookmarkObj = {
    sitename: bookmarkSiteName,
    siteurl: bookmarkUrl,
    id: Date.now(),
  }

  // Take ID and assign it to the ID attribute
  document.querySelector('.container__output').setAttribute('data-unique-number', bookmarkObj.id);

  // Clone the invisble template, captured data already included
  let outputClone = output.cloneNode(true);
  outputClone.style.display = 'block';
  displayArea.appendChild(outputClone);

  // Push this bookmark to an array used with localstorage
  bookmarkItems.push(bookmarkObj);

  const objToString = JSON.stringify(bookmarkItems);
  localStorage.setItem('Bookmarks', objToString);

  // Clear the input fields
  document.querySelector('.container__section__name').value = '';
  document.querySelector('.container__section__url').value = '';
  document.querySelector('.container__output').setAttribute('data-unique-number', '');
});

// Output buttons
// Go!
document.addEventListener('click', ({target}) => {
  
  if (target && target.matches('.container__output__button')) {
    const outputUrl = target.parentElement.querySelector('.container__output__url').value;
    target.setAttribute("href", outputUrl);
  }

});

// Delete!
document.addEventListener('click', ({target}) => {
  
  if (target && target.matches('.container__output__button-del')) {
    const parentBookmark = target.parentElement.parentElement;
    parentBookmark.remove();

    // Remove from array to remove from localstorage
    const bookmarkID = parentBookmark.getAttribute('data-unique-number');
    
    const match = (arrayItem) => {

      if (arrayItem.id == bookmarkID) {
        return false;
      }

      return true;

    }

    bookmarkItems = bookmarkItems.filter(match);

    // Reset localstorage
    const objToString = JSON.stringify(bookmarkItems);
    localStorage.setItem('Bookmarks', objToString);

  }

});

// Resets
// Allows animation to fire more than once
document.addEventListener('animationend', () => {
  bookmark.parentElement.classList.remove('container__section--error');
});

// Remove the error if there is user input
document.addEventListener('input', ({target}) => {

  if (target && target.matches('.container__section__name--error')) {
    bookmarkNameInput.classList.remove('container__section__name--error');
  }

});

// Remove the error if there is user input
document.addEventListener('input', ({target}) => {

  if (target && target.matches('.container__section__url--error')) {
    bookmarkUrlInput.classList.remove('container__section__url--error');
  }

});