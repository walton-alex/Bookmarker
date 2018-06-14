// Global variables
const bookmark = document.querySelector('.container__section__input-area');
const bookmarkNameInput = document.querySelector('.container__section__name');
const bookmarkUrlInput = document.querySelector('.container__section__url');
const output = document.querySelector('.container__output');

let bookmarkItems = [];

// Read LocalStorage
if (localStorage.getItem('Bookmarks')) {
  const readLocalStorage = localStorage.getItem('Bookmarks');
  bookmarkItems = JSON.parse(readLocalStorage);
}

bookmarkItems.forEach(bookmarkInput => {
  document.querySelector('.container__output__name').value = bookmarkInput.sitename;
  document.querySelector('.container__output__url').value = bookmarkInput.siteurl;
  let outputClone = output.cloneNode(true);
  outputClone.style.display = 'block';
  document.body.appendChild(outputClone);
});



// Execute function on form submit
bookmark.addEventListener('submit', (e) => {
  e.preventDefault();

  // Variables & Data Capture
  let bookmarkSiteName = document.querySelector('.container__section__name').value;
  let bookmarkUrl = document.querySelector('.container__section__url').value;
  let url;

  // Validation of Site Name
  if (bookmarkSiteName === '') {
    bookmarkNameInput.classList.add('container__section__name--error');
  }

  // Validation of URL - Try / Catch
  try {
    url = new URL(bookmarkUrl);
  } catch(error) {
    bookmarkUrlInput.classList.add('container__section__url--error');
  }

  if (url == undefined || bookmarkSiteName === '') {
    bookmark.parentElement.classList.add('container__section--error');
    return;
  }

  // Output
  const outputName = document.querySelector('.container__output__name').value = bookmarkSiteName;
  const outputUrl = document.querySelector('.container__output__url').value = bookmarkUrl;
  let outputClone = output.cloneNode(true);
  outputClone.style.display = 'block';
  document.body.appendChild(outputClone);

  // Add to localstorage
  // Create object
  const bookmarkObj = {
    sitename: bookmarkSiteName,
    siteurl: bookmarkUrl,
    id: new Date().valueOf(),
  }

  // Push to array
  bookmarkItems.push(bookmarkObj);

  // JSON.stringify
  const objToString = JSON.stringify(bookmarkItems);

  // Localstorage
  localStorage.setItem('Bookmarks', objToString);

  // Clear
  document.querySelector('.container__section__name').value = '';
  document.querySelector('.container__section__url').value = '';
});

// Output buttons
// Go!
document.addEventListener('click', (e) => {
  
  if (e.target && e.target.matches('.container__output__button')) {
    const outputUrl = e.target.parentElement.querySelector('.container__output__url').value;
    e.target.setAttribute("href", outputUrl);
  }

});

// Delete!
document.addEventListener('click', (e) => {
  
  if (e.target && e.target.matches('.container__output__button-del')) {
    const remove = e.target.parentElement.parentElement.remove();

    // Remove from array to remove from localstorage
    console.log(bookmarkItems);
    // if (bookmarkItems)
    
  }

});

// Resets
// Allows animation to fire more than once
document.addEventListener('animationend', (e) => {
  bookmark.parentElement.classList.remove('container__section--error');
});

// Remove the error if there is user input
document.addEventListener('input', (e) => {

  if (e.target && e.target.matches('.container__section__name--error')) {
    bookmarkNameInput.classList.remove('container__section__name--error');
  }

});

// Remove the error if there is user input
document.addEventListener('input', (e) => {

  if (e.target && e.target.matches('.container__section__url--error')) {
    bookmarkUrlInput.classList.remove('container__section__url--error');
  }

});