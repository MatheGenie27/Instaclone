
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