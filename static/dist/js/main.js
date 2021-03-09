(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    (fullname.value.length > 10,
    email.value.length > 15,
    comment.value.length > 20)
  ) {
    e.preventDefault();
    window.location.assign("/");
  }

});
},{}]},{},[1]);
