//Book Constructor
function Book(title,author, isbn){
    this.title=title;
    this.author=author;
    this.isbn =isbn;
}

//UI Constructor
function UI(){
    //add book to the list
    UI.prototype.addBooktoList= function(book){
        const list = document.getElementById('book-list');
        //Craete table row element
        const row = document.createElement('tr');
        //inser cols
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class ="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    UI.prototype.clearField()= function(){
    document.getElementById('title').value ='';
    document.getElementById('author').value ='';
    document.getElementById('isbn').value ='';
    }

    UI.prototype.showAlert= function(message, className){
        //create div 
        const div = document.createElement('div');
        div.className =`alert${className}`;
        //add text
        div.appendChild(document.createTextNode(message));
        //getparent
        const container = document.querySelector('container');

        const form = document.querySelector('#book-form');
        //inser alert
        container.insertBefore(div,form);
        //time out after 3 sec

        setTimeout(function(){
            document.querySelector('.alert').remove;
        },3000);
    }
    //Delete Book
    UI.prototype.deleteBook = function(target){
        if(target.className ==='delete'){
            target.parentElement.parentElement.remove();
        }
    }

}

//Event Listeners fro add book
document.getElementById('book-form').addEventListener('submit',function(e){

        //Get the values
        const title = document.getElementById('title').value ,
                author = document.getElementById('author').value,
                isbn = document.getElementById('isbn').value;
        //Instantiate book
        const book = new Book(title,author,isbn);
        //Instantiate UI
        const ui = new UI();

        //validate 
        if(title === ''|| author ===''||isbn ===''){
            ui.showAlert('Please fill in all fields','erroe');
        }else{
        //add book to list
        ui.addBooktoList(book);
        }
        //clear field
        ui.clearField()
        e.preventDefault();
    });

    //Event listener for delete 
    document.getElementById('book-list').addEventListener('click',function(e){

        const ui = new UI();
        //Delete Book
        ui.deleteBook(e.target);
        //show message
        ui.showAlert('Book Removed!','success');
        e.preventDefault();
    })

