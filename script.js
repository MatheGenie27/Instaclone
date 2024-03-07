//Burger Menu

let burger = false;

function showBurgerMenu(){
    document.getElementById("burgerMenu").classList.toggle("noDisplay");
    burger = true;
}

function hideBurgerMenu() {
  document.getElementById("burgerMenu").classList.toggle("noDisplay");
  burger = false;
}

function burgerFunction() {
  if (burger == true) {
    hideBurgerMenu();
  } else {
    showBurgerMenu();
  }
}

//Post HTML Gerüst

function postHTML(index) {
  return `

    <div class= "post">
        <div class ="postHeader"> 
            <div class ="authorRow" title="Profil-Mockup">
                <img  class="profilPicInSuggestions" src="${
                  posts[index].authorProfile
                }">
                <div class="postAuthor"> ${posts[index].author}</div>
            </div>
            <div class="timeAndLocationRow">
                <div class="postLocation"> ${posts[index].location} </div>
                <div class="postDate"> ${posts[index].date} </div>
            </div>    
        </div>
        <div class="postImage">
            <img class="postImageImage" onclick="like(${index})" src="${
    posts[index].image
  }">
        </div>
        <div class = "postText">
            <div class = "iconRow"> 
                <img class="iconRowIcon" onclick="like(${index})"  src="${isItLiked(
    index
  )}">
            </div>
            <div class = "likesRow"> Gefällt ${posts[index].likes} Mal</div>
            <div class = "commentSection" id="commentSection${index}"> </div>
            <div class = "inputRow">
                <input type="text" class = "inputComments" id="inputAtPost${index}" placeholder="Kommentiere...."> 
                <img class="sendCommentIcon" onclick="sendComment(${index})" title="Kommentar abschicken" src="./img/icons/paperplane.png">
            </div>
            
            
        </div>
    
    </div>
    
    `;
}

function comments(index) {
  let commentSection = document.getElementById(`commentSection${index}`);
  commentSection.innerHTML = ``;

  for (let j = 0; j < posts[index].comments.length; j++) {
    commentSection.innerHTML += `${commentsHTML(index, j)}`;
  }
}
 
function commentsHTML(index, j) {
  return `
        <div class="comment">
            ${posts[index].comments[j]} 
        </div>
        `;
}

function like(i) {
  if (posts[i].isLiked == true) {
    posts[i].isLiked = false;
    posts[i].likes--;
  } else {
    posts[i].isLiked = true;
    posts[i].likes++;
  }
  render();
}

function isItLiked(index) {
  if (posts[index].isLiked) {
    return "./img/icons/heart-full.png";
  } else {
    return "./img/icons/heart-empty.png";
  }
}

function sendComment(index) {
  input = document.getElementById(`inputAtPost${index}`);
  if (input.value) {
    posts[index].comments.push(`<b>MatheGenie27</b>: ` + input.value);
    store();
    render();
  } else {
    input.placeholder = "Leerer Kommentar nicht möglich";
  }
}

//Kommentare mit Enter abschicken

function addSendCommentByEnter() {
  for (let index = 0; index < posts.length; index++) {
    let input = document.getElementById(`inputAtPost${index}`);

    // Execute a function when the user presses a key on the keyboard
    input.addEventListener("keypress", function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendComment(index);
      }
    });
  }
}

//Darstellung Feed

function render() {
  feedContentContainer = document.getElementById("feedContent");
  feedContentContainer.innerHTML = ``;

  for (let i = 0; i < posts.length; i++) {
    feedContentContainer.innerHTML += postHTML(i);
    comments(i);
  }

  addSendCommentByEnter();
}

function store() {
  let postsAsText = JSON.stringify(posts);
  localStorage.setItem("posts", postsAsText);
}

function load() {
  let postsAsText = localStorage.getItem("posts");
  if (postsAsText) {
    posts = JSON.parse(postsAsText);
  }
}

//Daten der Posts

let posts = [
  {
    authorProfile: `./img/icons/man.png`,
    author: `Booklover`,
    location: `Mainz, Germany`,
    date: `04.03.24`,
    image: `./img/books-8405721_1280.jpg`,
    isLiked: true,
    likes: 23,
    comments: [
      `<b>Booklover</b>: Als Gutenberg die Buchdruckmaschine erfand, war das der Beginn einer neuen Zeit!`,
      `<b>Gamerkiddie</b>: Das is sowas von oldschool. Heute gibts Kindle!`,
      `<b>Miespeter</b>: Ach Generation Z liest doch eh nicht mehr....`,
    ],
  },

  {
    authorProfile: `./img/icons/man.png`,
    author: `Morgenmuffel123`,
    location: `Hamburg, Germany`,
    date: `04.03.24`,
    image: `./img/coffee-5447420_1280.jpg`,
    isLiked: false,
    likes: 423,
    comments: [
      `<b>Morgenmuffel123</b>: Kaffee am Morgen vertreibt Kummer und Sorgen.`,
      `<b>Miesepeter1704</b>: Von Kaffee kriegt man nur Sodbrennen und Durchfall!!!!`,
      `<b>Software-Entwickler</b>: Programmierer sind wie Maschinen. Du kippst oben Kaffee rein und unten kommt Code raus....`,
    ],
  },

  {
    authorProfile: `./img/icons/man.png`,
    author: `Frühaufsteher728`,
    date: `04.03.24`,
    location: `München, Germany`,
    image: `./img/clock-8592484_1280.jpg`,
    isLiked: false,
    likes: 1,
    comments: [
      `<b>Frühaufsteher728</b>: Früher Vogel fängt den Wurm. Wer Erfolg im Leben hat, sollte um 5 Uhr den Tag beginnen!`,
      `<b>Morgenmuffel123</b>: Boah, was läuft denn bei dir falsch?!?.`,
      `<b>Besserwisser111</b>: Also ich finde ja, jeder sollte seinem eigenen Tagesrhythmus folgen. Es gibt eben Eulen und Lerchen`,
      `<b>Miesepeter</b>: Ausschlafen kannste, wenn du gestorben bist!!`,
      `<b>Morgenmuffel123</b>: @Miesepeter Du musst deinen Senf aber echt zu jedem Post schreiben oder?`,
    ],
  },
];
