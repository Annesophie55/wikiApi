// Codez un système de recherche grâce à l'API de Wikipedia.
// L'utilisateur peut effectuer une recherche et voir s'afficher des résultats sur lesquelles il pourra cliquer si il veut se déplacer sur la page de l'article en question. 


// 1. Gérez l'entrée de la recherche grâce au formulaire et à l'input.

// 2. Utilisez l'API de Wikipedia afin d'obtenir les résultats de cette recherche.
// Voici l'api vous deverez la compléter avec le contenu de la recherche:
// https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=

// 3.Redirgiez l'utilisateur vers la page de l'article en question en cliquant sur le titre de l'article.
// API a completer : https://en.wikipedia.org/?curid=


// Points à prendre en compte:
// a. Ajoutez un loader pendant le chargement.
// b. Affichez les résultats en dessous de l'input.
// c. Faites en sorte qu'on puisse éffectuer autant de recherches qu'on le souhaite.
// d.Bonus : Gérez les erreurs.
const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');
const loader = document.querySelector(".loader");
const resultDisplay = document.querySelector('.result-display');


form.addEventListener("submit", handleForm);

function handleForm(e){
    e.preventDefault();
  
    // Vérifier si le formulaire de recherche est rempli 
    if(input.value === ""){
        errorMsg.textContent = 'Veuillez remplir le formulaire de recherche';
           console.log(input.value);
    }
    else{
        // si le formulaire est rempli on affiche le loader et on fai le call à l'api 
        errorMsg.textContent="";
        loader.style.display = "flex";
        wikiApiCall(input.value);
      
    
    }

}

async function wikiApiCall(searchInput){
    try{
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

        // convertir en objet js 
        const data = await response.json();
   
        createCards(data.query.search);

    }
    catch(error){
        errorMsg.textContent = `${error}`
        loader.style.display = "none"
    }
}


// Créer nos elements en fonction du résultat de la recherche 
function createCards(data){

    // vérifier si la recherche comprends résultats 
    if(!data.length){
        errorMsg.textContent = " aucun résultat"
        loader.style.display = "none"
    }

    // On boucle sur les résultats et on créer un bloc pour chaque résultat 
    data.forEach(el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement("div");
        card.className="result-item"
        card.innerHTML= `
        <h3 class="result-title">
            <a href="${url}" target="_blank">${el.title}</a>
        </h3>
        <a class="result-link" href="${url}" target="_blank">${url}</a>
        <span class="result-text>${el.snippet}</span>
        `;

        resultDisplay.appendChild(card);
    });

    // faire disparaitre le loader quand on des résultats 
    loader.style.display="none";
}
