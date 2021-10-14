
// APPEL FONCTION D'AFFICHAGE AU "DOMcontenLoaded"

document.addEventListener('DOMContentLoaded', async () => {  
    afficherCardProduct(await apiCall(apiUrl));
  })

// FONCTION D'AFFICHAGE HTML 

async function afficherCardProduct(produit) {
    let totalCard = '';
    let productString;
    if(Array.isArray(produit)) {
        for (var i = 0; i < produit.length; i++) {
            productString = JSON.stringify(produit[i]);
            let html =`<li id="${produit[i]._id}">
                            <a class="text-decoration-none" href="Produit.html?id=${produit[i]._id}">
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${produit[i].imageUrl}" alt="Camera ${produit[i]._id}">
                                    <div class="card-body">
                                        <div class="card__title text-center font-weight-bold">
                                        <h3>${produit[i].name}</h3>
                                    </div>
                                    <p class="card-text text-center">${produit[i].description}</p>
                                    <a href="Produit.html?id=${produit[i]._id}" class="d-flex justify-content-around mt-2">Plus de détails...</a>
                                </div>
                            </a>
                        </li>`
            totalCard += html;
        }
        document.getElementById("cards").innerHTML = totalCard;
    }
}

async function errorIndexProduit() {
    let htmlError =  `<li>
                    <div>  
                        <p>Il semble y avoir un probleme avec le chargement de votre page </p>
                    </div>
                </li>`
    document.getElementById("cars").innerHTML = htmlError;
}