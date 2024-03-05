
//Burger Menu

let burger = false;

function showBurgerMenu(){
    console.log("zeige BurgerMenü");
    document.getElementById("burgerMenu").classList.remove("noDisplay");
    burger = true;
}

function hideBurgerMenu(){
    console.log("verstecke BurgerMenü");
    document.getElementById("burgerMenu").classList.add("noDisplay");
    burger = false;
}

function burgerFunction(){
    if (burger==true){
        hideBurgerMenu();
    } else {
        showBurgerMenu();
    }
}

//Post HTML Gerüst





function postHTML(index){
    return `

    <div class= "post">
        <div class ="postHeader"> 
            <div class ="authorRow" title="Profil-Mockup">
                <img  class="profilPicInSuggestions" src="${posts[index].authorProfile}">
                <div class="postAuthor"> ${posts[index].author}</div>
            </div>
            <div class="postLocation"> ${posts[index].location} </div>
        </div>
        <div class="postImage">
            <img class="postImageImage" onclick="like(${index})" src="${posts[index].image}">
        </div>
        <div class = "postText">
            <div class = "iconRow"> 
                <img class="iconRowIcon" onclick="like(${index})"  src="${isItLiked(index)}">
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
    
    ;
}




function comments(index){
    let commentSection = document.getElementById(`commentSection${index}`);
    commentSection.innerHTML = ``;

    for (let j = 0; j < posts[index].comments.length; j++){
               
        commentSection.innerHTML += `${commentsHTML(index, j)}`;
               
    }
}

function commentsHTML(index, j){
        return `
        <div class="comment">
            ${posts[index].comments[j]} 
        </div>
        `;

}


function like(i){
    
    if (posts[i].isLiked == true){
        posts[i].isLiked=false;
        posts[i].likes--;
    } else {
        posts[i].isLiked=true;
        posts[i].likes++;
    }
    render();

}

function isItLiked(index){
    if (posts[index].isLiked){
        return "./img/icons/heart-full.png";
    } else {
        return "./img/icons/heart-empty.png";
    }
}


function sendComment(index){
    input = document.getElementById(`inputAtPost${index}`);
    if (input.value){
        posts[index].comments.push(`<b>MatheGenie27</b>: `+input.value);
        store();
        render();
    } else {
        input.placeholder="Leerer Kommentar nicht möglich";
    }
    
}

//Darstellung Feed

function render(){
    feedContentContainer = document.getElementById("feedContent");
    feedContentContainer.innerHTML = ``;


    
    
    for (let i=0; i < posts.length; i++){
        feedContentContainer.innerHTML += postHTML(i);
        comments(i);
    }

}


function store(){
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText );
}

function load(){
    let postsAsText = localStorage.getItem('posts');
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}


//Daten der Posts

let posts = [
            {       
                "authorProfile" : `./img/icons/man.png`,
                "author": `Booklover`,
                "location": `Mainz, Germany`,
                "image" : `./img/books-8405721_1280.jpg`,
                "isLiked": true,
                "likes": 23,
                "comments" : [
                            `<b>Booklover</b>: Als Gutenberg die Buchdruckmaschine erfand, war das der Beginn einer neuen Zeit!`,
                            `<b>Gamerkiddie</b>: Das is sowas von oldschool. Heute gibts Kindle!`
                            ]

            },

            {   
                "authorProfile" : `./img/icons/man.png`,
                "author": `Nupsi`,
                "location": `Hamburg, Germany`,
                "image" : `./img/coffee-5447420_1280.jpg`,
                "isLiked": false,
                "likes": 423,
                "comments": [
                            `Kommentar 1`,
                            `Kommentar 2`,
                            `Kommentar 3`
                            ]

            }



]