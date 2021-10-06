let realPanier = [];

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
            price = realPanier[i].price / 100;
            quantity = realPanier[i].quantity;
            htmlLi = `<li class="cart_item clearfix">
                            <div class="cart_item_image"><img src="${realPanier[i].imageUrl}" alt=""></div>
                            <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
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
                                    <div class="cart_item_text">${price}</div>
                                </div>
                                <div class="cart_item_total cart_info_col">
                                    <div class="cart_item_title">Total</div>
                                    <div class="cart_item_text">${getTotalByProduct(quantity,price)}</div>
                                </div>
                            </div>
                        </li>`;
            htmlList.push(htmlLi)
        }
        let htmlCart =`<div class="cart_section">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-lg-10 offset-lg-1">
                                        <div class="cart_container">
                                            <div class="cart_title">Shopping Cart</div>
                                            <div class="cart_items">
                                                <ul id="cart_list">
                                                </ul>
                                            </div>
                                            <div class="order_total">
                                                <div class="order_total_content text-md-right">
                                                    <div class="order_total_title">Order Total:</div>
                                                    <div class="order_total_amount">${totalAmount}€</div>
                                                </div>
                                            </div>
                                            <div class="cart_buttons">
                                                <a href="../Html/Index.html"><button type="button" class="button cart_button_clear">Continue Shopping</button></a>
                                                <button type="button" class="button cart_button_checkout onclick="afficherForm()">Purchase</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        document.getElementById("panier").innerHTML = htmlCart;
        document.getElementById("cart_list").insertAdjacentHTML('afterbegin', htmlList);
    }
}



async function afficherForm() {
    let htmlForm = `<form id="form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                    </form>`;
    let blurDiv = '<div id="blur"></div>';
    document.getElementById("main").insertAdjacentHTML('afterbegin', htmlForm);
    document.getElementById("body").insertAdjacentHTML('afterbegin', blurDiv);
    
}


async function RemoveCart(idProduct) {
    localStorage.removeItem(idProduct)
}


function inputOnChange(v, idProduct) {
    if(v.value <= 0) {
        RemoveCart(idProduct)
        location.reload()
    }
    for(let i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i) == idProduct) {
            realPanier[i].quantity = v.value
            let modifPanier = JSON.stringify(realPanier[i])
            localStorage.setItem(idProduct, modifPanier)
        }  
    }
    afficherCart(realPanier)
}