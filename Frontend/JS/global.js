let apiUrl = "http://localhost:3000/api/cameras";

// DEFINITION DE LA FONCTION D'APPEL ET DE RENVOIE API

async function apiCall(url) {
  const promiseData = window.fetch(url)
                        .then((response)  => {
                          if(response.ok) return response.json();
                        })
                        .then((data) => data)
                        .catch(err => failIndex(err));
  return promiseData;             
}

// FUNCTION POUR RETOUR SIGN

async function removeSign () {
  let elemSign = document.getElementById("confirmeSign");
  elemSign.parentNode.removeChild(elemSign);
  let elemBlur = document.getElementById("blur");
  elemBlur.parentNode.removeChild(elemBlur);

}

// FUNCTION HTML EN CAS D'ERREUR AVEC L'API

async function failIndex(err) {
  let htmlError = `<li class="p-5">
                      <p>Une erreur c'est produite, veuillez réessayer plus tard, merci</p>
                  </li>`;
  document.getElementById("cards").innerHTML = htmlError;
  console.log("Error: " + err);
}