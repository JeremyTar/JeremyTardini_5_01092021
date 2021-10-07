let apiUrl = "http://localhost:3000/api/cameras";

// DEFINITION DE LA FONCTION D'APPEL ET DE RENVOIE API

async function apiCall(url, options) {
  const headers = { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
  }

  const promiseData = window.fetch(url, {...headers, ...options})
                        .then((response)  => {
                          if(response.ok) return response.json();
                        })
                        .then((data) => data)
                        .catch(e => console.error(e.message));
  return promiseData;             
}

// FUNCTION POUR RETOUR SIGN

async function removeSign () {
  let elemSign = document.getElementById("confirmeSign");
  elemSign.parentNode.removeChild(elemSign);
  let elemBlur = document.getElementById("blur");
  elemBlur.parentNode.removeChild(elemBlur);

}
