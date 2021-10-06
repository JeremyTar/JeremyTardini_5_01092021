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
        let html = `<div class="col-4 p-2">
                        <img class="img-thumbnail" src="${produit.imageUrl}" alt="${produit.name}">
                    </div>
                    <div class="col-4 m-2 p-2">
                        <div class="description">
                            <p class="title">${produit.name}</p>
                            <p>${produit.description}</p>
                            <p>${produit.price / 100} €</p>
                        </div>
                        <label> Choissiez votre lentille : </label>
                            <select id="lense" name="lenses">
                            </select>
                        <div class="inputButton">
                            <p> Il reste ${produit.stock} articles disponibles </p>
                            <input type="number" value="1" min="1" max="${produit.stock}" onchange="controleStock(this, ${produit.stock})" >
                            <button onclick="addToCart()">Ajouter au panier</button>
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

    function controleStock(v, maxStock) {
        if(v.value <= 0 || v.value > maxStock) {
            window.alert('Mauvaises données')
            v.value = 1
            storage.removeItem 
        }
    }

// FONCTION POUR AJOUTER AU LOCAL STORAGE

async function addToCart() {
    let userCart = await apiCall(newUrlId); // creation d'un objet correspondant a la selection

    let quantityToAdd = document.querySelector("input").value; // recuperation valeur input et personalisation
    let selectedOption = document.getElementById("lense"); // 
    selectedOption = selectedOption.options[selectedOption.selectedIndex].value; // 

    userCart.lenses = selectedOption; // ajout personalisation et quantite a l'objet
    userCart.quantity = quantityToAdd; //

    let userCartJSON = JSON.stringify(userCart)  // integration local storage
    localStorage.setItem(userCart._id, userCartJSON) //

    appearSign(localStorage.setItem(userCart._id, userCartJSON) != 0);
    
    let blurDiv = '<div id="blur"></div>';
    document.getElementById("body").insertAdjacentHTML('afterbegin', blurDiv);
    
    
// FUNCTION APPARITION CONFIRAMTION DE PANIER

    async function appearSign(elem) {
        if(elem === true) {            
            let htmlConfirme = `<div id="confirmeSign">
            <a href="../Html/Index.html" class="col-2"><img  src="../../Backend/images/logo.PNG" alt="logo Orinoco"></a>
            <p>Vous venez d'ajouter à votre panier : </br><strong> ${userCart.quantity} ${userCart.name} modèle : ${userCart.lenses}</strong></p>
            <div class="d-flex justify-content-between">
                <button id="productReturn" onclick="removeSign()">Retour au produit</button>
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
