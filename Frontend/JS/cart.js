let realPanier = [];
let listOdonymie = ["Allée", "Anse", "Avenue", "Boulevard", "Carrefour", "Chaussée", "Chemin", "Cité", "Clos", "Côte", "Cours", "Degré", "Esplanade", "Gaffe", "Impasse", "Liason", "Mail", "Montée", "Passage", "Place" , "Placette", "Pont", "Promenade", "Quai", "Résidence", "Rang", "Rampe", "Rond-Point", "Route", "Rue", "Ruelle", "Sentier", "Square", "Traboule", "Traverse", "Venelle", "Villa", "Voie"];

(async function () {
    const produit = await apiCall(apiUrl , {});
    converstionLocalStorage(produit)
    afficherCart(realPanier);
})();

// FONCTION GET ITEM LOCALSTORAGE

async function converstionLocalStorage(produit) {
    for(let i = 0 ; i < produit.length; i++) {
        let a = JSON.parse(localStorage.getItem(produit[i]._id));
        if (a != null) {
            realPanier.push(a);
        }
    }
}
//FONCTION D'AFFICHAGE DU PANIER DYNAMIQUE

async function afficherCart (realPanier) {
    if(realPanier.length == 0) {
        let htmlError = `<div class="cart_section">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-10 offset-lg-1">
                                        <p class="text-center"> Il n'y a rien dans votre panier !<p>
                                        <img src="../../Backend/images/logo.PNG" alt="logo Orinoco">
                                        <a href="Index.html">Retour a la boutique</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("panier").innerHTML = htmlError;
    }
    else {
        let htmlList = [];
        let price = 0
        let quantity = 0
        let totalAmount = 0;
        
        function getTotalByProduct (quantite, price) {
            totalPrice = (quantite * price)
            totalAmount = totalAmount + totalPrice;
            return totalPrice;
        }

        for(let i = 0; i < realPanier.length; i++) {

            // Liste par ID dans localStorage

            price = realPanier[i].price / 100;
            quantity = realPanier[i].quantity;
            htmlLi = `<li class="cart_item clearfix d-flex justify-content-between">
                            <div class="cart_item_image">
                                <img src="${realPanier[i].imageUrl}" alt="">
                            </div>
                            <div class="cart_item_info d-flex justify-content-around">
                                <div class="cart_item_name cart_info_col">
                                    <div class="cart_item_title">Name</div>
                                    <div class="cart_item_text">${realPanier[i].name}</div>
                                </div>
                                <div class="cart_item_color cart_info_col">
                                    <div class="cart_item_title">Lentille</div>
                                    <div class="cart_item_text">${realPanier[i].lenses}</div>
                                </div>
                                <div class="cart_item_quantity cart_info_col">
                                    <div class="cart_item_title">Quantity</div>
                                    <input id="${realPanier[i]._id}" class="cart_item_text" type="number" value="${quantity}" max="${realPanier[i].stock}" onchange="inputOnChange(this, '${realPanier[i]._id}')" >
                                </div>
                                <div class="cart_item_price cart_info_col">
                                    <div class="cart_item_title">Price</div>
                                    <div class="cart_item_text">${price} €</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_title">Total</div>
                                    <div class="cart_item_text">${getTotalByProduct(quantity,price)} €</div>
                                </div>
                            </div>
                        </li>`;
            htmlList.push(htmlLi)
        }

        // ROW montant total

        let htmlCart =`<div class="cart_section">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-10 offset-lg-1">
                                        <div class="cart_container">
                                            <div class="cart_title mb-2"><h2>Shopping Cart</h2></div>
                                            <div class="cart_items">
                                                <ul id="cart_list">
                                                </ul>
                                            </div>
                                            <div class="order_total">
                                                <div class="order_total_content text-md-right">
                                                    <div class="order_total_title">Order Total:</div>
                                                    <div class="order_total_amount">${totalAmount} €</div>
                                                </div>
                                            </div>
                                            <form id="form" class="mt-3"></form>
                                            <div class="cart_buttons">
                                                <a href="../Html/Index.html"><button type="button" class="button cart_button_clear">Continue Shopping</button></a>
                                                <a><button id="purchase" type="button" class="button cart_button_checkout" onclick="afficherForm()">Purchase</button></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("panier").innerHTML = htmlCart;

        // ajout des listes créent précedement

        for( i = 0 ; i < htmlList.length; i++) {
            document.getElementById("cart_list").insertAdjacentHTML('beforeend', htmlList[i]);
        }
    }
}

