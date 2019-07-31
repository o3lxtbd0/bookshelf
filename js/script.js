let myLibrary = [];

const bookIn   = document.getElementById("book-in");  // form
const authorIn = document.getElementById("author-in");
const titleIn  = document.getElementById("title-in");
const pagesIn  = document.getElementById("pages-in");
const readIn   = document.getElementById("read-in");
const btns     = document.querySelectorAll(".btn");  // buttons

btns.forEach(btn => btn.addEventListener('click', btnClick));
function btnClick(e) {
  let path = e.toElement.textContent;
  if (path === 'Load Presets') { loadPresets(); }
  else if (path === 'Clear All') { clearAll(myLibrary);   }
  else { return; }
}

bookIn.addEventListener('submit', bookSubmit);
function bookSubmit(e) {
  e.preventDefault();
  let title  = titleIn.value;
  let author = authorIn.value;
  let pages  = pagesIn.value;
  let read   = readIn.value === 'true' ? true : false ;
  let newBook = new Book(title, author, pages, read);
  myLibrary.unshift(newBook);  // inserts book at top of list so user can see it
  renderAll(myLibrary);
  titleIn.value = "" ;  // reset all relevant consts
  authorIn.value = "" ;
  pagesIn.value = "" ;
  readIn.value = false;
  bookIn.value = "" ;
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages  // string
  this.read = read   // true or false
  this.info = function() { return title + ' by ' + author + ', ' + pages + ' pages, ' + (read ? 'read.' : 'unread.'); }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  renderAll(myLibrary);
}

function clearAll() {
  myLibrary = [];
  renderAll(myLibrary);
}

const cardSection = document.getElementById('card-section');

function renderAll(arr) {
  const renderArr = myLibrary;

  const html = renderArr.map(book => {
    const index = myLibrary.findIndex(function(libraryBook){return libraryBook == book } );
    const tick  = myLibrary[index].read ? "checked" : "";
    const unread= myLibrary[index].read ? "read" : "unread";
    return `
      <div class="card-container" id=${index} >
        <div class ="card card-row">
          <div class="card-column">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-author">${book.author}</p>
            <p class="card-pages">${book.pages + ' pages'}</p>
          </div>
          <div class="card-column second">
            <h5 class="card-read" id=${'read'+index}> ${unread} </h5>
            <div class="switch-div">
              <label class="switch">
                <input class="checkbox" type="checkbox" name="checkbox" ${tick}>
                <span class="slider round"></span>
              </label>
            </div>
            <button class="delBtn card-delete">×</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  cardSection.innerHTML = html;  // splices html code into page

  const delBtns = document.querySelectorAll(".delBtn");
  delBtns.forEach(btn => btn.addEventListener('click', btnClick));
  function btnClick(e) {
    const parentCard = e.path[3];
    parentCard.classList.add('card-fadeout');
  }

  const cardSec = document.getElementById("card-section");
  const cardConts = document.querySelectorAll(".card-container");
  cardConts.forEach(card => card.addEventListener('transitionend', btnDel));
  function btnDel(e) {
    if (e.propertyName !== 'opacity'){ return; }
    else if (e.propertyName === 'opacity'){
      const index = e.path[0].id;
      myLibrary.splice(index, 1);
      renderAll(myLibrary);
    }
  }

  const checkboxes = document.querySelectorAll("input[name=checkbox]");
  checkboxes.forEach(sw => sw.addEventListener('change', switchChange));
  function switchChange(e) {
    const index = e.path[5].id;
    myLibrary[index].read = e.path[0].checked;
    const titleId = 'read' + index;
    const newRead = document.getElementById(titleId);
    newRead.textContent = myLibrary[index].read ? "read" : "unread" ;
  }

}
// Presets ----------------------------------
const endersGame = new Book("Ender's Game", "Orson Scott Card", "324", true);
const inTheHeartOfTheSea = new Book("In The Heart Of the Sea", "Nathaniel Philbrick", "302", true);
const japaneseMind = new Book("The Japanese Mind", "Various", "280", true);
const slaughterhouseFive = new Book("Slaughterhouse-Five", "Kurt Vonnegut", "275", true);
const catsCradle = new Book("Cat's Cradle", "Kurt Vonnegut", "306", false);
const notesFromUnderground = new Book("Notes from Underground", "Fyodor Dostoyevsky", "136", true);
const theIdiot = new Book("The Idiot", "Fyodor Dostoyevsky", "667", true);
const lordOfTheFlies = new Book("Lord of the Flies", "William Golding", "182", true);
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", "366", false);
const forWhomTheBellTolls = new Book("For Whom The Bell Tolls", "Ernest Hemingway", "471", true);
const theSunAlsoRises = new Book("The Sun Also Rises", "Ernest Hemingway", "189", true);
const theOldManAndTheSea = new Book("The Old Man and the Sea", "Ernest Hemingway", "132", true);
const aManInFull = new Book("A Man In Full", "Tom Wolfe", "704", true);
const anEveningInThePalaceOfReason = new Book("An Evening In the Palace Of Reason", "James R. Gaines", "368", true);
const theKillerAngels = new Book("The Killer Angels", "Michael Shaara", "345", true);

function loadPresets() {
  addBookToLibrary(endersGame);
  addBookToLibrary(inTheHeartOfTheSea);
  addBookToLibrary(japaneseMind);
  addBookToLibrary(slaughterhouseFive);
  addBookToLibrary(catsCradle);
  addBookToLibrary(notesFromUnderground);
  addBookToLibrary(theIdiot);
  addBookToLibrary(lordOfTheFlies);
  addBookToLibrary(theHobbit);
  addBookToLibrary(forWhomTheBellTolls);
  addBookToLibrary(theSunAlsoRises);
  addBookToLibrary(theOldManAndTheSea);
  addBookToLibrary(aManInFull);
  addBookToLibrary(anEveningInThePalaceOfReason);
  addBookToLibrary(theKillerAngels);
  renderAll(myLibrary);
}
