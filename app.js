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



//eventlistener untuk add buku
document.getElementById('book-form').addEventListener('submit',function (e){
    const title = document.getElementById("title").value,
        author = document.getElementById("author").value,
        isbn = document.getElementById('isbn').value;

        const buku = new book(title,author,isbn)

        const ui = new UI();
        // console.log (ui)

        ui.addBukuKeList(buku);
        
        ui.bersihkanForm();

        console.log(ui)
       
        
    e.preventDefault()
})

//event untuk delete buku
document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();

    ui.delete(e.target)

    
    e.preventDefault()
})