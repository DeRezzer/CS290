/*
 * Add the contents of your index.js file from Assignment 3 here to see the
 * interactions you implemented.  This is not required for your grade on this
 * assignment, but it'll allow you to have the full experience of the site
 * as we've implemented it so far.
 */

var modal = document.getElementById('create-twit-modal');
var backDrop = document.getElementById('modal-backdrop');
var textArea = document.querySelector('#twit-text-input');
var authorArea = document.querySelector('#twit-attribution-input');

//hooks up create twit button from html
var btn = document.getElementById("create-twit-button");

//makes sure modal and backdrop pops up on button click
btn.addEventListener('click', function(event){
   console.log("this was clicked, alright");
   modal.classList.toggle("hidden");
   backDrop.classList.toggle('hidden');
});

//hooks up x button from html
var close = document.getElementsByClassName("modal-close-button")[0];

//Make sure modal and backdrop are hidden on x button click
close.addEventListener('click', function(event){
   if(event.target == close){
       modal.classList.toggle("hidden");
       backDrop.classList.toggle("hidden");
   }
});

//Hooks up cancel button from html
var cancel = document.getElementsByClassName("modal-cancel-button")[0];

//Makes sure modal and backdrop are hidden on cancel button click
cancel.addEventListener('click', function(event){
   if(event.target == cancel){
       modal.classList.toggle("hidden");
       backDrop.classList.toggle("hidden");
   }
});

//Makes sure modal fields are reset on cancel button click
cancel.addEventListener('click', function(event){
    if(event.target == cancel){
        console.log("You cancelled the twit!");
        //textArea.innerHTML = 'wow';
        textArea.value = '';
        authorArea.value = '';
    }
});

//Makes sure modal fields are reset x button click
close.addEventListener('click', function(event){
    if(event.target == close){
        console.log("you closed the twit!");
        textArea.value = '';
        authorArea.value = '';
    }
});

//hooks up accept button
var accept = document.getElementsByClassName('modal-accept-button')[0];

//test to check if my modal-accpet-button was actually working right
accept.addEventListener('click', function(event){
    if(event.target == accept){
        console.log("== create was clicked");
    }
});

//window listener that makes sure the modal and backdrop close when clicked outside of modal
window.addEventListener('click', function(event){
    if (event.target == modal){
        modal.classList.toggle("hidden");
        backDrop.classList.toggle("hidden");
        textArea.value = '';
        authorArea.value = '';
        console.log("text erased, cuase you clicked out");
    }
});



//Function that generates new twit from passed in values and plugs them into the DOM
function generateNewTwit(twitText, author){

   console.log("hey this was called, lets party!!");

    var container = document.getElementsByClassName('twit-container')[0];

    var twitArticle = document.createElement('article');
    twitArticle.classList.add('twit');

    var twitIconDiv = document.createElement('div');
    twitIconDiv.classList.add('twit-icon');

    var iTwit = document.createElement('i');
    iTwit.classList.add('fas');
    iTwit.classList.add('fa-bullhorn');

    var twitDiv = document.createElement('div');
    twitDiv.classList.add('twit-content');

    var twitPara = document.createElement('p');
    twitPara.classList.add('twit-text');
    twitPara.textContent = twitText;

    var twitAuthor = document.createElement('p');
    twitAuthor.classList.add('twit-author');
    twitAuthor.textContent = author;

    container.appendChild(twitArticle);
    twitArticle.appendChild(twitIconDiv);
    twitIconDiv.appendChild(iTwit);
    twitArticle.appendChild(twitDiv);
    twitDiv.appendChild(twitPara);
    twitDiv.appendChild(twitAuthor);
    
   console.log("hello????");
}

//function that gets input from text area and author area and passes them into generateNewTwit function
function getTextArea(event){
   var twitText = document.getElementById('twit-text-input').value;
   var author = document.getElementById('twit-attribution-input').value;
   console.log("hey, I exist in getTextArea function");

   if(authorArea.value == '' || textArea.value == ''){
       console.log("you are here");
       emptyFieldAlert(event);
      }else{
           generateNewTwit(twitText, author);
           modal.classList.toggle("hidden");
           backDrop.classList.toggle("hidden");
           textArea.value = '';
           authorArea.value = '';
   }
   
}

//hooks up create new functionality to accept button
accept.addEventListener('click', getTextArea);

//function that alerts user that both fields of twit must be filled out
function emptyFieldAlert(event){
   if(event.target == accept){
           alert("Error! Both fields must be filled out!");
   }
}

//hooks up search button
var search = document.getElementsByClassName("fa-search")[0];
//hooks up search functionality to search button
search.addEventListener('click', searchTwits);

//function that will remove twits from DOM that do not match search bar input
function searchTwits(event){
   var searchText = document.getElementsByClassName('twit');
   var twitArr = [];
   var searchInput = document.getElementById('navbar-search-input').value.toLowerCase();

   if (event.target == search){
       for(var i = 0; i < searchText.length; i++){
           twitArr.push(searchText[i]);
       }
       for(var j = 0; j < twitArr.length; j++){
           console.log("twit content:", twitArr[j].textContent);
           if(twitArr[j].textContent.toLowerCase().indexOf(searchInput) == -1){
               twitArr[j].parentNode.removeChild(twitArr[j]);
               console.log("MATCH!!");
           }
       }
   }
}

alert('JS successfully loaded.');
