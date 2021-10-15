let realPanier = [];

(async function () {
    const produit = await apiCall(apiUrl , {});
    converstionLocalStorage(produit);
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

    // condition si l'utilisateur n'a pas de produits dans son panier

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
        let price = 0;
        let quantity = 0;
        let totalAmount = 0;
        
        function getTotalByProduct (quantite, price) {
            totalPrice = (quantite * price);
            totalAmount = totalAmount + totalPrice;
            return totalPrice;
        }

        for(let i = 0; i < realPanier.length; i++) {

            // <li> par ID dans le localStorage

            price = realPanier[i].price / 100;
            quantity = realPanier[i].quantity;
            htmlLi = `  <li class="cart_item clearfix">
                            <div class="cart_item_info d-flex justify-content-around col-9">
                                <div class="cart_item_name cart_info_col col-10 col-sm-2">
                                    <div class="cart_item_text text-center">${realPanier[i].name}</div>
                                </div>
                                <div class="cart_item_color cart_info_col col-10 col-sm-2">
                                    <div class="cart_item_text text-center">${realPanier[i].lenses}</div>
                                </div>
                                <div class="cart_item_quantity cart_info_col col-10 col-sm-2">
                                    <input id="${realPanier[i]._id}" class="cart_item_text d-flex justify-content-around" type="number" value="${quantity}" max="${realPanier[i].stock}" onchange="inputOnChange(this, '${realPanier[i]._id}')" >
                                </div>
                                <div class="cart_item_price cart_info_col col-10 col-sm-2">
                                    <div class="cart_item_text text-center">${price} €</div>
                                </div>
                                <div class="cart_item_total cart_info_col col-10 col-sm-2">
                                    <div class="cart_item_text text-center">${getTotalByProduct(quantity,price)} €</div>
                                </div>
                            </div>
                            <div class="cart_item_image cart_info_col col-10 col-sm-2">
                                <div class="cart_item_image" style="width: 10em;"><img src="${realPanier[i].imageUrl}" alt=""></div>
                            </div>
                        </li>`;
            htmlList.push(htmlLi);
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
                                                    <li class="cart_item legende clearfix">
                                                        <div class="cart_item_info d-flex justify-content-around col-9">
                                                            <div class="cart_item_name cart_info_col col-10 col-sm-2">
                                                                <div class="cart_item_text text-center vaniobold">Nom du produit</div>
                                                            </div>
                                                            <div class="cart_item_color cart_info_col col-10 col-sm-2">
                                                                <div class="cart_item_text text-center vaniobold">Lentille</div>
                                                            </div>
                                                            <div class="cart_item_quantity cart_info_col col-10 col-sm-2">
                                                                <div class="cart_item_text text-center vaniobold">Quantité</div>
                                                            </div>
                                                            <div class="cart_item_price cart_info_col col-10 col-sm-2">
                                                                <div class="cart_item_text text-center vaniobold">Prix</div>
                                                            </div>
                                                            <div class="cart_item_total cart_info_col col-10 col-sm-2">
                                                                <div class="cart_item_text text-center vaniobold">Montant total</div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="order_total d-flex justify-content-between">
                                                <button type="button" onclick="removeAllProduct()"><i class="fas fa-trash-alt"></i> Supprimer votre panier</button>
                                                <div class="order_total_content d-flex">
                                                    <p class="order_total_title">Order Total:</p>
                                                    <p class="order_total_amount">${totalAmount} €</p>
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

async function deleteCart() {
    let btnDelete = document.querySelectorAll(".delete_button");
    console.log(btnDelete)
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", getIdDelete(i))

            // e.preventDefault()
            // userCart.splice(i, 1)
            // localStorage.setItem("product", JSON.stringify(userCart))
            // window.location.reload()
    }
    async function getIdDelete(i) {
        console.log(i)
        let id = realPanier[i]._id
        localStorage.removeItem(id)
    }

}
    // let btnDeleteAll = document.querySelector(".delete-all")
    // btnDeleteAll.addEventListener("click", (err) =>{
    //     localStorage.clear()
    //     window.location.reload()


async function removeAllProduct() {
    localStorage.clear();
    location.reload();
}

// async function removeOneProduct(id) {
//     console.log(id);
// }

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
