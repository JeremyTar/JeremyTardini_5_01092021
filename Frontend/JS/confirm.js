async function afficherOrderId () {
    if(localStorage.getItem("orderId")) {
        let OrderId = localStorage.getItem("orderId");
        let htmlOrderID =`<div class="card mt-4 mb-4" style="width: 32rem;">
                            <div class="p-4" id="orderId">
                                <h2 class="card-title text-center">Merci pour votre commande !</h2>
                                <p class="card-text text-center">Vous allez bientot recevoir un mail de confirmation</p>
                                <p class="text-center">Votre numéro de commande est le :</p>
                                <p class="text-center fw-bold">${OrderId}</p>
                            </div>
                            <a class=".lienIndex d-flex justify-content-around" href="Index.html">Retour a la page d'acceuil</a>
                        </div>`;
        let element = document.getElementById("orderId");
        element.insertAdjacentHTML("beforeend", htmlOrderID);
    }
    else {
        let htmlOrderIDerror = `<div class="card mt-4 mb-4" style="width: 30rem; height: 300px;">
                                    <div class="p-4" id="orderId">
                                        <p class="text-center fw-bold">Erreur avec votre ID</p>
                                    </div>
                                    <a class=".lienIndex d-flex justify-content-around" href="Index.html">Retour a la page d'acceuil</a>
                                </div>`;
        let element = document.getElementById("orderId");
        element.insertAdjacentHTML("beforeend", htmlOrderIDerror);
    }
}

afficherOrderId()
