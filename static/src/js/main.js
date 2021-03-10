"use strict"
// We access to the inputs by their id's
let fullname = document.getElementById("fullname");
let email = document.getElementById("email");
let comment = document.getElementById("form_message");

// Error messages
let errorElement = document.getElementById("invalid");
let errorElementEmail = document.getElementById("invalid-email");
let errorElementComment = document.getElementById("invalid-message");

// Form
let contactForm = document.getElementById("form");

// Event listener
if(document.getElementById('contact-page')){
contactForm.addEventListener("submit", function (e) {
  let messageName = [];
  let messageEmail = [];
  let messageComment = [];
  
    if (fullname.value === "" || fullname.value === null) {
    messageName.push("*Your name is required");
  }

  if (email.value === "" || email.value === null) {
    messageEmail.push("*Your email address is required");
  }

  if (comment.value === "" || comment.value === null) {
    messageComment.push("*A message is required");
  }


  // Statement to shows the errors
  if (messageName.length || messageEmail.length || messageComment.length > 0) {
    e.preventDefault();
    errorElement.innerText = messageName;
    errorElementEmail.innerText = messageEmail;
    errorElementComment.innerText = messageComment;
  }
  
   // if the values length is filled and it's greater than 2 then redirect to this page
    if (
    (fullname.value.length > 5,
    email.value.length > 5,
    comment.value.length > 5)
  ) {
    e.preventDefault();
    window.location.assign("/");
  }

});
}