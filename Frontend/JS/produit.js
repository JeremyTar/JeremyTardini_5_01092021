let idProduit = (new URL(document.location)).searchParams;
let apiUrlId = idProduit.get('id');
let newUrlId = apiUrl + '/' + apiUrlId;

// AFFICHAGE DU PRODUIT DANS SON DETAILS

    //APPEL DE L'API SPECIFIQUE A L'ID SELECTIONNE

    (async function () {
        const produit = await apiCall(newUrlId , {});
    afficherProduct(produit);  
    })();

    // FONCTION D'AFFICHAGE CARD + PERSONALISATION PRODUIT

    function afficherProduct(produit) {  
        let html = `<div class="p-2 photo">
                        <img class="card-img-top" src="${produit.imageUrl}" alt="${produit.name}">
                    </div>
                    <div class="m-2 p-2">
                        <h2>${produit.name}</h2>
                        <p>${produit.description}</p>
                        <p class="price">${produit.price / 100} €</p>
                        <div class="d-flex justify-content-around">
                            <div class="select w-50">
                                <label> Choissiez votre lentille :</label>
                                <select id="lense" name="lenses"></select>
                            </div>
                            <div class="inputButton w-50">
                                <p>Quantité : <input id="${produit._id}" type="number" value="1" min="1" onchange="verifyInput()"></p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around">
                            <button button class="cart_button_checkout" onclick="addToCart()">Ajouter au panier</button>
                        </div>    
                    </div>`;
                    
        document.getElementById("produit").innerHTML = html; // ajout au DOM

        let lenses = produit.lenses; // recuperation des personalisations
        let htmlLense = ''
        for(let i = 0; i < lenses.length; i++) {
            htmlLense = htmlLense + `<option value="${lenses[i]}">${lenses[i]}</option>` // ajout des différentes personalisation au DOM
        }
        document.getElementById("lense").innerHTML = htmlLense;
    }

// FONCTION POUR AJOUTER AU LOCAL STORAGE

async function addToCart() {
    let userCart = await apiCall(newUrlId); // creation d'un objet correspondant a la selection
    let selectedOption = document.getElementById("lense"); // 

    userCart.lenses = selectedOption.options[selectedOption.selectedIndex].value; // ajout personalisation et quantite a l'objet
    userCart.quantity = document.querySelector("input").value; //

    let userCartJSON = JSON.stringify(userCart)  // integration local storage
    localStorage.setItem(userCart._id, userCartJSON) //

    appearSign(localStorage.setItem(userCart._id, userCartJSON) != 0);
    
    let blurDiv = '<div id="blur"></div>';
    document.getElementById("body").insertAdjacentHTML('afterbegin', blurDiv);
    
    // FUNCTION APPARITION CONFIRAMTION DE PANIER

    async function appearSign(elem) {
        if(elem === true) {            
            let htmlConfirme = `<div id="confirmeSign">
            <a class="d-flex justify-content-around" href="../Html/Index.html" class="col-2"><img src="../../Backend/images/logo.PNG" alt="logo Orinoco"></a>
            <p class="text-center mt-3">Vous venez d'ajouter à votre panier : </p>
            <p class="text-center">${userCart.quantity} ${userCart.name} modèle : ${userCart.lenses}</p>
            <div class="d-flex justify-content-between">
                <button id="productReturn" class="d-flex justify-content-around" onclick="removeSign()">Retour au produit</button>
                <a href="Panier.html">Votre panier</a>
            </div>
        </div>`;
        document.getElementById("main").insertAdjacentHTML('beforebegin', htmlConfirme);
        }
        else {
            let htmlConfirme = `<div id="confirmeSign">
            <a href="../Html/Index.html" class="col-2"><img  src="../../Backend/images/logo.PNG" alt="logo Orinoco"></a>
            <p>Oups .. Il semblerais qu'il y ai une erreur.</p>
            <div class="d-flex justify-content-between">
                <button id="productReturn" onclick="removeSign()">Retour au produit</button>
                <a href="Panier.html">Votre panier</a>
            </div>
        </div>`;
      
        document.getElementById("main").insertAdjacentHTML('beforebegin',htmlConfirme);
        }
    }
}

// FUNCTION POUR RETOUR SIGN

async function removeSign () {
    let elemSign = document.getElementById("confirmeSign");
    elemSign.parentNode.removeChild(elemSign);
    let elemBlur = document.getElementById("blur");
    elemBlur.parentNode.removeChild(elemBlur);

}


async function verifyInput() {
    if(document.querySelector("input").value < 1 ) {
        window.alert("Quantité minimum à 1 exemplaire")
        document.querySelector("input").value = 1;
    }
}