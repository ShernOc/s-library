addEventListener("DOMContentLoaded", (event) => {
// card holder:
function bookHolder(book){
    const bookcard = document.createElement('li');
    bookcard.className = "card";
    bookcard.innerHTML = `
    <div class = "bookholder">
    <img src = "${book.imageLink}">
    <br>
    <h3>${book.title}</h3>
    <button class = "read">Read</button>
    </div>
    `
    // append the first card li to ul element
    const ulholder = document.querySelector(".firstcard");
    ulholder.appendChild(bookcard);
    }
    
    //fetch and display  All books 
    function getAllbooks(){
        fetch('http://localhost:3000/books')
        .then(res=>res.json())
        .then(books=>books.forEach(book=>bookHolder(book)))
        }
    

    //Fetch and create second added books by user  
    const form = document.querySelector('#inputform');
    form.addEventListener('submit',holdTheBooks);
    
    //hold the books event handler object
    function holdTheBooks(e){
        e.preventDefault();
        let books={
            author:e.target.author.value,
            country:e.target.country.value,
            imageLink:e.target.imageLink.value,
            language:e.target.language.value,
            link:e.target.link.value,
            pages:23,
            title:e.target.title.value,
            year:e.target.year.value
        };

        createOneBook(books);
        bookHolder(books);
    }
    
    //create a new book
    function createOneBook(books){
        fetch('http://localhost:3000/books',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(books)
        })
        .then(res=>res.json())
        .then(book=>console.log(book));
    }
    
    
    // footer section
     function footerSection(){
        const footer = document.getElementById('footercopyright');
        if(footer){
            const PresentYear = new Date().getFullYear();
            const text = `Copyright &copy;${PresentYear}, Sherlyne Ochieng`;
            footer.innerHTML = text; 
        }
    }
       ;
    
    function runCode(){
        getAllbooks();
        footerSection();
    }
    
    runCode();


});

