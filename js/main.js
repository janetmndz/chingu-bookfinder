const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.bookinput');
const searchButton = document.querySelector('.booksearch');
const bookDisplay = document.querySelector('.display');

function display(){
    let searchKey = searchInput.value;

    if(searchKey !== 0){
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&maxResults=14`)
        .then(res => res.json())
        .then(data => {logBooks(data.items);})
        .catch(error => {console.error(error)});
    }
    else{
        bookDisplay.innerHTML = `<p class="placement-text">There is nothing here.</p>`
    }
}

function logBooks(arr){
    if (arr !== undefined){
        const html = arr.map(b => {
            const title = b.volumeInfo.title;
            const image = (b.volumeInfo.hasOwnProperty('imageLinks')) ? (b.volumeInfo.imageLinks.thumbnail) : "https://placekitten.com/200/350";
            const authors = (b.volumeInfo.hasOwnProperty('authors')) ? (b.volumeInfo.authors.join(', ')) : "N/A";
            const publisher = (b.volumeInfo.hasOwnProperty('publisher')) ? (b.volumeInfo.publisher) : "N/A";
            const infoLink = b.volumeInfo.infoLink;
            return `
            <div class="book__hold">
                <h1>${title}</h1>
                <div class="book__info">
                    <img class="book__image"src="${image}">
                    <div class="book__details">
                        <p class="detail">Author(s):</p>
                        <p>${authors}</p>
                        <p class="detail">Publisher</p>
                        <p>${publisher}</p>
                    </div>
                </div>
                <div class="book__button"><a href="${infoLink}" target="__blank" class="book__link">More Information</a></div>
                
            </div>
            `
            }).join('');
        return bookDisplay.innerHTML = html;
    }
    return bookDisplay.innerHTML = `<p class="placement-text">No results were found.</p>`;
}

function isEnter(e){
    if(e.keyCode == 13){
        display();
    }
}

searchButton.addEventListener('click', display);
searchInput.addEventListener('keydown', (e) => isEnter(e));