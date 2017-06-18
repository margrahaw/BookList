//public/js/app.js

function getFiles() {
  return $.ajax('/api/file')
    .then(res => {
      console.log("Results from getFiles()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getFiles()", err);
      throw err;
    });
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {
      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

//This is the function that is called when we click Add File
function toggleAddFileForm() {
  console.log("Baby steps...");
  toggleAddFileFormVisibility();
}

// Function to toggle the visibility of the form
function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('invisible');
}

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
  const title = $('#file-title').val();
  const author = $('#file-author').val();
  const pages = $('#file-pages').val();
  const fileData = {
     title: title,
     author: author,
     pages: pages,
  };
  //POST json-formatted data - I will use this block of code again
  $.ajax({
    type: "POST",
    url: '/api/file',
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      refreshFileList();
      toggleAddFileFormVisibility();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    });
 console.log("Your file data", fileData);
}

//Hides the from - same as the toggle on click on Add File
function cancelFileForm() {
  toggleAddFileFormVisibility();
}
