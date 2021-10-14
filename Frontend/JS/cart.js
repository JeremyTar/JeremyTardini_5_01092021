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
                                        <a class="d-flex justify-content-around" href="Index.html">Retour à la boutique</a>
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
            htmlLi = `<li class="cart_item clearfix">
                            <div class="cart_item_info d-flex justify-content-around">
                                <div class="cart_item_name cart_info_col">
                                    <div class="cart_item_text text-center">${realPanier[i].name}</div>
                                </div>
                                <div class="cart_item_color cart_info_col">
                                    <div class="cart_item_text text-center">${realPanier[i].lenses}</div>
                                </div>
                                <div class="cart_item_quantity cart_info_col">
                                    <input id="${realPanier[i]._id}" class="cart_item_text d-flex justify-content-around" type="number" value="${quantity}" max="${realPanier[i].stock}" onchange="inputOnChange(this, '${realPanier[i]._id}')" >
                                </div>
                                <div class="cart_item_price cart_info_col">
                                    <div class="cart_item_text text-center">${price} €</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_text text-center">${getTotalByProduct(quantity,price)} €</div>
                                </div>
                            </div>
                            <div class="cart_item_image d-flex justify-content-around">
                                <button type="button">Supprimer l'article de votre panier</button>
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
                                            <div class="cart_title mb-4"><h2>Shopping Cart</h2></div>
                                            <div class="cart_items">
                                                <ul id="cart_list">
                                                    <li class="cart_item clearfix">
                                                        <div class="cart_item_info d-flex justify-content-around">
                                                            <div class="cart_item_name cart_info_col">
                                                                <div class="cart_item_text text-center">Nom du produit</div>
                                                            </div>
                                                            <div class="cart_item_color cart_info_col">
                                                                <div class="cart_item_text text-center">Lentille</div>
                                                            </div>
                                                            <div class="cart_item_quantity cart_info_col">
                                                                <div class="cart_item_text text-center">Quantité</div>
                                                            </div>
                                                            <div class="cart_item_price cart_info_col">
                                                                <div class="cart_item_text text-center">Prix</div>
                                                            </div>
                                                            <div class="cart_item_total cart_info_col">
                                                                <div class="cart_item_text text-center">Montant total</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="order_total">
                                            <button type="button" onclick="removeAllProduct()">Vider votre panier</button>
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
                                <input id="adresse" type="text" class="form-control" placeholder="Votre adresse" required>
                                <div class="d-flex">
                                    <input id="ville" type="text" class="form-control" placeholder="Ville" required>
                                </div>
                            </div>
                        </div>
                    </div>`;
        document.getElementById("form").insertAdjacentHTML('afterbegin', htmlForm);
        let purchaseButton = document.getElementById("purchase")
        purchaseButton.setAttribute("onclick", "purchaseCart()")
 }


// FONCTION POUR LE CHANGEMENT DE VALEUR DANS L'INPUT DU PANIER

function inputOnChange(v, idProduct) {
    if(v.value <= 0) {
        localStorage.removeItem(idProduct);
        location.reload();
    }
    else{
        for(let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i) == idProduct) {
                for(let j = 0; j < realPanier.length; j++) {
                    if(realPanier[j]._id == idProduct) {
                        realPanier[j].quantity = v.value;
                        let modifPanier = JSON.stringify(realPanier[j]);
                        localStorage.setItem(idProduct, modifPanier);
                    }
                }
            }  
        }
        afficherCart(realPanier);
    }
}

function removeAllProduct() {
    localStorage.clear()
    location.reload()
}


// FUNCTION POUR AJOUTER AU PANIER

async function purchaseCart() {

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
            address: document.getElementById("adresse").value,
            city: document.getElementById("ville").value,
            email: document.getElementById("email").value,
        },
        products: totalId,
    }
    
    const formCheck = await formcheck();


    // Envoie a l'API

    if(formCheck == true) {
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
    else {
        window.alert("Il y a des erreurs dans votre formulaire");
    }
} 


async function formcheck() {
    if (
        /^[A-Za-zÀ-ÿ]{2,24}$/.test(document.getElementById("prenom").value) 
         && /^[A-Za-zÀ-ÿ]{2,24}$/.test(document.getElementById("name").value) 
         && /^^[A-Za-zÀ-ÿ]{2,24}$/.test(document.getElementById("ville").value)
         && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)
         && /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(document.getElementById("adresse").value)
        ) {
        return true;
    } 
    return false
}
