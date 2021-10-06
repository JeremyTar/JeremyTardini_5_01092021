
// APPEL FONCTION D'AFFICHAGE AU "DOMcontenLoaded"

document.addEventListener('DOMContentLoaded', async () => {
    afficherCardProduct(await apiCall(apiUrl));
  })

// FONCTION D'AFFICHAGE HTML 

async function afficherCardProduct(produit) {
    let totalCard = '';
    let html;
    let productString;
    if(Array.isArray(produit)) {
        for (var i = 0; i < produit.length; i++) {
            productString = JSON.stringify(produit[i]);
            html =`<li id="${produit[i]._id}" class="card d-sm-flex col-lg-3 col-sm-10">
                            <a class="text-decoration-none text-reset" href="Produit.html?id=${produit[i]._id}">
                                <img src="${produit[i].imageUrl}" alt="Camera">
                                <div class="card__title">
                                    <p>${produit[i].name}</p>
                                    <div class="card__title__adds">
                                        <div>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <p>${produit[i].price /100} €</p>
                                    </div>
                                </div>
                                <p class="text-justify">${produit[i].description}</p>
                            </a>
                        </li>`
            totalCard += html;
        }
        document.getElementById("cards").innerHTML = totalCard;
    }
}

