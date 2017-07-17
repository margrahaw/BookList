//public/js/app.js

// Function to get books
function getBooks() {
  return $.ajax('/api/file')
    .then(res => {
      console.log("Results from getBooks()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getBooks()", err);
      throw err;
    });
}

// Function to Refresh the booklist
function refreshBookList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getBooks()
    .then(files => {

      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

//This is the function that is called when we click Add File
function toggleAddBookForm() {
  setBookFormData({});
  toggleAddBookFormVisibility();
}

// Function to toggle the visibility of the form
function toggleAddBookFormVisibility() {
  $('#form-container').toggleClass('invisible');
  $('#form-container').toggleClass('show-content');
}

// Function that will run when the submit button is clicked
function submitBookForm() {
  const title = $('#file-title').val();
  const author = $('#file-author').val();
  const pages = $('#file-pages').val();
  const id = $('#file-id').val();
  const fileData = { // create the data types for schema
     title: title,
     author: author,
     pages: pages,
     _id: id,

  };

  // Determine whether the submit book form data is a PUT or POST value
  let method, url;
  if (fileData._id) { // if there is a file id, the method is PUT and the url is the id
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else { // if there is no id, the method is POST
    method = 'POST';
    url = '/api/file';
  }

  //POST json-formatted data - This is a very important block of code and will be used in future projects
  $.ajax({
    type: method, // references code above where method is defined
    url: url, // references code above where url is defined
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      refreshBookList();
      toggleAddBookFormVisibility();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    });
 console.log("Your file data", fileData);
}

// Edit a book in the existing book list
function editBookClick(id) {
  const book = window.fileList.find(book => book._id === id);
  if (book) {
    setBookFormData(book);
    toggleAddBookFormVisibility();
  }
}

// Function to add the form data to set the data and add to the DB
function setBookFormData(data) {
  data = data || {};

  const book = {
    title: data.title || '',
    author: data.author || '',
    pages: data.pages || '',
    _id: data._id || '',
  };

  $('#file-title').val(book.title);
  $('#file-author').val(book.author);
  $('#file-pages').val(book.pages);
  $('#file-id').val(book._id);
}

//Hides the from - same as the toggle on click on Add File
function cancelBookForm() {
  toggleAddBookFormVisibility();
}

// Create a function to delete a list item
function deleteBookClick(id){
  if (confirm("You are about to delete a record. Please confirm.")) {
    $.ajax({
      type: 'DELETE', // Delete method
      url: '/api/file/' + id,
      dataType: 'json',
      contentType: 'application/json',
    })
    .done(function(res) {
      console.log("Your book with id", id, " has been deleted.");
      refreshBookList();
    })
    .fail(function(err) {
      console.log("The book still remains. Something went wrong. Bummer.", err);
    })
  }
}
