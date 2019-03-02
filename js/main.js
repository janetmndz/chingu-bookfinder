const searchInput = document.querySelector('.bookinput');
const searchButton = document.querySelector('.booksearch');
const bookDisplay = document.querySelector('.display');

function display(){
    let searchKey = searchInput.value;
    console.log(searchKey);

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
    const html = arr.map(b => {
        console.dir(b);
        const title = b.volumeInfo.title;
        const image = (b.volumeInfo.hasOwnProperty('imageLinks')) ? (b.volumeInfo.imageLinks.thumbnail) : "https://placekitten.com/200/350";
        const authors = (b.volumeInfo.hasOwnProperty('authors')) ? (b.volumeInfo.authors.join(', ')) : "N/A";
        const publisher = (b.volumeInfo.hasOwnProperty('publisher')) ? (b.volumeInfo.publisher) : "N/A";

        return `
        <div class="book__hold">
            <img class="book__image"src="${image}">
            <div class="book__info">
                <h1>${title}</h1>
                <p>By ${authors}</p>
                <p>Published by ${publisher}</p>
            </div>
            
        </div>
        `
    }).join('');

    bookDisplay.innerHTML = html;
}

function isEnter(e){
    if(e.keyCode == 13){
        console.log("yes");
        display();
    }
}

searchButton.addEventListener('click', display);