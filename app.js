//Constructior buku
function book (title,author,isbn){
    this.title = title,
    this.author = author,
    this.isbn = isbn
}

//UI Constractor
function UI() {

}

UI.prototype.addBukuKeList = function (buku) {
    const list = document.getElementById("book-list");

    row = document.createElement('tr');
    // console.log(row)

    row.innerHTML =`
    <td>${buku.title}</td>
    <td>${buku.author}</td>
    <td>${buku.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `
    list.appendChild(row)
}

UI.prototype.bersihkanForm = function (){
    document.getElementById("title").value ='';
    document.getElementById("author").value = '';
    document.getElementById("isbn").value = ''
}
UI.prototype.delete = function (target){
    if (target.className === "delete") {
        target.parentElement.parentElement.remove()
    }
}

UI.prototype.showAlert = function (pesan,className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild (document.createTextNode(pesan));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000);
}


//Localstorage
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem('books')===null){
             books=[];
        }else{
            books=JSON.parse( localStorage.getItem('books'));
        }
        return books;
    }
    static displayBook(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            ui.addBukuKeList(book);
        })
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book)

        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if (book.isbn===isbn){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
        
    }
}

//DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBook);


//eventlistener untuk add buku
document.getElementById('book-form').addEventListener('submit',function (e){
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById('isbn').value;

        const buku = new book(title,author,isbn)

        const ui = new UI();
        // console.log (ui)

        // validasi
        if (title===''||author===''||isbn===''){
            //error
            ui.showAlert('form belum diisi','error')
        }else{
            
        ui.addBukuKeList(buku);

        //add to LS
        Store.addBook(buku)
        
        ui.showAlert('buku sudah ditambahkan','success')
        
        ui.bersihkanForm();

        console.log(ui)
        
        }

    e.preventDefault()
})

//event untuk delete buku
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.delete(e.target)

    //hapus dari LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('buku berhasil di hapus', 'success')
    
    e.preventDefault()
})