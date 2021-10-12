async function afficherOrderId () {
    if(localStorage.getItem("orderId")) {
        let OrderId = localStorage.getItem("orderId");
        let htmlOrderID = `<p class="text-center fw-bold">${OrderId}</p>`;
        let element = document.getElementById("orderId");
        element.insertAdjacentHTML("beforeend", htmlOrderID);
    }
    else {
        let htmlOrderIDerror = `<p class="text-center fw-bold">Erreur avec votre ID</p>`;
        let element = document.getElementById("orderId");
        element.insertAdjacentHTML("beforeend", htmlOrderIDerror);
    }
}

afficherOrderId()