// FONCTION POUR AFFICHER LE FORMULAIRE CONFIRMATION COMMANDE

async function afficherForm() {
    let htmlForm = `<div id="sendForm" class="d-flex justify-content-around">
                        <div class="col-8 p-2">
                            <div class="form-group">
                                <label for="Contact">Contact</label>
                                <input id="email" type="email" class="form-control" placeholder="Email" required>
                                <small class="form-text text-muted">We'll never share your contact's informations with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="name">Destinataire</label>
                                <input id="name" type="text" class="form-control" placeholder="Nom" required>
                                <input id="prenom" type="text" class="form-control" placeholder="Prenom" required>
                            </div>
                            <div class="form-group">
                                <label for="location">Adresse</label>
                                <div class="d-flex">
                                    <input id="numeroRue" type="number" class="form-control" placeholder="n°" required>
                                    <select id="selectForm" name="streetType">
                                    </select>
                                </div>
                                <input id="adresse" type="text" class="form-control" placeholder="Adresse" required>
                                <div class="d-flex">
                                    <input id="codePostal" type="text" class="form-control" placeholder="Code postal" required>
                                    <input id="ville" type="text" class="form-control" placeholder="Ville" required>
                            </div>
                            </div>
                        </div>
                    </div>`;
        document.getElementById("form").insertAdjacentHTML('afterbegin', htmlForm);
        let purchaseButton = document.getElementById("purchase")
        purchaseButton.setAttribute("onclick", "purchaseCart()")
        let optionOdonymie = ''
        for(let i = 0; i < listOdonymie.length; i++) {
            optionOdonymie = optionOdonymie + `<option value="${listOdonymie[i]}">${listOdonymie[i]}</option>`;
            
        }
    document.getElementById("selectForm").innerHTML = optionOdonymie;
 }


// FONCTION POUR LE CHANGEMENT DE VALEUR DANS L'INPUT DU PANIER

function inputOnChange(v, idProduct) {
    if(v.value <= 0) {
        localStorage.removeItem(idProduct);
        location.reload();
    }
    for(let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) == idProduct) {
            realPanier[i].quantity = v.value;
            let modifPanier = JSON.stringify(realPanier[i]);
            localStorage.setItem(idProduct, modifPanier);
        }  
    }
    afficherCart(realPanier);
}

async function purchaseCart() {

    // FONCTION DE VERIFICATION CARACTERE FORMULAIRE

    async function formcheck() {
        const formvalueP = contact.firstName;
        const formvalueL = contact.lastName;
        const formvalueA = contact.address;
        const formvalueC = contact.city;
        const formvalueE = contact.email;
        if (
            /^[A-Za-z]{2,24}$/.test(formvalueP) 
            && /^[A-Za-z]{2,24}$/.test(formvalueL) 
            && /^[A-Za-z]{2,24}$/.test(formvalueC)
            && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formvalueE)
            && /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(formvalueA)) {
            return true;
        } 
        return false
    }
    //verification du formulaire
    const formCheck = formcheck()
    // recupération des informations sur le formulaires + produits
    let adresseForm = document.getElementById("numeroRue").value + " " + document.getElementById("selectForm").value + " " + document.getElementById("adresse").value;
    let cityForm = document.getElementById("codePostal").value + " " + document.getElementById("ville").value;
    let totalId = [];
    for(let i = 0; i < realPanier.length; i++) {
    for(let y = 0; y < realPanier[i].quantity; y++) {
        totalId.push(realPanier[i]._id);
    }

    }

    // construction de l'objet pour envoie a l'API

    let productsBody = {
        contact: {
            firstName: document.getElementById("prenom").value,
            lastName: document.getElementById("name").value,
            address: adresseForm,
            city: cityForm,
            email: document.getElementById("email").value,
        },
        products: totalId,
    }

    // Supression du panier Actuel

    localStorage.clear()

    // Envoie a l'API

    fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productsBody)
    })
    .then(response => response.json())
    .then(data => {   // ajout l'ordir id dans le storage
        let OrderId = data.orderId;
        localStorage.setItem('orderId', JSON.stringify(OrderId));
        window.location.replace("./Confirmation.html");
    }) 
} 

